const fs = require('fs'),
  shell = require('shelljs'),
  path = require('path'),
  ora = require('ora'),
  logSymbols = require('log-symbols'),
  spinner = ora(),
  config = require('../config')

module.exports.asyncExec = function asyncExec(command, silent = true) {
    return new Promise((resolve, reject) => {
        shell.exec(command, { silent }, (error, stdout, stderr) => {
          if (!error) {
              resolve(stdout)
          } else {
              reject(stderr)
          }
        })
    })
}

module.exports.errorHandler = function (stderr) {
    spinner.fail(stderr)
    process.exit(1)
}

module.exports.getDirectories = function getDirectories(srcPath) {
    return fs.readdirSync(srcPath).filter((file) => {
        return fs.lstatSync(path.join(srcPath, file)).isDirectory()
    })
}

module.exports.mapAssets = function mapAssets(asset) {
    return {
      name: asset,
      path: path.join(process.cwd(), config.src, asset),
      src: path.join(process.cwd(), config.src, asset, 'src'),
      config: path.join(process.cwd(), config.src, asset, 'config'),
      dest: path.join(process.cwd(), config.dest, asset),
      logs: {
          lint: path.join(process.cwd(), config.logs, `lint-${asset}.log`)
      }
    }
}
