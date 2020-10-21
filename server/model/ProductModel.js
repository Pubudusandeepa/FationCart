import mongoose from 'mongoose'
import shortid from 'shortid'


const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate,
    },
    title: String,
    image: String,
    description: String,
    price: Number,
    availableSizes: [String],
})

const Product = mongoose.model("products", productSchema)

export default Product