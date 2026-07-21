const express = require('express')
const path = require('path')
const app = express()

const viewRoutes = require('./routes/viewRoutes')
const clientRoutes = require('./routes/clientRoutes')

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', clientRoutes)
app.use('/', viewRoutes)

module.exports = app