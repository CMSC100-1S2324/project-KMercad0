import { getUsers, addUser } from "./controllers/user-controller.js";

export default function router(app) {
    // allow cross origin resource sharing.
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        );
        next();
    });

    app.get("/get-users", getUsers);
    app.post("/add-user", addUser);
}
