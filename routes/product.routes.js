const express = require('express')
const router = express.Router()
const productController = require('../controller/product.controller')
const { getProductById } = require('../services/product.service')

router.get('/', productController.getProducts)
router.get('/:id', productController, getProductById)

module.exports = router;