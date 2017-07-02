#! /usr/bin/env node --harmony

const program = require('commander'),
    config = require('../config'),
    ora = require('ora'),
    spinner = ora()

const {
    getDirectories,
    mapAssets
} = require('../utils')

program
    .option('-v, --verbose', 'more descriptive output')
    .parse(process.argv)

let cleanList = [
    'tmp',
    'node_modules',
    'bower_components'
]

cleanList.push(config.dest, config.logs)
cleanList = cleanList.join(' ')

function listAssets(assets) {
    return new Promise((resolve, reject) => {
        if (assets.length) {
            resolve(assets)
        } else {
            reject(new Error('There is no assets.'))
        }
    })
}

spinner.start('Listing...')

let assets = getDirectories(config.src).map(mapAssets)

listAssets(assets).then((assets) => {
    assets.forEach((asset, index) => {
        spinner.succeed(`→ ${config.src}/${asset.name}`)
    })
}).catch((error) => {
    spinner.fail(error)
    process.exit(1)
})
