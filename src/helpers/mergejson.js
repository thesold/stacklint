const fs = require('fs')
const jsonfile = require('jsonfile')
const _ = require('lodash')

exports.files = (sourceFile, targetFile) => {
    const sourceJson = fs.existsSync(sourceFile) ? jsonfile.readFileSync(sourceFile) : {}
    const targetJson = fs.existsSync(targetFile) ? jsonfile.readFileSync(targetFile) : {}

    const outputJson = _.mergeWith(targetJson, sourceJson, (objValue, srcValue) => {
        if (_.isArray(objValue)) return _.uniq(objValue.concat(srcValue))

        return objValue
    })

    return jsonfile.writeFileSync(targetFile, outputJson, { spaces: 4 })
}
