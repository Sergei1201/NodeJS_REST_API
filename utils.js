const fs = require('fs')

const writeDataToFile = (fileName, content) => {
    fs.writeFileSync(fileName, JSON.stringify(content), 'utf-8', (err => {
        if (err) {
            console.log(err)
        }
    }))
}

module.exports = {
    writeDataToFile,
}