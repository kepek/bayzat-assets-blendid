#! /usr/bin/env node --harmony

const command = 'build'

const program = require('commander'),
    shell = require('shelljs'),
    config = require('../config'),
    ora = require('ora'),
    spinner = ora()

const {
    asyncExec,
    errorHandler,
    getDirectories,
    mapAssets
} = require('../utils')

program
    .option('-a, --all', `${command} all assets`)
    .option('-v, --verbose', 'more descriptive output')
    .parse(process.argv)

function buildAssets(asset) {
    return asyncExec(`(cd ${asset.path} && yarn run blendid -- ${command} && yarn run ${command})`, !program.verbose)
}

let destExists = shell.test('-e', config.dest)

if (!destExists) {
    shell.mkdir(config.dest)
}

if (program.all) {
    spinner.start('Building...')

    let assets = getDirectories(config.src)
      .map(mapAssets)
      .map(buildAssets)

    if (!assets.length) {
        spinner.fail('Build stopped. There is no assets.')
        spinner.info('Try to create one by runing "node bin/assets create [assetName]".')
        process.exit(1)
    }

    let buildAllAssets = Promise.all(assets)

    buildAllAssets.then(() => {
        spinner.succeed(`Built assets successfully. Stored in "${config.dest}".`)
    }).catch(errorHandler)
} else {
    let assets = program.args.map(mapAssets)

    if (!assets.length) {
        spinner.warn('You did not specified the asset name.')
        spinner.info(`Try to run "node bin/assets ${command} [assetName]" (will ${command} one or more assets).`)
        spinner.info(`Try to run "node bin/assets ${command} --all" (will ${command} all assets)`)
        process.exit(1)
    }

    assets.forEach((asset) => {
        let assetExists = shell.test('-e', asset.path)
        if (assetExists) {
            spinner.start(`Building "${asset.name}" assets...`)
            buildAssets(asset).then(() => {
                spinner.succeed(`Built "${asset.name}" assets successfully. Stored in "${config.dest}/${asset.name}".`)
            }).catch(errorHandler)
        } else {
            spinner.fail(`The "${asset.name}" assets does not exists.`)
            process.exit(1)
        }
    })
}
