const db = require('../database/db')

// saare products fetch karne ka logic
async function getAllProducts() {
    return await db.readData()
}

// specific product ID find karne ka logic
async function getProductById(id) {
    const products = await db.readData()
    return products.find((item) => item.id === Number(id))
}

// naya product add karne ka logic
async function createProduct(productData) {
    const products = await db.readData()
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    const newProduct = {
        id: newId,
        name: productData.name,
        price: productData.price
    }
    products.push(newProduct)
    await db.writeData(products)
    return newProduct
}

// product details update karne ka logic
async function updateProduct(id, updateData) {
    const products = await db.readData()
    const index = products.findIndex((item) => item.id === Number(id))
    if (index === -1) {
        return null
    }

    products[index] = {
        ...products[index],
        ...updateData,
        id: Number(id)
    }

    await db.writeData(products)
    return products[index]
}

// product delete karne ka logic
async function deleteProduct(id) {
    const products = await db.readData()
    const index = products.findIndex((item) => item.id === Number(id))
    if (index === -1) {
        return false
    }

    products.splice(index, 1)
    await db.writeData(products)
    return true
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
