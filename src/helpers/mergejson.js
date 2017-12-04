const jsonfile = require('jsonfile')
const _ = require('lodash')

exports.files = (sourceFile, targetFile) => {
    jsonfile.readFile(sourceFile, (err, sourceJson) => {
        if (!sourceFile) {
            console.warn('Source file not found')
            return false
        }

        jsonfile.readFile(targetFile, (err, targetJson) => {
            if (!targetFile) {
                console.warn('Target file not found')
                return false
            }

            const outputJson = _.mergeWith(targetJson, sourceJson, (objValue, srcValue) => {
                if (_.isArray(objValue)) return objValue.concat(srcValue)
            })

            jsonfile.writeFile(targetFile, outputJson, {spaces: 4}, err => {
                if (err) {
                    console.log(err)
                    return false
                }
            })
        })
    })

    return true
}
