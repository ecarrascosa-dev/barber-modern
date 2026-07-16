require('dotenv').config()
const connectDB = require('./src/config/database')
const app = require('./src/app')
        

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => console.log('Server Running...'))
        
    })