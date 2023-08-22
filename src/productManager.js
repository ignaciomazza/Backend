const fs = require("fs");

class ProductManager {
    constructor (path){
        this.path = path;
    }

    getProducts = async () => {
        const productList = await fs.promises.readFile(this.path, "utf-8");
        const productListParse = JSON.parse(productList);
        return productListParse;    
    }

    getProductById = async (id) => {
        const productList = await fs.promises.readFile(this.path, "utf-8");
        const productListParse = JSON.parse(productList);
        const product = productListParse.find(el => el.id == id);
        if (!product) {
            console.error("Product Not Found")
        }else{
            return product;
        }
    }

    addProducts = async (title, description, price, thumbnail, code, stock) => {
        const productList = await fs.promises.readFile(this.path, "utf-8");
        const productListParse = JSON.parse(productList);
        const id = productListParse.length + 1;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios!");
        }else{
            const codeFilter = productListParse.find(el => el.code == code);
            if (codeFilter) {
                console.error("El codigo del producto ya existe.");
            }else{
                const newProduct = { id, title, description, price, thumbnail, code, stock };
                productListParse.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(productListParse))
            }
        }
    }

    updateProduct = async(id, title, description, price, thumbnail, code, stock)=>{
        if(!id || !title || !description || !price || !thumbnail || !code || !stock){
          console.error("Todos los campos son obligatorios!")
          return 
        }
        else{
            const productsList = await this.getProducts()
            const newProductsList = productsList.map(elemento => {
            if(elemento.id === id){
                const updatedProduct = {
                    ...elemento,
                    title,description,price,thumbnail,code,stock
                }
                return updatedProduct
            }
            else{
                return elemento
            }
        })
        await fs.promises.writeFile(this.path,JSON.stringify(newProductsList,null,2))
        }
    }

    deleteProduct=async(id)=>{
        const productList = await this.getProducts()
        const productswithoutfound = productList.filter(elemento=>elemento.id!==id)
        await fs.promises.writeFile(this.path,JSON.stringify(productswithoutfound,null,2))
    }
}

module.exports = ProductManager;

// async function Generator() {
//     const productManager = new ProductManager("../fileProducts/products.json");
//     // await productManager.addProducts("Iphone 14", "Apple Iphone 14", 1099, "iphone14.jpg", "code1", 657);
//     // await productManager.addProducts("Iphone 12", "Apple Iphone 12", 799, "iphone12.jpg", "code2", 434);
//     // await productManager.addProducts("Iphone 13", "Apple Iphone 13", 899, "iphone13.jpg", "code3", 472);
//     // await productManager.addProducts("Iphone 11", "Apple Iphone 11", 699, "iphone11.jpg", "code4", 785);
//     // await productManager.addProducts("Iphone X", "Apple Iphone X", 599, "iphoneX.jpg", "code5", 574);
//     // await productManager.addProducts("Iphone 7", "Apple Iphone 7", 499, "iphone7.jpg", "code6", 845);
//     await productManager.updateProduct(6, "Iphone 7", "Apple Iphone 7", 399, "iphone7.jpg", "code6", 8151);
//     await productManager.deleteProduct(2);
//     const list = await productManager.getProducts();
//     const idList = await productManager.getProductById(1);
//     console.log(list);
//     console.log(idList);
// }

// Generator();
