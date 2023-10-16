const products = require('../data/products.json')

// Find all
const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

// Find By ID
const findById = (id) => {
    return new Promise((resolve, reject) => {
        const product = products.find(p => p.id === id)
        resolve(product)
    })
}

module.exports = {
    findAll,
    findById,
}