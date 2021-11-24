/*
    VIEW = public + views (ejs + css)
    CONTROLLER = controllers
    MODEL = middlewares + repositories + utils

    public - то, что будет показано "публике", стили css

    views - то, как все будет выглядеть, разметка ejs

    controllers - взаимодействует с компонентами программы и посылает ответы пользователю

    middlewares - что-то типо конструкторов, проверяет совпадают ли данные пользователя с данными сервера, проверяет авторизовался он или нет и т.д.

    repositories - все данные о пользователях хранятся тут

    utils - все функции, работающие с файлами вынесены сюда, данная папка для каких либо вспомогательных, дополнительных функций
*/

const express = require('express')
const path = require('path')
const requestLogger = require('./middlewares/request-logger.middleware')
const controllers = require('./controllers')
const cors = require('cors')

const PORT = 3000

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.resolve(__dirname, 'views'))

server.use(express.static(path.resolve(__dirname, 'public')))

server.use(
  cors({
    origin: '*',
  })
)

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(requestLogger)

server.use(controllers)

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
