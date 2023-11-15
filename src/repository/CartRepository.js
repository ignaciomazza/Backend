import { cartModel } from "../dao/models/carts.model.js";

export class CartRepository {

    async get() {
        return carts = await cartModel.find().lean();
    }

    async getById(id) {
        return cart = await cartModel.findById(id)
    }

    async add(products) {
        let cartData = {};
        if (products && products.length > 0) {
            cartData.products = products;
        }
        return await cartModel.create(cartData);
    }

    async addProduct(cid, obj) {
        const filter = { _id: cid, "products._id": obj._id };
        const cart = await cartModel.findById(cid);
        const findProduct = cart.products.some((product) => product._id.toString() === obj._id);

        if (findProduct) {
            const update = { $inc: { "products.$.quantity": obj.quantity } };
            await cartModel.updateOne(filter, update);
        } else {
            const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
            await cartModel.updateOne({ _id: cid }, update);
        }

        return await cartModel.findById(cid);
    }

    async update(cid, products) {
        await cartModel.updateOne(
            { _id: cid },
            { products })
        return await cartModel.findOne({ _id: cid })
    }

    async delete(cid, products) {
        return await cartModel.findOneAndUpdate(
            { _id: cid },
            { products },
            { new: true })
    }

}