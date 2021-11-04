# global build args
ARG NODE_VERSION="14.17.5"
ARG NODE_ENV
ARG PORT
ARG PROJECT

#---------------------

# stage: builder
FROM node:${NODE_VERSION} as builder

# arg
ARG PROJECT
ARG NODE_ENV
#env
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY . .
# install dependencies
RUN node common/scripts/install-run-rush.js install --to ${PROJECT} --bypass-policy
# build project
RUN node common/scripts/install-run-rush.js build --to ${PROJECT}
# prepare deployment bundle
RUN node common/scripts/install-run-rush.js deploy --project ${PROJECT} --overwrite
# src folder not needed, delete to reduce image size
RUN rm -r common/deploy/$(node -e "console.log(require('./rush.json').projects.find(p => p.packageName === '${PROJECT}')?.projectFolder)")/src

#---------------------

# stage: executor
FROM node:${NODE_VERSION}-alpine3.14 as executor

# arg
ARG PROJECT
ARG NODE_ENV
ARG PORT

# env
ENV PROJECT=${PROJECT}
ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY --from=builder /app/rush.json /app/common/deploy ./

EXPOSE ${PORT}

# cd to correct project dir as defined in rush.json
CMD cd $(node -e "console.log(require('./rush.json').projects.find(p => p.packageName === '${PROJECT}')?.projectFolder)") && npm run start
