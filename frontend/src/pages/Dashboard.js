import { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";

export default function Dashboard() {
    const _id = localStorage.getItem("_id");
    const username = localStorage.getItem("username");
    const type = localStorage.getItem("type");

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [direction, setDirection] = useState(1);
    const [sorterName, setSorterName] = useState("");
    const [productsCopy, setProductsCopy] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/get-products")
            .then((response) => response.json())
            .then((body) => {
                setProducts(body.products);
                setProductsCopy(body.products);
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
                setProducts(body.products);
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

    function checkoutAllFromCart() {
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

    function sortProducts(sorterName, direction) {
        const unsortedProducts = [...productsCopy];

        if (sorterName !== null) {
            let sortedProducts = unsortedProducts.sort((a, b) => {
                const aValue = a[sorterName].toString().trim();
                const bValue = b[sorterName].toString().trim();

                if (sorterName === "title" || sorterName === "name") {
                    return direction * aValue.localeCompare(bValue);
                } else {
                    const numericA = parseFloat(aValue);
                    const numericB = parseFloat(bValue);
                    return direction * (numericA - numericB);
                }
            });

            setSorterName(sorterName);
            setProducts(sortedProducts);
            return;
        }
        setSorterName(sorterName);
        setProducts(unsortedProducts);
    }

    function changeDirection() {
        if (sorterName) {
            setDirection((prevDirection) => {
                const newDirection = prevDirection * -1;
                sortProducts(sorterName, newDirection);
                return newDirection;
            });
        }
    }

    const containerStyle = { fontSize: "24px", paddingTop: "40px", paddingBottom: "40px" };
    const productCardStyle = {
        width: "15rem",
        height: "auto",
        flexDirection: "column",
        lineHeight: "1.2",
        padding: "15px",
        margin: "10px",
        border: "0",
        borderRadius: "10px",
        backgroundColor: "#d9d9d9",
    };

    return type === "user" ? (
        // user
        <Container fluid>
            <Container fluid className="d-flex align-items-center" style={containerStyle}>
                <div>
                    Welcome to the dashboard, <strong>{username}</strong>!
                </div>
            </Container>
            <Container fluid>
                <Row>
                    <Col md="auto">
                        <h1>
                            <b>Products</b>
                        </h1>
                    </Col>
                    <Col md="auto">
                        <DropdownButton variant="primary" title="Sort By" size="lg">
                            <Dropdown.Item onClick={() => sortProducts(null, direction)}>None</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortProducts("title", direction)}>Title</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortProducts("type", direction)}>Type</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortProducts("price", direction)}>Price</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortProducts("quantity", direction)}>Stock</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            onClick={() => changeDirection()}
                            dangerouslySetInnerHTML={{ __html: "&#8645" }}
                            size="lg"
                        ></Button>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    {products.map((product, index) => (
                        <Card key={index} className="d-flex" style={productCardStyle}>
                            <Card.Img style={{ borderRadius: "10px" }} variant="top" src="https://picsum.photos/50" />
                            <Card.Body className="d-flex flex-column" style={{ flex: 1 }}>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>Description: {product.name}</Card.Text>
                                <Card.Text>Type: {product.type === 1 ? "Crop" : "Poultry"}</Card.Text>
                                <Card.Text>Price: {product.price.toFixed(2)}</Card.Text>
                                <Card.Text>Stock: {product.quantity}</Card.Text>
                                <Button variant="primary" onClick={() => addToCart(product._id)}>
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
            <hr></hr>
            <Container fluid>
                <h1>
                    <b>Cart</b>
                </h1>
            </Container>
            <Container fluid className="d-flex align-items-center" style={containerStyle}>
                <Col md="auto">
                    <div>
                        Total Price: <strong>{total.toFixed(2)}</strong>
                    </div>
                    <div>
                        Total Quantity: <strong>{cart.length.toFixed(0)}</strong>
                    </div>
                </Col>
                <Col md="auto">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => checkoutAllFromCart()}
                        style={{ marginLeft: "2rem" }}
                    >
                        Checkout All
                    </Button>
                </Col>
                <Col>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => removeAllFromCart()}
                        style={{ marginLeft: "2rem" }}
                    >
                        Remove All
                    </Button>
                </Col>
            </Container>
            <Container fluid>
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
                            <Card key={index} className="d-flex" style={productCardStyle}>
                                <Card.Img
                                    style={{ borderRadius: "10px" }}
                                    variant="top"
                                    src="https://picsum.photos/30"
                                />
                                <Card.Body className="d-flex flex-column" style={{ flex: 1 }}>
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
        </Container>
    ) : (
        // admin
        <Container fluid>
            <Container fluid className="d-flex align-items-center" style={containerStyle}>
                <div>
                    Welcome to the dashboard, <strong>{username}</strong>!
                </div>
            </Container>
            <Container fluid>
                <Row>
                <Col md="auto">
                        <h1>
                            <b>Sales Report</b>
                        </h1>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <table>
                        <tbody>
                            <tr>
                                <th>Products Sold</th>
                                <th>Total Quantity of Sales</th>
                                <th>Total Sales Income</th>
                            </tr>
                        </tbody>
                    </table>
                </Row>
            </Container>
        </Container>
    );
}
