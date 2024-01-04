import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Cookies from "universal-cookie";

import "../dashboard.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

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
        fetch(`http://localhost:3001/get-items-from-cart/${_id}`)
            .then((response) => response.json())
            .then((body) => {
                setCart(body.cart);
            });
        fetch(`http://localhost:3001/get-cart-total-price/${_id}`)
            .then((response) => response.json())
            .then((body) => {
                setTotal(body.total);
            });
    }, [_id]);

    useEffect(() => {}, [products, cart]);

    function updateProducts() {
        fetch("http://localhost:3001/get-products")
            .then((response) => response.json())
            .then((body) => {
                setProducts(body);
            });
    }

    function updateCart() {
        fetch(`http://localhost:3001/get-items-from-cart/${_id}`)
            .then((response) => response.json())
            .then((body) => {
                setCart(body.cart);
            });
    }

    function updateTotal() {
        fetch(`http://localhost:3001/get-cart-total-price/${_id}`)
            .then((response) => response.json())
            .then((body) => {
                setTotal(body.total);
            });
    }

    function addToCart(productID) {
        fetch(`http://localhost:3001/get-quantity/${productID}`)
            .then((response) => response.json())
            .then((body) => {
                let productQuantityFromCart = 0;
                cart.forEach((item) => {
                    if (item._id === productID) {
                        productQuantityFromCart++;
                    }
                });

                if (body.quantity >= productQuantityFromCart + 1) {
                    fetch(`http://localhost:3001/add-to-cart/${_id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ productID: productID }),
                    })
                        .then((response) => response.json())
                        .then((body) => {
                            if (body.success) {
                                updateCart();
                                updateTotal();
                                console.log("Successfully added to cart!");
                            } else {
                                console.log("Add to cart failed");
                            }
                        });
                } else {
                    console.log("FULL");
                }
            });
    }

    function removeFromCart(productID) {
        fetch(`http://localhost:3001/remove-from-cart/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productID: productID }),
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.success) {
                    updateCart();
                    updateTotal();
                    console.log("Successfully remove from cart!");
                } else {
                    console.log("Remove from cart failed");
                }
            });
    }

    function changeQuantity(productID, quantity) {
        fetch(`http://localhost:3001/change-quantity/${productID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: quantity }),
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

    function removeAllFromCart() {
        fetch(`http://localhost:3001/remove-all-from-cart/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.success) {
                    updateCart();
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
                            changeQuantity(product._id, quantity);
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
            <Container className="welcome-container">
                <div>
                    Welcome to the dashboard, <strong>{username}</strong>!
                </div>
                <Button className="logout-button" onClick={logout}>
                    Log Out
                </Button>
            </Container>
            <Container>
                <Row>
                    {products.map((product, index) => (
                        <Card key={index} style={{ width: "18rem", display: "flex", flexDirection: "column" }}>
                            <Card.Img className="card-img" variant="top" src="https://picsum.photos/100" />
                            <Card.Body className="card-body">
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>Description: {product.name}</Card.Text>
                                <Card.Text>Price: {product.price}</Card.Text>
                                <Card.Text>Quantity: {product.quantity}</Card.Text>
                                <Button variant="primary" className="add-button" onClick={() => addToCart(product._id)}>
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
            <Container className="checkout-container">
                <div>
                    Cart Item: <strong>{total.toFixed(2)}</strong>
                </div>
                <Button variant="primary" className="checkout-button" onClick={() => checkoutAll()}>
                    Checkout All
                </Button>
            </Container>
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
                                <Card.Img className="card-img" variant="top" src="https://picsum.photos/30" />
                                <Card.Body className="card-body">
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>Price: {price.toFixed(2)}</Card.Text>
                                    <Card.Text>Quantity: {quantity}</Card.Text>
                                    <Button
                                        variant="primary"
                                        className="remove-button"
                                        onClick={() => removeFromCart(product._id)}
                                    >
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
            <Container className="welcome-container">
                <div>
                    Welcome to the dashboard, <strong>{username}</strong>!
                </div>
                <Button className="logout-button" onClick={logout}>
                    Log Out
                </Button>
            </Container>
        </>
    );
}
