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
### 1. Setting Up Workspace
- Note: Make sure that you have already installed MongoDB in your device. Here is a quick video tutorial on how to install MongoDB on your device. https://www.youtube.com/watch?v=gB6WLkSrtJk&authuser=0
- Next, in your chosen work directory create a workspace folder and name it however you like. For convenience we used the Desktop.
### 2. Cloning Repository
- Open the project's github repository and copy it's link shown below.
   ![image](https://github.com/CMSC100-1S2324/project-KMercad0/assets/100903195/c2c470f2-d341-4067-813f-9ab5c546ff9b)
- In the terminal we have set up in step 1, copy and paste the code snippet below. Make sure to edit it with the repositories link.  
  ```bash
  git clone https://github.com/your-username/your-repository.git
  ```
- Or simply copy and paste this ready to use clone code snippet for our project's repository.
  ```bash
  git clone https://github.com/CMSC100-1S2324/project-KMercad0.git
  ```
- Lastly, go to the cloned project directory using the command cd.
    ![image](https://github.com/CMSC100-1S2324/project-KMercad0/assets/100903195/c1870940-18f4-4bfb-a48f-cde86277c9e0)
  - Note: You may need a special access key to copy the repository. Kindly message the developers if you encounter any problems.

### 3. Setting Up Database
- Open your MongoDB Compass, create a database named **FarmToTable**
    - In the FarmToTable database, using the JSON Source Files that can be found in the backend -> dummy data folder of the project,
      ![image](https://github.com/CMSC100-1S2324/project-KMercad0/assets/100903195/691b7077-8bf2-4687-a896-b68746861209)
        - Create three (3) collections named:
            - orders
            - products
            - users
              ![image](https://github.com/CMSC100-1S2324/project-KMercad0/assets/100903195/f3dd39e1-6c64-4c13-b0e5-ad1992aecb64)

  
### 4. Running the Project
- Open two (2) new terminals
    - Using the first terminal, go to the project's backend directory,
        - run command `npm i` or `npm install`,
        - then, run command `npm start`
          ![image](https://github.com/CMSC100-1S2324/project-KMercad0/assets/100903195/1c34c155-05e5-402a-b8c0-60f5b8d6bee3)
    - For the second terminal, go to the project's frontend directoy,
        - run command `npm i` or `npm install`,
        - then, run command `npm start`

          ![image](https://github.com/CMSC100-1S2324/project-KMercad0/assets/100903195/2bc90e4d-9a66-4354-9970-9f99ff43c8b6)
          ![image](https://github.com/CMSC100-1S2324/project-KMercad0/assets/100903195/86e74b13-a218-476e-a96b-ccbf56b7649b)


## You're all set up! Just wait for the project website to appear and open. 

