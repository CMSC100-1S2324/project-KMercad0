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
    a. User ID (String: Mongoose Object ID)
    b. First Name (String)
    c. Middle Name (String)
    d. Last Name (String)
    e. User Type (String)
    f. Email (String)
    g. Password (String)
    h. Cart (Array of Mongoose Object ID)
2. Product
    a. Product ID (String: Mongoose Object ID)
    b. Product Title (String)
    c. Product Name (String)
    d. Product Type (String: 1 - Crop / 2 - Poultry)
    e. Product Image URL (String)
    f. Product Price (Number)
    g. Product Quantity (Number)
3. Order
    a. Order ID (String: Mongoose Object ID)
    b. Product ID (String: Mongoose Object ID, ID Reference to Product)
    c. Order Quantity (Number)
    d. Order Price (Number)
    e. Order Status (Number: 0 - Pending / 1 - Completed / 2 - Canceled)
    f. User ID (String: Mongoose Object ID, ID Reference to User)
    g. Date Ordered (Date)

## 4. Packages:
The packages installed for this project as well as their functions are as follows:
1. Backend
    a. Bcrypt: encrypts and hashes passwords for secure storage
    b. Cookie Parser: parses HTTP request cookies for easy handling
    c. Cors: enables Cross-Origin Resource Sharing for secure communication between different domains
    d. Express: web application framework for building robust and scalable server-side applications
    e. JSON Web Token: implements secure token-based authentication and authorization
    f. Mongoose: ODM (Object Data Modeling) library for MongoDB and Node JS, simplifying database interactions
    g. Needle: lightweight HTTP client for making requests to external APIs
    h. Nodemon: monitors changes in the server-side code and automatically restarts the server during development
2. Frontend
    a. React: JavaScript library for building interactive and dynamic user interfaces
    b. Bootstrap: frontend framework for designing responsive and visually appealing web applications
    c. Universal Cookie: enables cookie handling in both server-side and client-side environments for consistent 
    state management

## 5. How to Run:
