#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const mergeJson = require('../src/helpers/mergejson')
const argv = require('minimist')(process.argv.slice(2))
const inquirer = require('inquirer')

const { COPYFILE_EXCL } = fs.constants

const stacks = argv._

if (argv.l || argv.list) {
    fs.readdir(path.resolve(__dirname, '../src/stacks/'), (err, stackFolders) => {
        stackFolders.forEach((stack) => {
            if (stack !== 'all') console.log(stack)
        })
    })

    return
}

if (!stacks.length) {
    console.warn('Please specify at least one stack to install')
    return
}

let stackFileList = []

stacks.forEach((stack) => {
    const stackPathJson = path.resolve(__dirname, '../src/stacks/', stack, 'json')
    const stackPathStubs = path.resolve(__dirname, '../src/stacks/', stack, 'stubs')

    if (fs.existsSync(stackPathStubs)) {
        stackFileList = stackFileList.concat(fs.readdirSync(stackPathStubs))
    }

    if (fs.existsSync(stackPathJson)) {
        stackFileList = stackFileList.concat(fs.readdirSync(stackPathJson))
    }
})

stackFileList = Array.from(new Set(stackFileList)).sort().join('\n')

inquirer.prompt([{
    type: 'confirm',
    name: 'install',
    message: `
The following files will be created/updated.
${stackFileList}
Are you sure you want to continue?
`,
    default: true,
}]).then((answer) => {
    if (!answer.install) {
        console.log('No stacks were installed')
        return false
    }

    ['all'].concat(stacks).forEach((stack) => {
        const stackPathJson = path.resolve(__dirname, '../src/stacks/', stack, 'json')
        const stackPathStubs = path.resolve(__dirname, '../src/stacks/', stack, 'stubs')

        if (fs.existsSync(stackPathStubs)) {
            const stubFiles = fs.readdirSync(stackPathStubs)

            stubFiles.forEach((fileName) => {
                if (fs.existsSync(fileName)) return

                fs.copyFileSync(path.resolve(stackPathStubs, fileName), fileName, COPYFILE_EXCL)
            })
        }

        if (fs.existsSync(stackPathJson)) {
            const stackFiles = fs.readdirSync(stackPathJson)

            stackFiles.forEach((fileName) => {
                mergeJson.files(path.resolve(stackPathJson, fileName), fileName)
            })
        }
    })

    console.log('Stack linting is now installed. Please run npm/composer install as required.')
    return true
}).catch(error => console.log(error))
