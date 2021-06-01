import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';

export default {
  input: "src/vanilla-js/capture-button.ts",
  output: {
    file: "dist/simple-camera.min.js",
    name: "ez-pz-simple-camera",
    format: "umd",
  },
  plugins: [
    css({ output: 'simple-camera.css' }),
    typescript(),
  ]
}