const ProductManager = require ("./productManager.js");
const manager = new ProductManager("./fileProducts/products.json")

const express = require("express")
const app = express()
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/products", async (req,res) => {

    const { limit } = req.query
    const products = await manager.getProducts()

    if (limit) {

        const limitproducts = products.slice(0,limit)
        res.json({status:"Success", limitproducts})

    }
    else {

        res.json({status:"Success", products})

    }
})

app.get("/products/:pid", async (req,res) => {

    const { pid } = req.params
    const products = await manager.getProducts()
    const productfind = products.find(el => el.id === parseInt(pid))
    
    console.log(productfind)
    res.send({status: "success", productfind})

})


app.listen(PORT,()=>{
    console.log("server is working")
})