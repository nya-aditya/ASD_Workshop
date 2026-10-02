const express = require('express')
const router = express.Router()
const productController = require('../controller/product.controller')
const { cacheMiddleware } = require('../middleware/cache.middleware')


router.get('/', cacheMiddleware, productController.getProducts)
router.get('/:id', cacheMiddleware, productController.getProductById)

module.exports = router;