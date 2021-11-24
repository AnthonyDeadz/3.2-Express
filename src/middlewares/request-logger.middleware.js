/*
    Middleware, который выводит в консоль данные о запросе
    Если у запроса есть какие либо параметры, они также будут выведены в консоль
*/

module.exports = function (request, _response, next) {
  console.log(`${request.method} request to ${request.originalUrl}`)
  if (request.body && Object.keys(request.body).length > 0) {
    console.log('Body:')
    console.log(JSON.stringify(request.body, null, 2))
  }
  next()
}
