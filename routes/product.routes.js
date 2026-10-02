const express = require('express')
const router = express.Router()
const productController = require('../controller/product.controller')
const { cacheMiddleware } = require('../middleware/cache.middleware')

// GET endpoints (yaha pe caching middleware lagaya hai)
router.get('/', cacheMiddleware, productController.getProducts)
router.get('/:id', cacheMiddleware, productController.getProductById)

// Mutation endpoints (yaha caching ki zarurat nahi hai)
router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.patch('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router