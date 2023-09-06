const socketCliente = io();
socketCliente.on("productos", (products) => {
    console.log(products);
    updateProductList(products);
});

function updateProductList(products) {
    let div = document.getElementById("list-products");
    let productos = "";

    products.forEach((product) => {
        productos += `
            <div class="card" style="width: 18rem;">
                <img src="${product.thumbnail}" class="card-img-top" alt="..." height="400px">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <a href="#" class="btn btn-primary">Buy Now</a>
                </div>
            </div>`;
    });

    div.innerHTML = productos;
}

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let thumbnail = form.elements.thumbnail.value;
    let category = form.elements.category.value;
    let price = form.elements.price.value;
    let code = form.elements.code.value;

    socketCliente.emit("addProduct", {
        title,
        description,
        stock,
        thumbnail,
        category,
        price,
        code,
    });

    form.reset();
});

document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteidinput = document.getElementById("id-prod");
    const deleteid = parseInt(deleteidinput.value);
    socketCliente.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
});

socketCliente.on("productosupdated", (obj) => {
    updateProductList(obj);
});