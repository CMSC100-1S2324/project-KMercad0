import {
    getUsers,
    addToCart,
    removeFromCart,
    getItemsFromCart,
    getCartTotalPrice,
    removeAllFromCart,
    getAllUserAccounts,
} from "./controllers/user-controller.js";
import {
    getProducts,
    addProduct,
    changeQuantity,
    updateProduct,
    deleteProduct,
    getQuantity,
} from "./controllers/product-controller.js";
import {
    getUserOrders,
    addOrder,
    getProductOfOrder,
    changeOrderStatus,
    getOrders,
    getUserOfOrder,
    deleteOrder,
} from "./controllers/order-controller.js";
import { signUp, login, checkIfLoggedIn } from "./controllers/auth-controller.js";

export default function router(app) {
    // allow cross origin resource sharing.
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        );
        next();
    });

    app.get("/", (req, res) => {
        res.send("API Home");
    });
    app.post("/signup", signUp);
    app.post("/login", login);
    app.post("/checkifloggedin", checkIfLoggedIn);
    app.post("/add-product", addProduct);
    app.post("/add-order", addOrder);
    app.get("/get-users", getUsers);
    app.get("/get-products", getProducts);
    app.get("/get-orders", getOrders);
    app.get("/get-quantity/:productID", getQuantity);
    app.get("/get-all-user-accounts", getAllUserAccounts);
    app.get("/get-user-orders/:userID", getUserOrders);
    app.get("/get-items-from-cart/:userID", getItemsFromCart);
    app.get("/get-cart-total-price/:userID", getCartTotalPrice);
    app.get("/get-user-of-order/:orderID", getUserOfOrder);
    app.get("/get-product-of-order/:orderID", getProductOfOrder);
    app.put("/add-to-cart/:userID", addToCart);
    app.put("/change-quantity/:productID", changeQuantity);
    app.put("/change-order-status/:orderID", changeOrderStatus);
    app.put("/update-product/:productId", updateProduct);
    app.delete("/remove-from-cart/:userID", removeFromCart);
    app.delete("/remove-all-from-cart/:userID", removeAllFromCart);
    app.delete("/delete-product/:productId", deleteProduct);
    app.delete("/delete-order/:orderID", deleteOrder);
}
