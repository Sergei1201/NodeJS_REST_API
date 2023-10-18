let products = require('../data/products.json')
const {v4: uuidv4} = require('uuid')
const {writeDataToFile} = require('../utils')

// Find All Products
const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

// Find By ID
const findById = (id) => {
    return new Promise((resolve, reject) => {
        let product = products.find(p => p.id === id)
        resolve(product)
    })
}

// Create Product
const create = (product) => {
    return new Promise((resolve, reject) => {
        let newProduct = {
            id: uuidv4(),
            ...product
        }
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
    })
}

// Update Product
const update = (id, product) => {
    return new Promise((resolve, reject) => {
        let index = products.findIndex(p => p.id === id)
        products[index] = {
            id,
            ...product
        }
        writeDataToFile('./data/products.json', products)
        resolve(products[index])
        
    })
}

// Remove Product
const remove = (id) => {
    return new Promise((resolve, reject) => {
    products = products.filter(p => p.id !== id)
    writeDataToFile('./data/products.json', products)
    resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
}