const orders = [
    { order_id: '123123', products_list: ['Analog Wrist Watch', 'Iphone Max Pro'], price_details: { subtotal: '320', shipping_fee: '20', tax_fee: '10' } },
    { order_id: '124124', products_list: ['Analog Wrist Watch', 'Iphone Max Pro'], price_details: { subtotal: '320', shipping_fee: '20', tax_fee: '10' } },
    { order_id: '125125', products_list: ['Analog Wrist Watch', 'Iphone Max Pro'], price_details: { subtotal: '320', shipping_fee: '20', tax_fee: '10' } },
  ];

const productDetails = [
    {name: 'iris watch', src_path: '../../img/product/prawn.webp', color: 'red', desc: 'This is an awesome product. Colored with black.', quantity: '2', price: '₹50' },
    {name: 'iris watch', src_path: '../../img/product/prawn.webp', color: 'red', desc: 'This is an awesome product. Colored with black.', quantity: '2', price: '₹50' },
    {name: 'iris watch', src_path: '../../img/product/prawn.webp', color: 'red', desc: 'This is an awesome product. Colored with black.', quantity: '2', price: '₹50' }
  ];

  const productbody = document.querySelector('#product-table tbody');

  if (productbody) {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    renderProductDetails(orderId);
  }

function getOrderById(orderId) {
    return orders.find(order => order.order_id === orderId);
  }

function renderProductDetails(order_id) {
  
    productbody.innerHTML = '';
    productDetails.forEach(product => {
  
      const prodDesc = `
        <ul>
          <li><b style="font-weight: 600">Color:</b> ${product.color}</li>
          <li><b style="font-weight: 600">Desc:</b> ${product.desc}</li>
          <li class="responsive"><b style="font-weight: 600">Quantity:</b> ${product.quantity}</li>
          <li class="responsive"><b style="font-weight: 600">Price:</b> ${product.price}</li>
        </ul>
       `;
      // const productsList = order.products_list.map(product => ` ${product} `).join(',');
      const row = `
            <tr>
            <td>
                  <div class="img-div">
                   <span><img src="${product.src_path}"></span>
                   <span>${product.name}</span>
                  </div>
            </td>
            <td>
                <div class="img-div">
                 <span><ul>${prodDesc}</ul></span>
                 <span id="reviewBtnSpan"><ul><button id="reviewBtn" class='btn-review'>Review</button></ul></span>
                </div>
              </td>
                <td><b style="font-weight: 600">X</b> ${product.quantity}</td>
                <td>${product.price}</td>
            </tr>
        `;
        productbody.innerHTML += row;
    });
  
  
    const orderdetail = document.querySelector('#order-detail');
    const foundOrder = getOrderById(order_id);
  
    const orderSummary = `
      <ul>
          <li>Subtotal: ₹${foundOrder.price_details.subtotal}</li>
          <li>Shipping Fee: ₹${foundOrder.price_details.shipping_fee}</li>
          <li>Tax Fee: ₹${foundOrder.price_details.tax_fee}</li>
          <li><b style="font-weight: 600">Total: ₹${parseFloat(foundOrder.price_details.subtotal) + parseFloat(foundOrder.price_details.shipping_fee) + parseFloat(foundOrder.price_details.tax_fee)}</b></li>
      </ul>
    `;
    orderdetail.innerHTML = orderSummary;
  }
  

  document.getElementById("reviewBtn").addEventListener('click', function () {
    function showMessageDiv() {
        const messageDiv = document.getElementById("review");
        messageDiv.style.display = "block";
        document.getElementById("contain").classList.add("blur-background");
    }
    showMessageDiv();
    const btn = document.querySelector(".btnPost");
    const post = document.querySelector(".post");
    const widget = document.querySelector(".star-widget");
    document.getElementById('btnPost').addEventListener('click', function () {
        widget.style.display = "none";
        post.style.display = "block";
        return false;
    });

    btnCancel.addEventListener('click', function () {
        window.location.reload();
    });
});