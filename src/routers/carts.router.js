import { Router } from 'express';
const routerC = Router()

import { getCarts, getCartById, postCarts, postCartById, putCartById, deleteCartById, deleteCarts } from '../controllers/carts.controller.js'

routerC.get("/", getCarts)

routerC.get("/:cid", getCartById)

routerC.post('/', postCarts);

routerC.post("/:cid/products/:pid", postCartById);

routerC.put('/:cid', putCartById);

routerC.delete('/:cid/product/:pid', deleteCartById);

routerC.delete('/:cid', deleteCarts);

export default routerC