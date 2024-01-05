import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Root from "./pages/Root";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ManageOrder from "./pages/ManageOrder";
import ManageProduct from "./pages/ManageProduct";
import ViewAccount from "./pages/ViewAccount";

// Send a POST request to API to check if the user is logged in. Redirect the user to /dashboard if already logged in
const checkIfLoggedInOnHome = async () => {
    const res = await fetch("http://localhost:3001/checkifloggedin", {
        method: "POST",
        credentials: "include",
    });

    const payload = await res.json();
    if (payload.isLoggedIn) {
        return redirect("/dashboard");
    } else {
        return 0;
    }
};

// Send a POST request to API to check if the user is logged in. Redirect the user back to / if not logged in.
const checkIfLoggedInOnAccount = async () => {
    const res = await fetch("http://localhost:3001/checkifloggedin", {
        method: "POST",
        credentials: "include",
    });

    const payload = await res.json();
    if (payload.isLoggedIn) {
        return true;
    } else {
        return redirect("/");
    }
};

const router = createBrowserRouter([
    { path: "/", element: <Auth />, loader: checkIfLoggedInOnHome },
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/dashboard", element: <Dashboard />, loader: checkIfLoggedInOnAccount },
            { path: "/manage-order", element: <ManageOrder />, loader: checkIfLoggedInOnAccount },
            { path: "/manage-product", element: <ManageProduct />, loader: checkIfLoggedInOnAccount },
            { path: "/view-account", element: <ViewAccount />, loader: checkIfLoggedInOnAccount },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
