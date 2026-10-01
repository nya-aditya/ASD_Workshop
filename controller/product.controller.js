const productService = require('../services/product.service')

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts()
        return res.json(products)
    } catch (err) {
        return res.status(500).json({ err: err.message })
        // return err
    }
}

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
        // return err
    }
}

module.exports = { getProducts, getProductById };
