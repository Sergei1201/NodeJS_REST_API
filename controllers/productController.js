const Product = require('../models/productModel')

// @desc Get All Products
// @route GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        if (!products) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Not found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(products))
        }
        
    } catch (error) {
        console.log(error)
    }
   
}

// @desc Get Single Product
// @route GET /api/products/id
const getProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Not found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }

}

// @desc Create Product
// @route POST /api/products
const createProduct = async (req, res) => {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const {name, description, price} = JSON.parse(body)
            const newProduct = {
                name,
                description,
                price
            }
            const product = await Product.create(newProduct)
            if (product) {
                res.writeHead(201, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(product))
            } else {
                res.writeHead(401, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({message: 'Client error'}))
            }
        })
        
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
}