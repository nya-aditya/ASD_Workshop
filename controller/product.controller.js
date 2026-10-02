const productService = require('../services/product.service')
const { invalidateCache } = require('../middleware/cache.middleware')

// saare products fetch karne ke liye
async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts()
        return res.json(products)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// specific product ID se fetch karne ke liye
async function getProductById(req, res) {
    try {
        const { id } = req.params
        const product = await productService.getProductById(id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        return res.json(product)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// naya product create karne ke liye
async function createProduct(req, res) {
    try {
        const newProduct = await productService.createProduct(req.body)
        // naya product create hua toh purana cache khali karo
        invalidateCache()
        return res.status(201).json(newProduct)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// product ko update karne ke liye
async function updateProduct(req, res) {
    try {
        const { id } = req.params
        const updated = await productService.updateProduct(id, req.body)
        if (!updated) {
            return res.status(404).json({ message: 'Product not found' })
        }
        // product update hua toh purana cache khali karo
        invalidateCache()
        return res.json(updated)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// product delete karne ke liye
async function deleteProduct(req, res) {
    try {
        const { id } = req.params
        const deleted = await productService.deleteProduct(id)
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' })
        }
        // product delete hua toh purana cache khali karo
        invalidateCache()
        return res.json({ message: 'Product deleted successfully' })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
