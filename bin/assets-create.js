#! /usr/bin/env node --harmony

const command = 'create'

const program = require('commander'),
    shell = require('shelljs'),
    config = require('../config'),
    ora = require('ora'),
    spinner = ora()

const {
    asyncExec,
    errorHandler,
    mapAssets
} = require('../utils')

program
    .option('-o, --override', `full path (will ${command} intermediate dirs if necessary)`)
    .option('-v, --verbose', 'more descriptive output')
    .parse(process.argv)

let assets = program.args.map(mapAssets)

function createAssets(asset) {
    let assetExists = shell.test('-e', asset.path),
        makeDirArgs = [asset.path]

    if (program.override) {
        makeDirArgs.unshift('-p')
    }

    spinner.start(`Creating "${asset.name}" assets...`)

    if (assetExists && !program.override) {
        spinner.warn(`The "${asset.name}" assets already exists.`)
        spinner.info(`Try to run "node bin/assets ${command} [assetName] --override" to override specific assets.`)
    } else {
        shell.mkdir(...makeDirArgs)
        shell.cd(asset.path)

        asyncExec('yarn run blendid -- init-bayzat', !program.verbose).then(() => {
            asyncExec(`yarn run ${command}`, !program.verbose).then(() => {
                spinner.succeed(`Created "${asset.name}" assets successfully. Stored in "${config.src}/${asset.name}".`)
            }).catch(errorHandler)
        }).catch(errorHandler)
    }
}

if (!assets.length) {
    spinner.fail('You did not specified the asset name.')
    spinner.info(`Try to run "node bin/assets ${command} [assetName]" (will ${command} one or more assets).`)
    process.exit(1)
}

assets.forEach(createAssets)
