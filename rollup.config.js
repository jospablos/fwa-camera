
// Rollup plugins to install as npm --save-dev
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';

export default {
  input: "src/vanilla-js/capture-button.ts",
  output: {
    file: "dist/vanilla-js/bundle.min.js",
    name: "Camera",
    format: "umd",
  },
  plugins: [
    css({ output: 'bundle.css' }),
    typescript(),
  ]
}