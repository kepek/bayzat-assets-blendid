#! /usr/bin/env node --harmony

const command = 'delete'

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

function deleteAssets(asset) {
    return asyncExec(`(cd ${asset.path} && yarn run ${command}) && (rm -rf ${asset.path})`, !program.verbose)
}

if (program.all) {
    spinner.start('Deleting assets...')

    let assets = getDirectories(config.src)
      .map(mapAssets)
      .map(deleteAssets)

    if (!assets.length) {
        spinner.fail('Deleting stopped. There is no assets.')
        process.exit(1)
    }

    let removingAllAssets = Promise.all(assets)

    removingAllAssets.then(() => {
        spinner.succeed('Deleted assets successfully.')
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
            spinner.start(`Deleting "${asset.name}" assets...`)
            deleteAssets(asset).then(() => {
                spinner.succeed(`Deleted "${asset.name}" assets successfully.`)
            }).catch(errorHandler)
        } else {
            spinner.fail(`The "${asset.name}" assets does not exists.`)
            process.exit(1)
        }
    })
}
