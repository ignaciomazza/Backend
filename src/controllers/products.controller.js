import ProductManager from '../dao/classes/productManager.dao.js';
const pm = new ProductManager()

export const getProducts = async (req, res) => {
    try {
        let { limit, page, sort, category } = req.query
        console.log(req.originalUrl);
        console.log(req.originalUrl.includes('page'));

        const options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sort: { price: Number(sort) }
        };

        if (!(options.sort.price === -1 || options.sort.price === 1)) {
            delete options.sort
        }

        const links = (products) => {
            let prevLink;
            let nextLink;
            if (req.originalUrl.includes('page')) {

                prevLink = products.hasPrevPage ? req.originalUrl.replace(`page=${products.page}`, `page=${products.prevPage}`) : null;
                nextLink = products.hasNextPage ? req.originalUrl.replace(`page=${products.page}`, `page=${products.nextPage}`) : null;
                return { prevLink, nextLink };
            }
            if (!req.originalUrl.includes('?')) {

                prevLink = products.hasPrevPage ? req.originalUrl.concat(`?page=${products.prevPage}`) : null;
                nextLink = products.hasNextPage ? req.originalUrl.concat(`?page=${products.nextPage}`) : null;
                return { prevLink, nextLink };
            }

            prevLink = products.hasPrevPage ? req.originalUrl.concat(`&page=${products.prevPage}`) : null;
            nextLink = products.hasNextPage ? req.originalUrl.concat(`&page=${products.nextPage}`) : null;
            console.log(prevLink)
            console.log(nextLink)

            return { prevLink, nextLink };

        }

        const categories = await pm.categories()

        const result = categories.some(categ => categ === category)
        if (result) {

            const products = await pm.getProducts({ category }, options);
            const { prevLink, nextLink } = links(products);
            const { totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, docs } = products
            return res.status(200).send({ status: 'success', payload: docs, totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, prevLink, nextLink });
        }

        const products = await pm.getProducts({}, options);
        const { totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, docs } = products
        const { prevLink, nextLink } = links(products);
        return res.status(200).send({ status: 'success', payload: docs, totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, prevLink, nextLink });
    } catch (err) {
        console.log(err);
    }
}

export const getProductById = async (req, res) => {
    const { pid } = req.params
    const productfind = await pm.getProductById(pid);
    res.json({ status: "success", productfind });
}

export const postProduct = async (req, res) => {
    const obj = req.body
    const newproduct = await pm.addProduct(obj);
    res.json({ status: "success", newproduct });
}

export const putProduct = async (req, res) => {
    const { pid } = req.params
    const obj = req.body
    const updatedproduct = await pm.updateProduct(pid, obj);
    res.json({ status: "success", updatedproduct });
}

export const deleteProduct = async (req, res) => {
    const id = req.params.pid
    const deleteproduct = await pm.deleteProduct(id);
    res.json({ status: "success", deleteproduct });
}