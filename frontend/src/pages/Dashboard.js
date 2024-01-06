import { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Dropdown, DropdownButton, Table } from "react-bootstrap";

export default function Dashboard() {
    const _id = localStorage.getItem("_id");
    const username = localStorage.getItem("username");
    const type = localStorage.getItem("type");

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [soldOrders, setSoldOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [direction, setDirection] = useState(1);
    const [sorterName, setSorterName] = useState(null);
    const [productNames, setProductNames] = useState([]);
    const [productsCopy, setProductsCopy] = useState([]);

    useEffect(() => {
        if (type !== "admin") {
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
        } else {
            fetch("http://localhost:3001/get-sold-orders")
                .then((response) => response.json())
                .then((body) => {
                    setSoldOrders(body.orders);
                });
            fetch("http://localhost:3001/get-orders")
                .then((response) => response.json())
                .then((body) => {
                    setOrders(body.orders);
                });
        }
    }, [_id, type]);

    useEffect(() => {
        soldOrders.forEach((order) => {
            fetch(`http://localhost:3001/get-product-of-order/${order._id}`)
                .then((response) => response.json())
                .then((body) => {
                    setProductNames((prevProductNames) => [...prevProductNames, body.product.title]);
                });
        });
    }, [soldOrders]);

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

                if (sorterName === "title" || sorterName === "type") {
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

    const productCardStyle = {
        width: "15rem",
        height: "auto",
        flexDirection: "column",
        lineHeight: "1.2",
        padding: "15px",
        margin: "10px",
        border: "0",
        borderRadius: "10px",
        backgroundColor: "#181a1b",
    };

    const cartCardStyle = {
        width: "25.6rem",
        height: "auto",
        flexDirection: "row",
        backgroundColor: "#181a1b",
        padding: "10px",
        margin: "0 0 20px 0",
    };

    return type === "user" ? (
        // user
        <Container fluid style={{ paddingBottom: "2em" }}>
            <Row>
                <Col md={8}>
                    <Container
                        fluid
                        className="d-flex align-items-center"
                        style={{
                            fontSize: "24px",
                            color: "lightgray",
                            paddingTop: "2em",
                            paddingBottom: "2em",
                        }}
                    >
                        <div>
                            Welcome to the dashboard, <strong>{username}</strong>!
                        </div>
                    </Container>
                    <Container fluid style={{ paddingBottom: "1em" }}>
                        <Row>
                            <Col md="auto" style={{ color: "lightgray" }}>
                                <h3>
                                    <b>Product Listings</b>
                                </h3>
                            </Col>
                            <Col md="auto">
                                <DropdownButton variant="primary" title="Sort By" size="24px">
                                    <Dropdown.Item onClick={() => sortProducts(null, direction)}>None</Dropdown.Item>
                                    <Dropdown.Item onClick={() => sortProducts("title", direction)}>
                                        Title
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => sortProducts("type", direction)}>Type</Dropdown.Item>
                                    <Dropdown.Item onClick={() => sortProducts("price", direction)}>
                                        Price
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => sortProducts("quantity", direction)}>
                                        Stock
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Col>
                            <Col md="auto">
                                <Button
                                    variant="primary"
                                    disabled={sorterName === null}
                                    onClick={() => changeDirection()}
                                    dangerouslySetInnerHTML={{ __html: "&#8645" }}
                                    size="24px"
                                ></Button>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid style={{ paddingBottom: "1em" }}>
                        <Row>
                            {products.map((product, index) => (
                                <Card key={index} className="d-flex" style={productCardStyle}>
                                    <Card.Img
                                        style={{
                                            width: "100%",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "10px",
                                            marginLeft: "0"
                                        }}
                                        variant="top"
                                        src={product.imageurl}
                                    />
                                    <Card.Body className="d-flex flex-column" style={{ flex: 1, color: "lightgray" }}>
                                        <Card.Title style={{ color: "#198754" }}>
                                            <strong>{product.title}</strong>
                                        </Card.Title>
                                        <Card.Text>Description: {product.name}</Card.Text>
                                        <Card.Text>Type: {product.type}</Card.Text>
                                        <Card.Text>Price: {product.price.toFixed(2)}</Card.Text>
                                        <Card.Text>Stock: {product.quantity}</Card.Text>
                                        <Button
                                            variant="outline-success"
                                            onClick={() => addToCart(product._id)}
                                            style={{ width: "auto" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Row>
                    </Container>
                </Col>
                <Col md={1}>
                    <hr></hr>
                    <hr></hr>
                    <Container fluid style={{ paddingTop: "1em", color: "lightgray" }}>
                        <h3>
                            <b>Cart</b>
                        </h3>
                    </Container>
                    <Container
                        fluid
                        className="d-flex align-items-center"
                        style={{ fontSize: "24px", paddingBottom: "1em" }}
                    >
                        <Col md="auto" style={{ color: "lightgray" }}>
                            <div>
                                Total Price: <strong>{total.toFixed(2)}</strong>
                            </div>
                            <div>
                                Total Quantity: <strong>{cart.length.toFixed(0)}</strong>
                            </div>
                        </Col>
                        <Col md="auto">
                            <Row md="auto">
                                <Button
                                    variant="success"
                                    size="24px"
                                    onClick={() => checkoutAllFromCart()}
                                    style={{ marginLeft: "6em", marginBottom: "10px", width: "7.2em" }}
                                >
                                    Checkout All
                                </Button>
                            </Row>
                            <Row md="auto">
                                <Button
                                    variant="danger"
                                    size="24px"
                                    onClick={() => removeAllFromCart()}
                                    style={{ marginLeft: "6em", width: "7.2em" }}
                                >
                                    Remove All
                                </Button>
                            </Row>
                        </Col>
                    </Container>
                    <Container fluid>
                        <Col md="auto">
                            {productsCopy.map((product, index) => {
                                let quantity = 0;
                                let price = 0;
                                cart.forEach((item) => {
                                    if (item.name === product.name) {
                                        quantity++;
                                        price += product.price;
                                    }
                                });
                                return quantity !== 0 ? (
                                    <Card key={index} style={cartCardStyle}>
                                        <Row md="auto">
                                            <Col md={3}>
                                                <Card.Img
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        objectFit: "cover",
                                                        borderRadius: "10px",
                                                    }}
                                                    variant="left"
                                                    src={product.imageurl}
                                                />
                                            </Col>
                                            <Col md={9}>
                                                <Card.Body
                                                    className="d-flex flex-row justify-content-start align-items-start"
                                                    style={{
                                                        flex: 1,
                                                        color: "lightgray",
                                                        paddingBottom: "0"
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            marginRight: "30px",
                                                            marginLeft: "-20px",
                                                            marginTop: "-20px",
                                                        }}
                                                    >
                                                        <Card.Title className="mt-0" style={{ color: "#198754" }}>
                                                            <strong>{product.title}</strong>
                                                        </Card.Title>
                                                        <Card.Text className="mb-1">
                                                            Price: {price.toFixed(2)}
                                                        </Card.Text>
                                                        <Card.Text className="mb-0">Quantity: {quantity}</Card.Text>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <Button
                                                            variant="outline-danger"
                                                            onClick={() => removeFromCart(product._id)}
                                                            style={{ width: "auto", marginLeft: "4.4em" }}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                ) : null;
                            })}
                        </Col>
                    </Container>
                </Col>
            </Row>
        </Container>
    ) : (
        // admin
        <Container fluid style={{ paddingBottom: "2em" }}>
            <Container
                fluid
                className="d-flex align-items-center"
                style={{ fontSize: "24px", color: "lightgray", paddingTop: "2em", paddingBottom: "2em" }}
            >
                <div>
                    Welcome to the dashboard, <strong>{username}</strong>!
                </div>
            </Container>
            <Container fluid style={{ paddingBottom: "1em" }}>
                <Row>
                    <Col md="auto" style={{ color: "lightgrey" }}>
                        <h3>
                            <b>Sales Report</b>
                        </h3>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Table bordered hover variant="dark">
                        <thead>
                            <tr style={{ fontWeight: "bold", fontSize: "20px" }}>
                                <th>Products Sold</th>
                                <th>Total Quantity of Sales</th>
                                <th>Total Sales Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {soldOrders.map((order, index) => (
                                <tr key={index}>
                                    <th>{productNames[index]}</th>
                                    <th>{order.quantity}</th>
                                    <th>{order.price}</th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            <hr></hr>
            <Container fluid style={{ paddingBottom: "1em" }}>
                <Row>
                    <Col md="auto" style={{ color: "lightgrey" }}>
                        <h3>
                            <b>Transaction Summary</b>
                        </h3>
                    </Col>
                    <Col>
                        <DropdownButton variant="primary" title="Group By" size="24px">
                            {/* <Dropdown.Item onClick={() => filterSummary(null)}>None</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterSummary("annual")}>Annual</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterSummary("month")}>Month</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterSummary("week")}>Week</Dropdown.Item> */}
                        </DropdownButton>
                    </Col>
                </Row>
                <Row>
                    <Table bordered hover variant="dark">
                        <thead>
                            <tr style={{ fontWeight: "bold", fontSize: "20px" }}>
                                <th>Transaction ID</th>
                                <th>Product Name</th>
                                <th>Order Quantity</th>
                                <th>Order Status</th>
                                <th>Order By</th>
                                <th>Date Ordered</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {soldOrders.map((order, index) => (
                                <tr key={index}>
                                    <th>{productNames[index]}</th>
                                    <th>{order.quantity}</th>
                                    <th>{order.price}</th>
                                </tr>
                            ))}
                        </tbody> */}
                    </Table>
                </Row>
            </Container>
        </Container>
    );
}
