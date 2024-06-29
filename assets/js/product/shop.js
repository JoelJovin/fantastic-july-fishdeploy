function onChange() {
    const selectedValue = parseInt(document.querySelector('#shopping').value);
    const product_crud = JSON.parse(localStorage.getItem("product_crud"));

    product_crud.forEach(product => {
        const discountPercentage = parseFloat(product.product_discount);
        const sellPrice = parseFloat(product.product_sell);
        const realPrice = Math.round(sellPrice * (1 - discountPercentage / 100));
        product.product_real = realPrice;
    });
    
    let sortedProducts;
    switch(selectedValue) {
        case 1:
            sortedProducts = getRandomizedList(product_crud);
            break;
        case 2:
            sortedProducts = getRandomizedList(product_crud);
            break;
        case 3:
            sortedProducts = product_crud.sort((a, b) => {
                return a.product_name.localeCompare(b.product_name);
            });
            break;
        case 4:
            sortedProducts = product_crud.sort((a, b) => {
                return b.product_name.localeCompare(a.product_name);
            });
            break;
        case 5:
            sortedProducts = product_crud.sort((a, b) => {
                return a.product_real - b.product_real;
            });
            break;
        case 6:
            sortedProducts = product_crud.sort((a, b) => {
                return b.product_real - a.product_real;
            });
            break;
        case 7:
            sortedProducts = product_crud.sort((a, b) => {
                return a.product_quantity - b.product_quantity;
            });
            break;
        case 8:
            sortedProducts = product_crud.sort((a, b) => {
                return b.product_quantity - a.product_quantity;
            });
            break;
        default:
            sortedProducts = product_crud;
    }
    document.querySelector("#all-products").innerHTML = '';

    sortedProducts.forEach(product => {
        const template1 = product_upload(product);
        document.querySelector("#all-products").insertAdjacentHTML("beforeend", template1);
    });
};

function getRandomizedList(products) {
    const randomizedList = [...products];
    randomizedList.sort(() => Math.random() - 0.5);
    return randomizedList;
}


const product_crud = JSON.parse(localStorage.getItem("product_crud"));
console.log(product_crud);

product_crud.forEach(product => {
    const discountPercentage = parseFloat(product.product_discount);
    const sellPrice = parseFloat(product.product_sell);
    const realPrice = Math.round(sellPrice * (1 - discountPercentage / 100));
    product.product_real = realPrice;
});

for (const product_details of product_crud) {
    const template1 = product_upload(product_details);
    document.querySelector("#all-products").insertAdjacentHTML("beforeend", template1);
}

function product_upload(product_crud) {
    const template1 = `
        <div class="col-6 col-lg-4 mb-4 mb-sm-9" id="single-product">
            <div class="product-item product-st2-item">
                <div class="product-thumb">
                    <a class="d-block" href="#">
                        <img src="${product_crud["image_url"]}" class="img_src" width="370" height="450" alt="Image-HasTech">
                    </a>
                </div>
                <div class="product-info">
                    <div class="product-rating">
                        <div class="rating">
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-half-o"></i>
                        </div>
                        <div class="reviews">${product_crud["product_quantity"]} quantities</div>
                    </div>
                    <h4 class="title"><a href="./product-details.html?product_id=${product_crud["product_uuid"]}">${product_crud["product_name"]}</a></h4>
                    <div class="prices">
                        <span class="price">₹ ${product_crud["product_real"]}</span>
                        <span class="price-old">${product_crud["product_sell"]}</span>

                    </div>
                    <div class="product-action">
                        <button type="button" class="product-action-btn action-btn-cart" data-id="${product_crud["product_uuid"]}" id="btn-cart">
                            <span>Add to cart</span>
                        </button>
                        <a href="./product-details.html?product_id=${product_crud["product_uuid"]}">
                        <button type="button" class="product-action-btn action-btn-quick-view">
                            <i class="fa fa-expand"></i>
                        </button>
                        </a>
                    </div>
                   
                </div>
            </div>
        </div>
    `;
    return template1;
}


const productCategoryItems = document.querySelectorAll('.product-category-item');
productCategoryItems.forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); 
        const categoryName = this.querySelector('.title').textContent.toLowerCase();
        const filteredProducts = product_crud.filter(product => product.product_category.toLowerCase() === categoryName);
        document.querySelector("#all-products").innerHTML = '';
        filteredProducts.forEach(product => {
            const template1 = product_upload(product);
            document.querySelector("#all-products").insertAdjacentHTML("beforeend", template1);
        });
    });
});

document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("action-btn-cart")) {
        const id_cart = event.target.dataset.id;
        const product = product_crud.find(product => product.product_uuid === id_cart);
        if (!product) {
            alert("Product not found");
            return;
        }

        const product_price = product.product_real;
        const product_name = product.product_name;
        const image_url = product.image_url;
        const profile_id = JSON.parse(localStorage.getItem("profile_id"));
        const cart_list = JSON.parse(localStorage.getItem("cart_list")) || [];

        const exist = cart_list.some(data => data.product_uuid === id_cart && data.userId === profile_id);

        if (exist) {
            alert("Sorry, the product is already added to the cart");
            return;
        }

        if (!profile_id) {
            alert("Log In");
            window.location.href = "../home/login.html";
            return;
        }

        cart_list.push({
            product_uuid: id_cart,
            product_name,
            image_url,
            product_price,
            userId: profile_id,
            product_quantity: 1,
        });
        localStorage.setItem("cart_list", JSON.stringify(cart_list));
        alert("Product Added to the Cart");
        location.href = "./cart.html";
    }
});
