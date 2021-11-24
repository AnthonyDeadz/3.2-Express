const path = require('path')
const { readJsonFile, writeJsonFile } = require('../utils/file.utils')

const FILE_PATH = path.resolve(
  path.dirname(require.main.filename),
  'data',
  'products.json'
)

const FILE_PATH_CART = path.resolve(
  path.dirname(require.main.filename),
  'data',
  'productInCart.json'
)

const productsRepository = {
  async getAllFromCatalog() {
    return (await readJsonFile(FILE_PATH)) || []
  },

  async getAllFromCart() {
    return (await readJsonFile(FILE_PATH_CART)) || []
  },

  async add(product) {
    const products = await this.getAllFromCart()
    products.push(product)

    await writeJsonFile(FILE_PATH_CART, products)

    return product
  },

  async delete(product) {
    const products = await this.getAllFromCart()
    const findIndex = products.findIndex((obj) => obj.id == product.id)
    products.splice(findIndex, 1)

    await writeJsonFile(FILE_PATH_CART, products)
  },
}

module.exports = productsRepository
