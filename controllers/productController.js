const Product = require('../models/productModel')

// @desc Get all products
// @route GET /api/products
const getProducts = async (req, res) => {
    try {
    const products = await Product.findAll()
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(products))
        
    } catch (error) {
        console.log(error)
    }
}

// @desc Get Single Product
// @route GET /api/products/id
const getProduct = async (req, res, id) => {
    const product = await Product.findById(id)
    if (!product) {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Not found'}))
    } else {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(product))
    }
}

module.exports = {
    getProducts,
    getProduct,
}