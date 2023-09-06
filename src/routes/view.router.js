import { Router } from "express"
import ProductManager from "../managers/productManager.js"
import { __dirname } from "../utils.js"
const manager = new ProductManager(__dirname + '/fileProducts/products.json')

const router = Router()

router.get("/", async (req, res) => {
    const listProducts = await manager.getProducts({})
    console.log(listProducts)
    res.render("home", { listProducts })
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts")
})

export default router