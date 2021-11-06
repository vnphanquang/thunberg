//@ts-check
/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{html,svelte}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      outline: ['hover', 'active'],
      backgroundColor: ['disabled'],
    },
  },
  plugins: [
    require('@vnphanquang/tailwind'),
  ],
};
