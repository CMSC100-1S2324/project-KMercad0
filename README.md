# Final Project

## Group Members:
1. FERRER, Danjes 
2. MERCADO, Karl 
3. PANGA, Eric Conrad
4. TANIG, Stephanie

## Section: EF-1L 

## 1. Project Description:
This project is an e-commerce website prototype developed by a team of four for the use of the Department of 
Agriculture (DA) to facilitate transactions between farmers and customers directly. The DA has the capability 
to compile a catalog of items for sale in the public market. The technology stack used was MERN: MongoDB for the 
database, Node JS based web server using Express JS for the backend, and React JS for the frontend.

## 2. Project Specifications:

### a. User Types and Accounts:


### b. E-commerce Management (Administrator / Merchant View)


### c. Shop (Customer User View)


## 3. Schema:
The database structure used for this project (which is a modified version of the initial provided schema) is as
follows:
1. User
- User ID (String: Mongoose Object ID)
- First Name (String)
- Middle Name (String)
- Last Name (String)
- User Type (String)
- Email (String)
- Password (String)
- Cart (Array of Mongoose Object ID)

2. Product
- Product ID (String: Mongoose Object ID)
- Product Title (String)
- Product Name (String)
- Product Type (String: 1 - Crop / 2 - Poultry)
- Product Image URL (String)
- Product Price (Number)
- Product Quantity (Number)

3. Order
- Order ID (String: Mongoose Object ID)
- Product ID (String: Mongoose Object ID, ID Reference to Product)
- Order Quantity (Number)
- Order Price (Number)
- Order Status (Number: 0 - Pending / 1 - Completed / 2 - Canceled)
- User ID (String: Mongoose Object ID, ID Reference to User)
- Date Ordered (Date)

## 4. Packages:
The packages installed for this project as well as their functions are as follows:
1. Backend
- Bcrypt: encrypts and hashes passwords for secure storage
- Cookie Parser: parses HTTP request cookies for easy handling
- Cors: enables Cross-Origin Resource Sharing for secure communication between different domains
- Express: web application framework for building robust and scalable server-side applications
- JSON Web Token: implements secure token-based authentication and authorization
- Mongoose: ODM (Object Data Modeling) library for MongoDB and Node JS, simplifying database interactions
- Needle: lightweight HTTP client for making requests to external APIs
- Nodemon: monitors changes in the server-side code and automatically restarts the server during development

2. Frontend
- React: JavaScript library for building interactive and dynamic user interfaces
- Bootstrap: frontend framework for designing responsive and visually appealing web applications
- Universal Cookie: enables cookie handling in both server-side and client-side environments for consistent 
state management

## 5. How to Run:
