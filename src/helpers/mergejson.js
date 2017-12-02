const jsonfile = require('jsonfile')
const json_merger = require('json_merger')

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

            const outputJson = json_merger.merge(targetJson, sourceJson)

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
