const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')

// routes
const authRouter = require('./routes/auth-route')
const adminAuthRouter = require('./routes/admin/admin-auth-route')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')

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
app.use(express.json())
app.use('/api', authRouter)
app.use('/api', adminAuthRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)





