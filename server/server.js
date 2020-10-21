import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import ProductRouter from './router/products.js'


const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use('/', ProductRouter)

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => {
    console.log("mongodb connected")
})

app.listen(5000, () => {
    console.log(`Server started ${5000} `)
})