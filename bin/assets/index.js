#! /usr/bin/env node --harmony

let pjson = require('../../package.json')

const program = require('commander')

program
    .version(pjson.version)
    .command('build [assetName]', 'build one or more assets').alias('b')
    .command('clean [assetName]', 'clean your environment')
    .command('create [assetName]', 'create one or more assets').alias('c')
    .command('delete [assetName]', 'delete one or more assets').alias('d')
    .command('install [assetName]', 'install dependencies in one or more assets').alias('i')
    .command('lint [assetName]', 'lint one or more assets')
    .command('list', 'list assets').alias('l')
    .parse(process.argv)
