import { productsModel } from "../dao/models/products.model.js";

export class ProductRepository {

    async getView() {
        return await productsModel.find().lean()
    }

    async categories() {
        const categories = await productsModel.aggregate([
            {
                $group: {
                    _id: null,
                    categories: { $addToSet: "$category" }
                }
            }
        ])
        return categories[0].categories
    }

    async get(filter, options) {
        return await productsModel.paginate(filter, options)
    }

    async getById(id) {
        return await productsModel.findById(id)
    }

    async add(product) {
        await productsModel.create(product);
        return await productsModel.findOne({ title: product.title })
    }

    async update (id, product) {
        return await productsModel.findByIdAndUpdate(id, { $set: product })
    }

    async delete (id) {
        return await productsModel.findByIdAndDelete(id);
    }
}