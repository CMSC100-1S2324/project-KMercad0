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
    const [total, setTotal] = useState(0);

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
        fetch("http://localhost:3001/get-cart-total-price", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: _id }),
        })
            .then((response) => response.json())
            .then((body) => {
                setTotal(body.total);
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

    function updateProducts() {
        fetch("http://localhost:3001/get-products")
            .then((response) => response.json())
            .then((body) => {
                setProducts(body);
            });
    }

    useEffect(() => {}, [products, cart]);

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
                    updateTotal();
                    updateQuantity(productID, -1);
                    console.log("Successfully added to cart!");
                } else {
                    console.log("Add to cart failed");
                }
            });
    }

    function removeFromCart(productID) {
        fetch("http://localhost:3001/remove-from-cart", {
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
                    updateTotal();
                    updateQuantity(productID, +1);
                    console.log("Successfully remove from cart!");
                } else {
                    console.log("Remove from cart failed");
                }
            });
    }

    function updateQuantity(productID, update) {
        fetch("http://localhost:3001/update-quantity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: productID, number: update }),
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.success) {
                    updateProducts();
                    console.log("Successfully updated quantity!");
                } else {
                    console.log("Update quantity failed");
                }
            });
    }

    function updateTotal() {
        fetch("http://localhost:3001/get-cart-total-price", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: _id }),
        })
            .then((response) => response.json())
            .then((body) => {
                setTotal(body.total);
            });
    }

    function removeAllFromCart() {
        fetch("http://localhost:3001/remove-all-from-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: _id }),
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.success) {
                    retrieveItemsFromCart();
                    updateTotal();
                    console.log("Successfully updated quantity!");
                } else {
                    console.log("Update quantity failed");
                }
            });
    }

    function checkoutAll() {
        products.forEach((product) => {
            let quantity = 0;
            let price = 0;
            const status = 0;
            cart.forEach((item) => {
                if (item.name === product.name) {
                    quantity++;
                    price += product.price;
                }
            });

            if (quantity !== 0) {
                fetch("http://localhost:3001/add-order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        productID: product._id,
                        quantity: quantity,
                        price: price,
                        status: status,
                        userID: _id,
                    }),
                })
                    .then((response) => response.json())
                    .then((body) => {
                        if (body.success) {
                            removeAllFromCart();
                            console.log("Successfully added order!");
                        } else {
                            console.log("Checkout failed");
                        }
                    });
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
            <Container>
                Welcome to the dashboard, {username} !<br />
                <button onClick={logout}>Log Out</button>
            </Container>
            <Container>
                <Row>
                    {products.map((product, index) => (
                        <Card key={index} style={{ width: "18rem" }}>
                            <Card.Img variant="top" src="https://picsum.photos/100" />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>Description: {product.name}</Card.Text>
                                <Card.Text>Price: {product.price}</Card.Text>
                                <Card.Text>Quantity: {product.quantity}</Card.Text>
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
            <Container>
                <Row>
                    CART ITEM {total.toFixed(2)}
                    <Button variant="primary" onClick={() => checkoutAll()}>
                        Checkout all
                    </Button>
                </Row>
            </Container>
            <br />
            <Container>
                <Row>
                    {products.map((product, index) => {
                        let quantity = 0;
                        let price = 0;
                        cart.forEach((item) => {
                            if (item.name === product.name) {
                                quantity++;
                                price += product.price;
                            }
                        });

                        return quantity !== 0 ? (
                            <Card key={index} style={{ width: "18rem" }}>
                                <Card.Img variant="top" src="https://picsum.photos/30" />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>Price: {price.toFixed(2)}</Card.Text>
                                    <Card.Text>Quantity: {quantity}</Card.Text>
                                    <Button variant="primary" onClick={() => removeFromCart(product._id)}>
                                        Remove from Cart
                                    </Button>
                                </Card.Body>
                            </Card>
                        ) : null;
                    })}
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
