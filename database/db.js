const fs = require('fs/promises')
const path = require('path')

const db_path = path.join(__dirname, '../db.json')

async function simulateDelay() {
    return new Promise((resolve) => setTimeout(resolve, 1500))
}

async function readData() {
    await simulateDelay()
    const data = await fs.readFile(db_path, 'utf-8')
    return JSON.parse(data)

}


async function writeData(data) {
    await simulateDelay()
    await fs.writeFile(db_path,
        JSON.stringify(data, null, 2), 'utf-8')
}
module.exports = { readData, writeData }

