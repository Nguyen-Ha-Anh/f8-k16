-- Tao DATABASE
CREATE DATABASE e_commerce 

use e_commerce

-- Tao bang
CREATE TABLE customers(
	id int PRIMARY KEY AUTO_INCREMENT,
	full_name varchar(100),
	email varchar(100),
	city varchar(50)
)

INSERT INTO customers(full_name, email, city)
VALUES
(
    "An",
    "an123@gmail.com",
    "Ha Noi"
),
(
    "Son",
    "son456@gmail.com",
    "Da Nang"
),
(
    "Cuong",
    "cuong789@gmail.com",
    "Ho Chi Minh"
),
(
    "Trang",
    "trang101@gmail.com",
    "Hai Phong"
);

CREATE TABLE orders(
	id int PRIMARY KEY AUTO_INCREMENT,
	customer_id int,
	FOREIGN KEY (customer_id) REFERENCES customers(id),
	order_date DATE,
	total_amount DECIMAL(12,2)
)

INSERT INTO orders(customer_id, order_date, total_amount)
VALUES
(
	1,
	CURDATE(),
	2500000
),
(
	1,
	'2025-09-20',
	3000000
),
(
	1,
	'2025-12-22',
	5500000
),
(
	2,
	"2025-03-01",
	1200000
),
(
	3,
	CURDATE(),
	5500000
),
(
	3,
	"2026-02-22",
	3500000
),
(
	4,
	"2026-01-1",
	3500000
)


CREATE TABLE order_items(
	id int PRIMARY KEY AUTO_INCREMENT,
	order_id int,
	FOREIGN KEY (order_id) REFERENCES orders(id),
	product_name varchar(100),
	quantity int,
	price DECIMAL(10,2)
)

INSERT INTO order_items(order_id, product_name, quantity, price) 
VALUES
(
	1,
	'Hoddie',
	2,
	2000000
),
(
	2,
	'Sweater',
	1,
	100000
),
(
	3,
	'T_shirt',
	1,
	500000
),
(
	4,
	'Jeans',
	2,
	750000
),
(
	5,
	'Jacket',
	1,
	1500000
)


-- Bai 1: Lấy danh sách khách hàng và tổng số đơn hàng của mỗi người.
SELECT customers.full_name, COUNT(orders.id) as total_orders
FROM customers
JOIN orders
ON customers.id = orders.customer_id
GROUP BY customers.full_name

-- Bai 2: Lấy danh sách khách hàng và tổng tiền đã chi tiêu.
SELECT customers.full_name, SUM(orders.total_amount) as total_spent
FROM customers
JOIN orders
ON customers.id = orders.customer_id
GROUP BY customers.full_name
ORDER BY total_spent DESC

-- Bai 3: Lấy danh sách sản phẩm và tổng số lượng đã bán.
SELECT order_items.product_name, SUM(order_items.quantity) as total_quantity
FROM order_items
GROUP BY order_items.product_name
ORDER BY total_quantity DESC

-- Bai 4: Lấy danh sách khách hàng: Có ít nhất 2 đơn hàng
SELECT customers.full_name, COUNT(orders.customer_id) 
FROM customers
JOIN orders
ON customers.id = orders.customer_id
GROUP BY customers.full_name
HAVING COUNT(orders.customer_id) >= 2

-- Bai 5:Lấy danh sách khách hàng: Tổng chi tiêu > 10,000,000
SELECT customers.full_name, SUM(orders.total_amount)
FROM customers
JOIN orders
ON customers.id = orders.customer_id
GROUP BY customers.full_name
HAVING SUM(orders.total_amount) > 10000000