const db = require('../database/db')

async function getAllProducts() {
    return await db.readData()
}

async function getProductById(id) {
    const products = await db.readData()
    return products.find((item) => item.id === Number(id))
}

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

async function updateProduct(id, updateData) {
    const products = await db.readData()
    const index = products.findIndex((item) => item.id === Number(id))
    if (index === -1) {
        return null
    }

    products[index] = {
        ...products[index],
        ...updateData,
        id: Number(id) // keep id consistent
    }

    await db.writeData(products)
    return products[index]
}

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
