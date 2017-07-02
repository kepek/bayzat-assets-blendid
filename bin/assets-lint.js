#! /usr/bin/env node --harmony

const command = 'lint'

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
    .option('-f, --fix [bool]', 'automatically fix problems [true]', true)
    .parse(process.argv)

function lintAssets(asset) {
    if (!shell.which('eslint')) {
        spinner.fail('ESlint is not available. You can install it by using npm: "npm install -g eslint".')
        shell.exit(1)
    }

    let exec = ['eslint', asset.src, `--output-file ${asset.logs.lint}`]

    if (program.fix) {
        exec.push('--fix')
    }

    exec = exec.join(' ')

    return asyncExec(exec, !program.verbose).then(() => {
        return asyncExec(`(cd ${asset.path} && yarn run ${command})`, !program.verbose).then(() => {
            return asyncExec(`rm -rf ${asset.logs.lint}`, !program.verbose)
        })
    })
}

if (program.all) {
    spinner.start('Linting...')

    let assets = getDirectories(config.src)
      .map(mapAssets)
      .map(lintAssets)

    if (!assets.length) {
        spinner.fail('Lint stopped. There is no assets.')
        process.exit(1)
    }

    let lintAllAssets = Promise.all(assets)

    lintAllAssets.then(() => {
        spinner.succeed('Linted assets successfully.')
    }).catch(() => {
        return errorHandler(new Error(`Lint reported some problems. Check "${config.logs}" to see more details or try to run "node bin/assets lint --all --verbose".`))
    })
} else {
    let assets = program.args.map(mapAssets)

    if (!assets.length) {
        spinner.warn('You did not specified the asset name.')
        spinner.info(`Try to run "node bin/assets ${command} [assetName]" (will ${command} one or more assets).`)
        spinner.info(`Try to run "node bin/assets ${command} --all" (will ${command} all assets)`)
        process.exit(1)
    }

    assets.forEach((asset) => {
        let assetExists = shell.test('-e', asset.src)
        if (assetExists) {
            spinner.start(`Linting "${asset.name}" assets...`)
            lintAssets(asset).then(() => {
                spinner.succeed(`Linted "${asset.name}" assets successfully.`)
            }).catch(() => {
                return errorHandler(new Error(`Lint reported some problems. Check "${asset.logs.lint}" to see more details or try to run "node bin/assets lint --all --verbose".`))
            })
        } else {
            spinner.fail(`The "${asset.name}" assets does not exists.`)
            process.exit(1)
        }
    })
}
