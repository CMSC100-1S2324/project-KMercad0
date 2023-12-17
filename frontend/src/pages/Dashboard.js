import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Cookies from "universal-cookie";

import { Card, Button, Container, Row } from "react-bootstrap";

export default function Dashboard() {
    const _id = localStorage.getItem("_id");
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
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/get-products")
            .then((response) => response.json())
            .then((body) => {
                setProducts(body);
            });
        fetch("http://localhost:3001/retrieve-items-from-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: _id }),
        })
            .then((response) => response.json())
            .then((body) => {
                setCart(body);
            });
    }, [_id]);

    function retrieveItemsFromCart() {
        fetch("http://localhost:3001/retrieve-items-from-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: _id }),
        })
            .then((response) => response.json())
            .then((body) => {
                setCart(body);
            });
    }

    useEffect(() => {}, [cart]);

    function addToCart(productID) {
        fetch("http://localhost:3001/add-to-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: _id, productID: productID }),
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.success) {
                    retrieveItemsFromCart();
                    alert("Successfully added to cart!");
                } else {
                    alert("Add to cart failed");
                }
            });
    }

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
            <Container>
                <Row>
                    {products.map((product, index) => (
                        <Card key={index} style={{ width: "18rem" }}>
                            <Card.Img variant="top" src="https://picsum.photos/100" />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>{product.name}</Card.Text>
                                <Card.Text>{product.price}</Card.Text>
                                <Card.Text>{product.quantity}</Card.Text>
                                <Button variant="primary" onClick={() => addToCart(product._id)}>
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
            <br />
            <br />
            <br />
            CART ITEM <br />
            <Container>
                <Row>
                    {cart.map((item, index) => (
                        <Card key={index} style={{ width: "18rem" }}>
                            <Card.Img variant="top" src="https://picsum.photos/30" />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        </>
    ) : (
        // admin
        <>
            Welcome to the dashboard, {username} !<br />
            <button onClick={logout}>Log Out</button>
        </>
    );
}
