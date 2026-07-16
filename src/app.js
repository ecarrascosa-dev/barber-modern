const express = require('express')
const app = express()

const viewRoutes = require('./routes/viewRoutes')
const clientRoutes = require('./routes/clientRoutes')

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', clientRoutes)
app.use('/', viewRoutes)

module.exports = app