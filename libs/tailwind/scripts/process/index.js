const builder = require('./processor');

console.info('Building CSS...');

Promise.all([builder('compagnon')]).then(() => {
  console.log('Finished building CSS.');
});
