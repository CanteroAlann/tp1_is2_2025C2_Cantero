export default {
  testEnvironment: "node",       // entorno Node para Jest
  verbose: true,                 // para ver detalles de los tests
  transform: {},                 // no necesitamos transformador si solo usamos ESM y Node >= 18
  moduleFileExtensions: ["js"], // extensiones de tus archivos
  testMatch: ["**/tests/**/*.test.js"], // dónde buscar los tests
};
