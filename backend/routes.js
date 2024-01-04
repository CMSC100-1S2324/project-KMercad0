import {
    getUsers,
    addToCart,
    removeFromCart,
    getItemsFromCart,
    getCartTotalPrice,
    removeAllFromCart,
    viewAllAccount,
} from "./controllers/user-controller.js";
import {
    getProducts,
    addProduct,
    changeQuantity,
    updateProduct,
    deleteProduct,
} from "./controllers/product-controller.js";
import {
    getOrders,
    addOrder,
    getOrderProduct,
    changeOrderStatus,
    getAllOrders,
    getOrderUser,
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
    app.get("/get-users", getUsers);
    app.get("/get-products", getProducts);
    app.post("/get-orders", getOrders);
    app.post("/add-product", addProduct);
    app.post("/add-order", addOrder);
    app.put("/add-to-cart/:userID", addToCart);
    app.delete("/remove-from-cart/:userID", removeFromCart);
    app.get("/get-items-from-cart/:userID", getItemsFromCart);
    app.put("/change-quantity/:productID", changeQuantity);
    app.get("/get-cart-total-price/:userID", getCartTotalPrice);
    app.post("/get-order-product", getOrderProduct);
    app.post("/change-order-status", changeOrderStatus);
    app.delete("/remove-all-from-cart/:userID", removeAllFromCart);
    app.get("/view-all-account", viewAllAccount);
    app.get("/get-all-orders", getAllOrders);
    app.post("/get-order-user", getOrderUser);
    app.put("/update-product/:productId", updateProduct);
    app.delete("/delete-product/:productId", deleteProduct);
}
