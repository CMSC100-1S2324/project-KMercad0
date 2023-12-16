import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Cookies from "universal-cookie";

import { Card, Button } from "react-bootstrap";

export default function Dashboard() {
    const username = localStorage.getItem("username");
    const type = localStorage.getItem("type");
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    function logout() {
        const cookies = new Cookies();
        cookies.remove("authToken");

        localStorage.removeItem("username");

        setIsLoggedIn(false);
    }

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/get-products")
            .then((response) => response.json())
            .then((body) => {
                setProducts(body);
            });
    });

    /*
    TODO:
    1. Edit only this part.
    Note: Following codes used ternary operator for determining what dashboard should appear for
    the user and admin.
    */
    return type === "user" ? (
        // user
        <>
            Welcome to the dashboard, {username} !<br />
            <button onClick={logout}>Log Out</button>
            {products.map((product, index) => (
                <Card key={index} style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="https://picsum.photos/100" />
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>{product.name}</Card.Text>
                        <Card.Text>{product.price}</Card.Text>
                        <Card.Text>{product.quantity}</Card.Text>
                        <Button variant="primary">Add to Cart</Button>
                    </Card.Body>
                </Card>
            ))}
        </>
    ) : (
        // admin
        <>
            Welcome to the dashboard, {username} !<br />
            <button onClick={logout}>Log Out</button>
        </>
    );
}
