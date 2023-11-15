import { ProductRepository } from "../../repository/productRepository.js"

const productRepository = new ProductRepository()

export default class ProductManager {
    categories = async () => {
        try {
            return await productRepository.categories()
        }
        catch (err) {
            return err
        }
    }

    getProductsView = async () => {
        try {
            return await productRepository.getView()
        } catch (err) {
            return err
        }
    };

    getProducts = async (filter, options) => {
        try {
            return await productRepository.get(filter, options)
        } catch (err) {
            return err
        }
    }

    getProductById = async (id) => {
        try {
            return await productRepository.getById(id)
        } catch (err) {
            return { error: err.message }
        }

    }

    addProduct = async (product) => {
        try {
            return await productRepository.add(product)
        }
        catch (err) {
            return err
        }
    }

    updateProduct = async (id, product) => {
        try {
            return await productRepository.update(id, product)
        } catch (err) {
            return err
        }
    }

    deleteProduct = async (id) => {
        try {
            return await productRepository.delete(id);
        } catch (err) {
            return err
        }
    }
}