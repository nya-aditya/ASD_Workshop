const express = require('express')
const router = express.Router()
const productController = require('../controller/product.controller')
const { cacheMiddleware } = require('../middleware/cache.middleware')

// GET endpoints (cached)
router.get('/', cacheMiddleware, productController.getProducts)
router.get('/:id', cacheMiddleware, productController.getProductById)

// Mutation endpoints
router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.patch('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router;