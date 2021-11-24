const { Router } = require('express')
const productsController = require('./products.controller')
const pageController = require('./page.controller')

const router = new Router()

router.use('/', pageController)
router.use('/products', productsController)

module.exports = router
