import { Router } from 'express';
import { getProducts, getProductById, postProduct, putProduct, deleteProduct } from '../controllers/products.controller.js'

const routerP = Router()

routerP.get('/', getProducts)
routerP.get("/:pid", getProductById);
routerP.post("/", postProduct);
routerP.put("/:pid", putProduct);
routerP.delete("/:pid", deleteProduct);

export default routerP