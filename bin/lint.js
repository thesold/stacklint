#! /usr/bin/env node

const fs = require('fs');
const path = require('path')
const { COPYFILE_EXCL } = fs.constants;
const mergeJson = require('../src/helpers/mergejson')
const argv = require('minimist')(process.argv.slice(2))

const stacks = argv._

if (argv.l || argv.list) {
    fs.readdir(path.resolve(__dirname, '../src/stacks/'), (err, stackFolders) => {
        stackFolders.forEach(stack => {
            if (stack !== 'all') console.log(stack)
        })
    })

    return
}

if (!stacks.length) {
    console.warn('Please specify at least one stack to install')
    return
}

['all'].concat(stacks).forEach(stack => {
    const stackPathJson = path.resolve(__dirname, '../src/stacks/', stack, 'json')
    const stackPathStubs = path.resolve(__dirname, '../src/stacks/', stack, 'stubs')

    fs.readdir(stackPathStubs, (err, files) => {
        if (err) {
            console.warn(`No ${stack} stubs found`)
            return
        }
        files.forEach(fileName => {
            fs.copyFile(path.resolve(stackPathStubs, fileName), fileName, COPYFILE_EXCL, err => {
                if (err && err.code !== 'EEXIST') {
                    console.warn(`${fileName} already exists`)
                    return
                }
            })
        })
    })

    fs.readdir(stackPathJson, (err, files) => {
        if (err) {
            console.warn(`No ${stack} json found`)
            return
        }
        files.forEach(fileName => {
            mergeJson.files(path.resolve(stackPathJson, fileName), fileName)
        })
    })
})
