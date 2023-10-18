const fs = require('fs')

const writeDataToFile = (fileName, data) => {
    fs.writeFileSync(fileName, JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

const getPostData = (req) => {
    try {
        return new Promise((resolve, reject) => {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString()
            })
            req.on('end', () => {
                resolve(body)
            })
            
        })
        
    } catch (error) {
        reject(error)
    }
 
}

module.exports = {
    writeDataToFile,
    getPostData,
}