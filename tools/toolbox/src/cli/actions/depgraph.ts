import type {RushConfigurationProject} from '@microsoft/rush-lib';
import {RushConfiguration} from '@microsoft/rush-lib';
import type { IPackageJsonDependencyTable } from '@rushstack/node-core-library';

type DependencyGraphEntry = {
  dependencies: string[];
  dependents: string[];
};
type DependencyGraph = Record<string, DependencyGraphEntry>;

type EnsureAndGetDependencyGraphEntryOptions = {
  packageName: string;
  dependencyGraph: DependencyGraph;
};
function ensureAndGetDependencyGraphEntry({
  packageName,
  dependencyGraph,
}: EnsureAndGetDependencyGraphEntryOptions): DependencyGraphEntry {
  if (dependencyGraph[packageName] === undefined) {
    dependencyGraph[packageName] = { dependencies: [], dependents: [] };
  }

  return dependencyGraph[packageName] as DependencyGraphEntry;
}

type AddDependenciesOptions = {
  dependencies: IPackageJsonDependencyTable | undefined;
  dependencyGraph: DependencyGraph;
  project: RushConfigurationProject;
  rushConfiguration: RushConfiguration;
};
function addDependencies({
  dependencies = {},
  dependencyGraph,
  project,
  rushConfiguration,
}: AddDependenciesOptions): void {
  const dependencyGraphEntry = ensureAndGetDependencyGraphEntry({
    dependencyGraph,
    packageName: project.packageName,
  });
  Object.keys(dependencies).forEach((dependencyName) => {
    if (
      rushConfiguration.projectsByName.has(dependencyName) &&
      !project.cyclicDependencyProjects.has(dependencyName)
    ) {
      dependencyGraphEntry.dependencies.push(dependencyName);

      const dependencyEntry = ensureAndGetDependencyGraphEntry({
        dependencyGraph,
        packageName: dependencyName,
      });
      dependencyEntry.dependents.push(project.packageName);
    }
  });
}

type ProcessPackageOptions = {
  dependencyGraph: DependencyGraph;
  project: RushConfigurationProject;
  rushConfiguration: RushConfiguration;
};
function processPackage({
  dependencyGraph,
  project,
  rushConfiguration,
}: ProcessPackageOptions) {
  [
    project.packageJson.dependencies,
    project.packageJson.devDependencies,
    project.packageJson.peerDependencies,
  ].forEach((dependencies) =>
    addDependencies({
      dependencies,
      dependencyGraph,
      project,
      rushConfiguration,
    }),
  );
}

function makeDependencyGraph() {
  const dependencyGraph: DependencyGraph = {};
  const rushConfiguration = RushConfiguration.loadFromDefaultLocation({
    startingFolder: process.cwd(),
  });
  rushConfiguration.projects.forEach((project) =>
    processPackage({
      dependencyGraph,
      project,
      rushConfiguration,
    }),
  );
  return dependencyGraph;
}

// ok... so you just want to pretty print it...
const dg = makeDependencyGraph();
console.log(JSON.stringify(dg, undefined, 2));
