//@ts-check
import { generateFromFolder } from 'svg-to-svelte';

const source = 'src/assets/img';
const output = 'src/lib/generated/svg';

(async () => {
  const svgTargets = [
    // {
    //   from: `${source}/material`,
    //   to: `${output}/material`,
    // },
  ];

  await Promise.all(
    svgTargets.map(target => generateFromFolder(target.from, target.to)),
  );
})();
