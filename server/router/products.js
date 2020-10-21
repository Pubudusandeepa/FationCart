import express from 'express'
import Product from '../model/ProductModel.js'
const router = express.Router()

router.get('/api/products', async (req, res) => {
  
    const products = await Product.find({})
    res.send(products)
})

router.post("/api/products", async (req, res) => {
    const newProduct =new Product(req.body);
    const saveProduct = await newProduct.save()

    res.send(saveProduct)
})

router.delete("/api/products/:id", async (req, res) => {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deleteProduct)
})

export default router;