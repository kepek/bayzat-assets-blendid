#! /usr/bin/env node --harmony

const command = 'install'

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

function installAssets(asset) {
    return asyncExec(`(cd ${asset.path} && yarn ${command} && yarn run ${command})`, !program.verbose)
}

if (program.all) {
    spinner.start('Installing...')

    let assets = getDirectories(config.src)
        .map(mapAssets)
        .map(installAssets)

    if (!assets.length) {
        spinner.fail('Installation stopped. There is no assets.')
        process.exit(1)
    }

    let installAllAssets = Promise.all(assets)

    installAllAssets.then(() => {
        spinner.succeed('Installed assets successfully.')
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
            spinner.start(`Installing "${asset.name}" assets...`)
            installAssets(asset).then(() => {
                spinner.succeed(`Built "${asset.name}" assets successfully.`)
            }).catch(errorHandler)
        } else {
            spinner.fail(`The "${asset.name}" assets does not exists.`)
            process.exit(1)
        }
    })
}
