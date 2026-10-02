const express = require('express')
const productRoutes = require('./routes/product.routes')

const app = express()
const port = 3000

// incoming json body parse karne ke liye
app.use(express.json())

// terminal me har request print karne ke liye
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`)
    next()
})

// check karne ke liye ki server sahi chal raha hai ya nahi
app.get('/', (req, res) => {
    res.json({
        message: 'Product Catalog API with Caching Middleware',
        endpoints: {
            getAllProducts: 'GET /products',
            getProductById: 'GET /products/:id',
            createProduct: 'POST /products',
            updateProduct: 'PUT /products/:id',
            deleteProduct: 'DELETE /products/:id'
        }
    })
})

// saare product routes ko /products pe mount kar diya
app.use('/products', productRoutes)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})