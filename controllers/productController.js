const Product = require('../models/productModel')
const {getPostData} = require('../utils')


// @desc Get All Products
// @route GET /api/products
const getProducts = async (req, res) => {
    try {
        let products =  await Product.findAll()
        if (products) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(products))
        
        } else {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Not found'}))
        }
        
    } catch (error) {
        console.log(error)
    }
   
}

// @desc Get Single Product
// @route GET /api/products/id
const getProduct = async (req, res, id) => {
    try {
        let product = await Product.findById(id)
        if (product) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        } else {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Not found'}))
        }
        
    } catch (error) {
        console.log(error)
    }
}

// @desc Create Product
// @route POST /api/products
const createProduct = async (req, res) => {
    try {
        let body = await getPostData(req)
        const {name, description, price} = JSON.parse(body)
        let newProduct = {
            name,
            description,
            price
        }
        let product = await Product.create(newProduct)
        if (product) {
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Something went wrong'}))
        }
        
    } catch (error) {
        console.log(error)
    }
}

// @desc Update Product
// @route PUT /api/product/id
const updateProduct = async (req, res, id) => {
    try {
        let product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.parse({message: 'Not found'}))
        } else {
            let body = await getPostData(req)
            const {name, description, price} = JSON.parse(body)
            let productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            }
            let updProduct = await Product.update(id, productData)
            if (updProduct) {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(updProduct))
            }
        }
        
    } catch (error) {
        console.log(error``)
    }
}

// @desc Remove Product
// @route DELETE /api/products/id

const removeProduct = async (req, res, id) => {
    try {
        let product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Not found'}))
        } else {
            await Product.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `The product ${id} has been removed`}))
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
}