const processor = require('../scripts/process/processor');

it('build plugin styles correctly', async () => {
  const [postcssOutput,] = await processor();
  expect(postcssOutput.css).toMatchSnapshot();
});

it('build plugin minified styles correctly', async () => {
  const [, minified] = await processor();
  expect(minified.styles).toMatchSnapshot();
});
