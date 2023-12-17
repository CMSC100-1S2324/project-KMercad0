import { getUsers, addToCart, removeFromCart, retrieveItemsFromCart } from "./controllers/user-controller.js";
import { getProducts, addProduct } from "./controllers/product-controller.js";
import { getOrders, addOrder } from "./controllers/order-controller.js";
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
    app.get("/get-orders", getOrders);
    app.post("/add-product", addProduct);
    app.post("/add-order", addOrder);
    app.post("/add-to-cart", addToCart);
    app.post("/remove-from-cart", removeFromCart);
    app.post("/retrieve-items-from-cart", retrieveItemsFromCart);
}
