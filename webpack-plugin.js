'use strict';

const fs = require('fs');
const path = require('path');

class GenerateVersionFilePlugin {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    // You can initialize options or set up anything needed here
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('GenerateVersionFilePlugin', (compilation, callback) => {
      const packageJsonPath = path.resolve('package.json');
      const versionJsonPath = path.resolve(compilation.outputOptions.path, 'version.json');

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const { version } = packageJson;

      fs.writeFileSync(versionJsonPath, JSON.stringify({ version }, null, 2));

      callback();
    });
  }
}

module.exports = GenerateVersionFilePlugin;
