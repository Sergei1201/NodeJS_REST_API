const http = require('http')
const {getProducts, getProduct, createProduct, updateProduct, removeProduct} = require('./controllers/productController')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        // Get All Products
        getProducts(req, res)
    
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        let id = req.url.split('/')[3]
        // Get Single Product
        getProduct(req, res, id)

    } else if (req.url === '/api/products' && req.method === 'POST') {
        // Create Product
        createProduct(req, res)
    
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        let id = req.url.split('/')[3]
        // Update Product
        updateProduct(req, res, id)

    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        let id = req.url.split('/')[3]
        removeProduct(req, res, id)
    }
     else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Not found'}))
    }
   

}).listen(PORT, () => console.log(`Server is running on port ${PORT}`))