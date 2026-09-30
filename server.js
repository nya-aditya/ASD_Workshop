const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3000
const cache = {}
const pathToFile = path.join(__dirname, 'db.json')

function readFile() {
  try {
    const data = fs.readFileSync(pathToFile, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
    return []
  }
}

app.get('/products', (req, res) => {
  try {
    const products = readFile()
    res.json(products)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error fetching products' })
  }
})

app.get('/products/:id', (req, res) => {
  try {
    const products = readFile()
    const product = products.find((item) => item.id === Number(req.params.id))
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error fetching product' })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
