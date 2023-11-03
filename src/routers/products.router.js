import { Router } from 'express';
const routerP = Router()
import { getProducts, getProductById, postProduct, putProduct, deleteProduct } from '../controllers/products.controller.js'

routerP.get('/', getProducts)

routerP.get("/:pid", getProductById);

routerP.post("/", postProduct);

routerP.put("/:pid", putProduct);

routerP.delete("/:pid", deleteProduct);

export default routerP