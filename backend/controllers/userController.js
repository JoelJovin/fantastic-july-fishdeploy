const connection = require('../connect');

//user start create login logout 
const signup = (req, res) => {
  const { full_name, email, mobile_number, password,is_active, is_delete } = req.body;

  connection.query(
    'INSERT INTO users (full_name, email, mobile_number, password,is_active,is_delete) VALUES (?, ?, ?, ?,?,?)',
    [full_name, email, mobile_number, password,is_active,is_delete],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error inserting user data' });
      } else {
        res.status(200).json({ success: true, message: 'User data inserted successfully' });
      }
    }
  );
};
const login = (req, res) => {
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error querying database' });
      } else {
        if (results.length > 0) {
          // Update the is_active column to 1
          connection.query(
            'UPDATE users SET is_active = ? WHERE email = ?',
            [1, email],
            (updateErr, updateResults) => {
              if (updateErr) {
                console.error(updateErr);
                res.status(500).json({ success: false, error: 'Error updating is_active column' });
              } else {
                res.status(200).json({ success: true, message: 'Login successful', user: results[0] });
              }
            }
          );
        } else {
          res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
      }
    }
  );
};

const logout = (req, res) => {
  const { email } = req.body;

  connection.query(
    'UPDATE users SET is_active = ? WHERE email = ?',
    [0, email],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error updating is_active column' });
      } else {
        res.status(200).json({ success: true, message: 'Logout successful' });
      }
    }
  );
};

const clear = (req, res) => {
  const { email } = req.body;

  connection.query(
    'UPDATE users SET is_delete = ? WHERE email = ?',
    [1, email],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error updating is_active column' });
      } else {
        res.status(200).json({ success: true, message: 'Logout successful' });
      }
    }
  );
};


const users = (req, res) => {
  const email = req.query.email;
  if (!email) {
    res.status(401).json({ success: false, error: 'User email not found in session' });
    return;
  }

  connection.query(
    'SELECT * FROM users WHERE email=?',
    [email],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error querying database' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ success: false, error: 'User not found' });
        } else {
          res.status(200).json({ success: true, user: results[0] });
        }
      }
    }
  );
};


const deleteUser = (req, res) => {
  const { email } = req.body;

  connection.query(
    'UPDATE users SET is_delete = ? WHERE email = ?',
    [1, email],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error updating is_delete column' });
      } else {
        if (results.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'User deleted successfully' });
        } else {
          res.status(404).json({ success: false, error: 'User not found' });
        }
      }
    }
  );
};

// user end



// product create read
// const addProduct = (req, res) => {
//   const {
//     product_name_english,
//     product_name_tamil,
//     image_data,
//     product_category,
//     actual_price,
//     discount,
//     gross,
//     net,
//     serves,
//     pieces,
//     product_description,
//     is_delete
//   } = req.body;


//   if (!product_name_english || !product_name_tamil || !image_data || !product_category || actual_price === undefined || discount === undefined || gross === undefined || net === undefined || serves === undefined || pieces === undefined || !product_description) {
//     return res.status(400).json({ success: false, error: 'Please provide all required fields' });
//   }


//   connection.query(
//     `INSERT INTO products 
//     (product_name_english, product_name_tamil, image_data, product_category, actual_price, discount, gross, net, serves, pieces, product_description,is_delete) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
//     [product_name_english, product_name_tamil, image_data, product_category, actual_price, discount, gross, net, serves, pieces, product_description,is_delete],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ success: false, error: 'Error inserting product data' });
//       }
//       res.status(200).json({ success: true, message: 'Product data inserted successfully' });
//     }
//   );
// };


const addProduct = (req, res) => {
  const {
      product_name,
      product_name_tamil,
      category,
      actual_price,
      discount,
      gross,
      net,
      serves,
      pieces,
      description
  } = req.body;

  const image_data = req.file ? req.file.buffer : null; // Get the buffer for BLOB
  //console.log('req.file:', req.file); // Debugging

  // Validate the form fields
  if (!product_name || !product_name_tamil || !image_data || !category || actual_price === undefined || discount === undefined || gross === undefined || net === undefined || serves === undefined || pieces === undefined || !description) {
      return res.status(400).json({ success: false, error: 'Please provide all required fields' });
  }

  // Insert into database (assuming you have a MySQL connection setup)
  connection.query(
      `INSERT INTO products 
      (product_name_english, product_name_tamil, image_data, product_category, actual_price, discount, gross, net, serves, pieces, product_description, is_delete) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [product_name, product_name_tamil, image_data, category, actual_price, discount, gross, net, serves, pieces, description, 0],
      (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ success: false, error: 'Error inserting product data' });
          }
          res.status(200).json({ success: true, message: 'Product data inserted successfully' });
      }
  );
};


const getproduct = (req, res) => {
  connection.query(
      'SELECT * FROM products WHERE is_delete = 0',
      (err, results) => {
          if (err) {
              console.error(err);
              res.status(500).json({ success: false, error: 'Error querying database' });
          } else {
              // Convert image_data to Base64
              results.forEach(product => {
                  if (product.image_data) {
                      product.image_data = Buffer.from(product.image_data).toString('base64');
                  }
              });

              res.status(200).json({ success: true, products: results });
          }
      }
  );
};

const productid = (req, res) => {

  const productId = req.query.productId;
   if (!productId) {
    res.status(401).json({ success: false, error: 'User user_id not found in session' });
    return;
  }
  connection.query(
      'SELECT * FROM products WHERE id = ?',[productId],
      (err, results) => {
          if (err) {
              console.error(err);
              res.status(500).json({ success: false, error: 'Error querying database' });
          } else {
              // Convert image_data to Base64
              results.forEach(product => {
                  if (product.image_data) {
                      product.image_data = Buffer.from(product.image_data).toString('base64');
                  }
              });

              res.status(200).json({ success: true, products: results });
          }
      }
  );
};
// product end
const addAddress = (req, res) => {
  const { house_number, street_name, state,country, pin_code,user_id} = req.body;

  connection.query(
    'INSERT INTO addresses (house_number, street_name, state,country, pin_code,user_id) VALUES (?, ?, ?, ?,?,?)',
    [house_number, street_name, state,country, pin_code,user_id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error inserting address data' });
      } else {
        res.status(200).json({ success: true, message: 'Address data inserted successfully' });
      }
    }
  );
};

const address = (req, res) => {
  const user_id = req.query.user_id;
  console.log(user_id);
  if (!user_id) {
    res.status(401).json({ success: false, error: 'User user_id not found in session' });
    return;
  }

  connection.query(
    'SELECT * FROM addresses WHERE user_id=?',
    [user_id], 
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error querying database' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ success: false, error: 'User not found' });
        } else {
          res.status(200).json({ success: true, address: results[0] }); 
        }
      }
    }
  );
};

//order

const orders = (req, res) => {
  const {user_id, status, product_id, product_quantity, product_price,product_name,image_data, address_id }= req.body;

  connection.query(
    'INSERT INTO orders (user_id, status, product_id, product_quantity, product_price,product_name,image_data,address_id) VALUES (?,?,?,?,?,?,?,?)',
    [user_id, status, product_id, product_quantity, product_price,product_name,image_data,address_id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error inserting address data' });
      } else {
        res.status(200).json({ success: true, message: 'Address data inserted successfully' });
      }
    }
  );
};


const getorders = (req, res) => {
  const user_id = req.query.user_id;
  console.log(user_id);
  if (!user_id) {
    res.status(401).json({ success: false, error: 'User user_id not found in session' });
    return;
  }
  connection.query(
    'SELECT * FROM orders WHERE user_id=?',
    [user_id], 
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error querying database' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ success: false, error: 'User not found' });
        } else {
          res.status(200).json({ success: true, reviews: results}); 
        }
      }
    }
  );
};


const deleteorder = (req, res) => {
  const id = req.query.id
console.log(id);
  connection.query(
    'DELETE FROM orders WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error deleting order' });
      } else {
        if (results.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'Order deleted successfully' });
        } else {
          res.status(404).json({ success: false, error: 'Order not found' });
        }
      }
    }
  );
};


//review
const reviews = (req, res) => {
  const {rating, description,product_id} = req.body;

  connection.query(
    'INSERT INTO product_reviews (rating, description,product_id) VALUES (?, ?,?)',
    [rating, description,product_id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error inserting address data' });
      } else {
        res.status(200).json({ success: true, message: 'Address data inserted successfully' });
      }
    }
  );
};



const getreviews = (req, res) => {
  const product_id = req.query.product_id;
  console.log(product_id);
  if (!product_id) {
    res.status(401).json({ success: false, error: 'User user_id not found in session' });
    return;
  }
  connection.query(
    'SELECT * FROM product_reviews WHERE product_id=?',
    [user_id], 
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error querying database' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ success: false, error: 'User not found' });
        } else {
          res.status(200).json({ success: true, reviews: results[0] }); 
        }
      }
    }
  );
};
module.exports = {
  signup,
  addProduct, 
  getproductid:productid,
  addAddress,
  login,
  users,
  getproduct,
  deleteUser,
  getUserByEmail: users,
  getaddressbyid: address,
  deletebyemail:clear ,
  logout,
  reviews,
  getreviews,
  orders,
  getordersbyid: getorders,
  deleteorderbyid: deleteorder
};
