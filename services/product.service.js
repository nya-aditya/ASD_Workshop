const db = require("../database/db")

async function getAllProducts() {
    return await db.readData()
}

async function getProductById(id) {
    const products = await db.readData();
    return products.find((item) => item.id === Number(id))
}

module.exports = { getAllProducts, getProductById };
