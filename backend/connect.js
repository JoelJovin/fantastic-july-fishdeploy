const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fruitka",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

module.exports = connection;