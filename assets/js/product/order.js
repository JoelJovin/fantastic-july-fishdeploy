

// Sample order data
const orders = [
    { order_id: '123123', image: '../../img/product/product-barracuda.jpeg', products_list: ['Analog Wrist Watch', 'Iphone Max Pro'], price_details: { subtotal: '320', shipping_fee: '20', tax_fee: '10' } },
    { order_id: '124124', image: '../../img/product/product-sardine.webp', products_list: ['Analog Wrist Watch', 'Iphone Max Pro'], price_details: { subtotal: '320', shipping_fee: '20', tax_fee: '10' } },
    { order_id: '125125', image: '../../img/product/product-sheer.jpeg', products_list: ['Analog Wrist Watch', 'Iphone Max Pro'], price_details: { subtotal: '320', shipping_fee: '20', tax_fee: '10' } },
  ];
  
  const tbody = document.querySelector('#order-table tbody');
  
  if (tbody) {
    renderOrders();
  }
  // Function to render orders in the table
  function renderOrders() {
  
    tbody.innerHTML = ''; // Clear existing content
  
    orders.forEach(order => {
      const productsList = order.products_list.map(product => ` ${product} `).join(',');
      const orderSummary = `
              <ul>
                  <li>Subtotal: ₹${order.price_details.subtotal}</li>
                  <li>Shipping Fee: ₹${order.price_details.shipping_fee}</li>
                  <li>Tax Fee: ₹${order.price_details.tax_fee}</li>
                  <li>Total: ₹${parseFloat(order.price_details.subtotal) + parseFloat(order.price_details.shipping_fee) + parseFloat(order.price_details.tax_fee)}</li>
                  <li id="view-more-li"><a class="view-more-order" href="#" onclick="renderProdDetails('${order.order_id}'); return false;">View More</a></li>
              </ul>
          `;
      const row = `
              <tr>
                <td>
                  <div class="img-div">
                   <span><img src="${order.image}"></span>
                   <span>Order Id #${order.order_id}</span>
                  </div>
                </td>
                <td>
                <div class="img-div">
                 <span><ul>${productsList}</ul></span>
                 <span><ul><b class="bold-text">Delivered On:</b> 31 March 2024</ul></span>
                </div>
              </td>
                  <td>${orderSummary}</td>
              </tr>
          `;
      tbody.innerHTML += row;
    });
  }
  
  function renderProdDetails(order_id) {
    window.location.href = `order-details.html?orderId=${order_id}`;
  }
  