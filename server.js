const http = require('http')
const {getProducts, getProduct, createProduct} = require('./controllers/productController')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
        // res.writeHead(200, {'Content-Type': 'application/json'})
        // res.end(JSON.stringify(products)
    
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        let id = req.url.split('/')[3]
        getProduct(req, res, id)

    } else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    }
    
      else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Not found'}))
    }
    

}).listen(PORT, () => console.log(`Server is running on port ${PORT}`))