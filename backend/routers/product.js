/**
 * ===================
 * PRODUCT ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const Product = require('../Models/Product');
const {verifyTokenAndAdmin} = require('./veryfiToken')

// Product Create
router.post('/create', verifyTokenAndAdmin, async(req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const saveProduct = await newProduct.save()
        await res.status(200).json(saveProduct)
    }catch(e){
        await res.status(500).json(e.message)
    }
})
//UPDATE
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
  
  //DELETE
  router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
  
  //GET PRODUCT
  router.get("/find/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
  
  //GET ALL PRODUCTS
  router.get("/all", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      }
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });



 module.exports = router