const express = require('express')
const productRoutes = require('./routes/product.routes')

const app = express()
const port = 3000

app.use(express.json())

app.use('/products', productRoutes)


app.listen(port, () => {console.log(`Server listening on port ${port}`)});