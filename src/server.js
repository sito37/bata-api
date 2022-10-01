const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

// routes
const authRouter = require('./routes/auth-route')
const adminAuthRouter = require('./routes/admin/admin-auth-route')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const initialDataRouter = require('./routes/admin/initial-data')

const app = express()

// environment variable configuration
env.config()

mongoose.connect(process.env.MONGODB)
    .then(res => {
        app.listen(process.env.PORT, () => {
            console.log(`server listening on ${process.env.PORT}`)
        })
    })

// middlewares
app.use(cors())
app.use(express.json())
app.use('/public',express.static(path.join(__dirname, 'uploads')))
app.use('/api', authRouter)
app.use('/api', adminAuthRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)
app.use('/api', cartRouter)
app.use('/api', initialDataRouter)





