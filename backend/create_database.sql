-- Create the database
CREATE DATABASE IF NOT EXISTS fruitka;

-- Use the database
USE fruitka;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile_number VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    boolean is_active  NOT NULL,
    boolean is_delete  NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name_english VARCHAR(255),
    product_name_tamil VARCHAR(255),
    image_data BLOB,
    product_category VARCHAR(255),
    actual_price INT,
    discount INT,
    gross INT,
    net INT,
    serves INT,
    pieces INT,
    product_description TEXT
);


CREATE TABLE addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    house_number VARCHAR(255) NOT NULL,
    street_name VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    pin_code VARCHAR(10) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_id INT NOT NULL,
    product_quantity INT NOT NULL,
    product_price Int NOT NULL,
    address_id INT NULL
);

 CREATE TABLE product_reviews (
     id INT AUTO_INCREMENT PRIMARY KEY,
     rating INT NOT NULL,
     description TEXT,
     product_id INT 
    );