const { Router } = require('express')
const productsRepository = require('../repositories/products.repository')

const router = new Router()

router.get('/', async (_request, response) => {
  const products = await productsRepository.getAllFromCatalog()
  response.render('pages/index', { products: products })
})

router.get('/shopping-cart', async (_request, response) => {
  const products = await productsRepository.getAllFromCart()
  response.render('pages/shopping-cart', { products: products })
})

module.exports = router
