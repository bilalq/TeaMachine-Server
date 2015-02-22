/**
 * Module dependencies
 */
var express = require('express')
  , path = require('path')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , logger = require('morgan')
  , sassMiddleware = require('node-sass-middleware')

var app = express()

/**
 * Configure app
 */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(sassMiddleware({
  src: path.join(__dirname, '..', 'styles'),
  dest: path.join(__dirname, '..', 'dist'),
  debug: true,
  outputStyle: 'compressed'
}))
app.use(express.static(path.join(__dirname, '..', 'dist')))

/**
 * Register routes
 */
app.use('/', require('./routes/index'))

/**
 * Export application module
 */
module.exports = app
