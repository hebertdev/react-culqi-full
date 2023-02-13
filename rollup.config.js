import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "es", // Configurar formato a ES6
    globals: {
      react: "React",
    },
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
    }),
    resolve(), // Agregar el plugin de resolución de nodos
  ],
  external: ["react"],
};
