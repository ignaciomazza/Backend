import { CartRepository } from "../../repository/CartRepository.js"
import { TicketRepository } from "../../repository/TicketRepository.js";
import crypto from "crypto";

const cartRepository = new CartRepository()
const ticketRepository = new TicketRepository()

class CartManager {

    getCarts = async () => {
        try {
            return await cartRepository.get();
        } catch (err) {
            return [];
        }
    };

    getCartById = async (id) => {
        try {
            return await cartRepository.getById(id);
        } catch (err) {
            return err;
        }
    };

    addCart = async (products) => {
        try {
            return await cartRepository.add(products);
        } catch (err) {
            return err;
        }
    };

    addProductInCart = async (cid, obj) => {
        try {
            return await cartRepository.addProduct(cid, obj);
        } catch (err) {
            return err;
        }
    };

    deleteProductInCart = async (cid, products) => {
        try {
            return await cartRepository.delete(cid, products);
        } catch (err) {
            return err
        }
    }

    updateOneProduct = async (cid, products) => {
        try {
            return await cartRepository.update(cid, products);
        } catch (err) {
            return err
        }
    }

    purchaseCart = async () => {
        const cart = await cartRepository.getById(id);
        const productsCart = cart.products;
        console.log(cart, "cart");
        console.log(productsCart, "productsCart");
        let productsPurchased = [];
        let productsNotPurchased = [];
        let amount = 0;

        if (productsCart.length === 0) {
            return console.log(
                "No puedes realizar la compra, ya que no tienes productos en el carrito."
            );
        }

        for (const item of productsCart) {
            const product = await productRepository.getById(item.product._id);
            console.log(product.stock);

            if (item.quantity <= product.stock) {
                product.stock -= item.quantity;
                await product.save();
                productsPurchased.push(item);

                const productTotal = item.product.price * item.quantity;
                amount += productTotal;
            } else {
                productsNotPurchased.push(item);
            }
        }

        cart.products = productsNotPurchased;
        await cart.save();

        function generateUniqueCode() {
            return crypto.randomBytes(12).toString("hex");
        }
        console.log(productsPurchased, "purcheased");
        console.log(productsNotPurchased, "notPur");
        console.log(amount);
        const code = generateUniqueCode();
        const newTicket = await ticketRepository.create(code, amount, purchaser);
        console.log(newTicket, "newTicket");

        return { newTicket, productsNotPurchased };
    }

};

export default CartManager;