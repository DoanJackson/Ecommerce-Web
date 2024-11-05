-- Create users table
CREATE TABLE users(
    id varchar(100) UNIQUE NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    password varchar(100) NOT NULL,
    role varchar(20) NOT NULL,
    name varchar(100),
    PRIMARY KEY (id),
)

-- Create admin table
CREATE TABLE admin(
	id varchar(100) UNIQUE NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(id) REFERENCES users(id)
);

-- Create client table
CREATE TABLE client(
	id varchar(100) UNIQUE NOT NULL,
	roleClient varchar(20),
	age INTEGER CHECK (age >= 0),
	address varchar(100),
	balance numeric(15,2),
	telPhone varchar(15),
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE;
);

-- Create clientnormal table
CREATE TABLE clientnormal(
	id varchar(100) UNIQUE NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES client(id) ON DELETE CASCADE
);

-- Create merchant table
CREATE TABLE merchant(
	id varchar(100) UNIQUE NOT NULL,
	nameShop varchar(100),
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES client(id) ON DELETE CASCADE
);

-- Create goods table
CREATE TABLE goods(
	id_good varchar(100) UNIQUE NOT NULL,
	name varchar(100),
	quantity INTEGER CHECK (quantity >= 0),
	numberSold INTEGER CHECK (numberSold >= 0),
	cost numeric(15,2),
	type varchar(20),
	id_merchant varchar(100) NOT NULL,
	PRIMARY KEY (id_good),
	FOREIGN KEY (id_merchant) REFERENCES merchant(id) ON DELETE CASCADE
);
-- Xong den phan goods roi

-- Create giftcode table
CREATE TABLE giftcode(
	id varchar(100) NOT NULL,
	name varchar(100),
	numberCoin INTEGER CHECK (numberCoin >= 0),
	quantity INTEGER CHECK (quantity >= 0),
	idAdmin varchar(100) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (idAdmin) REFERENCES admin (id) ON DELETE SET NULL
);

-- Create order_good
CREATE TABLE order_good(
	id_order varchar(100),
	id_client varchar(100) NOT NULL,
	id_good varchar(100) NOT NULL,
	quantity INTEGER CHECK (quantity >0),
	date_bought TIMESTAMPTZ DEFAULT NOW(),
	PRIMARY KEY (id_order),
	FOREIGN KEY (id_client) REFERENCES client(id) ON DELETE CASCADE,
	FOREIGN KEY (id_good) REFERENCES goods(id_good) ON DELETE CASCADE
) 


-- Create creategift table
CREATE TABLE creategift (
	id_giftcode varchar (100) UNIQUE NOT NULL,
	id_admin varchar (100),
	PRIMARY KEY (id_giftcode),
	FOREIGN KEY (id_giftcode) REFERENCES giftcode (id) ON DELETE CASCADE,
	FOREIGN KEY (id_admin) REFERENCES admin (id) ON DELETE SET NULL
);

-- Create usegiftcode table (for client) 
CREATE TABLE usegiftcode (
	id_client varchar (100) NOT NULL,
	id_giftcode varchar (100) NOT NULL,
	time_use TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id_client,id_giftcode),
	FOREIGN KEY (id_client) REFERENCES client (id) ON DELETE CASCADE,
	FOREIGN KEY (id_giftcode) REFERENCES giftcode (id) ON DELETE CASCADE
);

-- Create Type table to manage type
CREATE TABLE typegood(
	type varchar(20),
	PRIMARY KEY (type)
);

-- Add type of good reference to type of typegood table
ALTER TABLE goods
ADD CONSTRAINT fk_type
FOREIGN KEY (type) REFERENCES typegood(type);

-- Add some types of good to typegood table
INSERT INTO typegood (type) VALUES ('Smartphone'),('Tablet'),('Laptop'),('Earphone'),('Watch'),('Camera'),('Household appliances'),('Accessory'),('PC'),('Television');

-- Create table image to store filedirectory and url
CREATE TABLE image(
	id varchar(100),
	filedirectory text UNIQUE NOT NULL,
	urlimage text UNIQUE NOT NULL,
	PRIMARY KEY (id)
)

-- Create table imagegood to store the relationship between good and their images
CREATE TABLE imagegood(
	id_image varchar(100),
	id_good varchar(100),
	PRIMARY KEY (id_image),
	FOREIGN KEY (id_image) REFERENCES image(id) ON DELETE CASCADE,
	FOREIGN KEY (id_good) REFERENCES goods (id_good) ON DELETE CASCADE
);

-- Create table imageclient to store the relationship between client and their images
CREATE TABLE imageclient(
	id_image varchar(100),
	id_client varchar(100),
	type varchar(20),
	PRIMARY KEY (id_image),
	FOREIGN KEY (id_image) REFERENCES image(id) ON DELETE CASCADE,
	FOREIGN KEY (id_client) REFERENCES client (id) ON DELETE CASCADE
);

ALTER TABLE image 
ADD COLUMN type varchar(20);

-- Insert created time to good table
ALTER TABLE goods ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE order_good ADD COLUMN address varchar(255) NOT NULL

-- Add city, district of where to get order of customer to order_good table
ALTER TABLE order_good ADD COLUMN city varchar(100) NOT NULL DEFAULT 'Unknown'
ALTER TABLE order_good ADD COLUMN district varchar(100) NOT NULL DEFAULT 'Unknown'

-- Cau lenh de lay du lieu don hang

SELECT ord_good.id_order as id_order, mer.nameshop as shop_name, gd.name as name_good, gd.type as type, ord_good.quantity as quantity_bought, ord_good.district as district, ord_good.city as city, 
	TO_CHAR(ord_good.date_bought,'DD/MM/YYYY') AS date_bought,
	img.urlimage AS url_main_image
FROM order_good AS ord_good
INNER JOIN 
	goods as gd ON ord_good.id_good = gd.id_good
INNER JOIN 
	imagegood as img_good ON img_good.id_good = gd.id_good
INNER JOIN
	image as img ON img.id = img_good.id_image
INNER JOIN
	merchant AS mer ON gd.id_merchant = mer.id
WHERE ord_good.id_client='f50de439-6783-4503-ba3e-020e6240c3b4' AND img.type='main'-- Day la id don hang va chi lay anh chinh