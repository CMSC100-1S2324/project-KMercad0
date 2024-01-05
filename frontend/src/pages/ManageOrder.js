import { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";

export default function ManageOrder() {
    const _id = localStorage.getItem("_id");
    const type = localStorage.getItem("type");
    const orderStatus = ["Pending", "Completed", "Cancelled"];

    const [orders, setOrders] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const [userNames, setUserNames] = useState([]);
    const [ordersCopy, setOrdersCopy] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    console.log(productDetails)
    const imageUrls = productDetails.map(product => product.imageurl);
    
    useEffect(() => {
        type !== "admin"
            ? fetch(`http://localhost:3001/get-user-orders/${_id}`)
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body.orders);
                      setOrdersCopy(body.orders);
                  })
            : fetch("http://localhost:3001/get-orders")
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body.orders);
                      setOrdersCopy(body.orders);
                  });
    }, [_id, type]);

    useEffect(() => {
        orders.forEach((order) => {
            fetch(`http://localhost:3001/get-product-of-order/${order._id}`)
                .then((response) => response.json())
                .then((body) => {
                    setProductNames((prevProductNames) => [...prevProductNames, body.product.title]);
                });

            fetch(`http://localhost:3001/get-user-of-order/${order._id}`)
                .then((response) => response.json())
                .then((body) => {
                    setUserNames((prevUserNames) => [...prevUserNames, `${body.user.fname} ${body.user.lname}`]);
                });
        });
    }, [orders]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productDetailsArray = [];
    
            for (const order of orders) {
                const productResponse = await fetch(`http://localhost:3001/get-product-of-order/${order._id}`);
                const productBody = await productResponse.json();
                productDetailsArray.push(productBody.product);
            }
    
            setProductDetails(productDetailsArray);
        };
    
        fetchProductDetails();
    }, [orders]);
    
    useEffect(() => {}, [orders]);

    function updateOrders() {
        type !== "admin"
            ? fetch(`http://localhost:3001/get-user-orders/${_id}`)
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body.orders);
                      setOrdersCopy(body.orders);
                  })
            : fetch("http://localhost:3001/get-orders")
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body.orders);
                      setOrdersCopy(body.orders);
                  });
    }

    function changeStatus(orderID, productID, quantity, status) {
        fetch(`http://localhost:3001/change-order-status/${orderID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: status }),
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.success) {
                    if (status === 2) {
                        restockQuantity(productID, quantity);
                    }
                    updateOrders();
                    console.log("Successfully changed status!");
                } else {
                    console.log("Change status failed");
                }
            });
    }

    function restockQuantity(productID, quantity) {
        fetch(`http://localhost:3001/restock-quantity/${productID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: quantity }),
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.success) {
                    console.log("Successfully restock quantity!");
                } else {
                    console.log("Restock failed");
                }
            });
    }

    function deleteOrder(orderID) {
        fetch(`http://localhost:3001/delete-order/${orderID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((body) => {
                updateOrders();
            });
    }

    function filterOrders(filterName) {
        const unfilteredOrders = [...ordersCopy];

        if (filterName !== null) {
            let filteredOrders = unfilteredOrders.filter((item) => item.status === filterName);
            setOrders(filteredOrders);
            return;
        }
        setOrders(unfilteredOrders);
    }

    function getDateTime(dateTime) {
        const date = new Date(dateTime);
        //console.log(dateTime);

        const month = date.getMonth() + 1;
        const day = date.getDay();
        const year = date.getFullYear();
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        return `${month}/${day}/${year} ${time}`;
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
        backgroundColor: "#d9d9d9",
    };

    return type === "user" ? (
        <Container fluid style={{ paddingBottom: "2em" }}>
            <Container fluid style={{ paddingTop: "3em", paddingBottom: "1em" }}>
                <Row>
                    <Col md="auto">
                        <h3>
                            <b>Order Fulfillment</b>
                        </h3>
                    </Col>
                    <Col md="auto">
                        <DropdownButton variant="primary" title="Filter By" size="24px">
                            <Dropdown.Item onClick={() => filterOrders(null)}>All</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterOrders(0)}>Pending</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterOrders(1)}>Completed</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterOrders(2)}>Cancelled</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    {orders.map((order, index) => (
                        <Card key={index} className="d-flex" style={productCardStyle}>
                            <Card.Img style={{  
                                width: "100%",       
                                height: "150px",      
                                objectFit: "cover", 
                                borderRadius: "10px" }} variant="top" src={imageUrls[index]} />
                            <Card.Body className="d-flex flex-column" style={{ flex: 1 }}>
                                <Card.Title>{productNames[index]}</Card.Title>
                                <Card.Text>Price: {order.price.toFixed(2)}</Card.Text>
                                <Card.Text>Quantity: {order.quantity}</Card.Text>
                                <Card.Text>Status: {orderStatus[order.status]}</Card.Text>
                                <Card.Text>Date: {getDateTime(order.dateOrdered)}</Card.Text>
                                <Button
                                    variant="primary"
                                    className="cancel-button"
                                    disabled={order.status !== 0}
                                    style={{ marginBottom: "10px", width: "fit-content" }}
                                    onClick={() => changeStatus(order._id, order.productID, order.quantity, 2)}
                                >
                                    Cancel Order
                                </Button>
                                <Button
                                    variant="danger"
                                    className="delete-button"
                                    disabled={order.status === 0}
                                    style={{ marginTop: "10px", width: "fit-content" }}
                                    onClick={() => deleteOrder(order._id)}
                                >
                                    Delete Order
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        </Container>
    ) : (
        <Container fluid>
            <Container fluid style={{ fontSize: "24px", paddingTop: "2em", paddingBottom: "2em" }}>
                <Row>
                    <Col md="auto">
                        <h1>
                            <b>Order Fulfillment</b>
                        </h1>
                    </Col>
                    <Col md="auto">
                        <DropdownButton variant="primary" title="Filter By" size="lg">
                            <Dropdown.Item onClick={() => filterOrders(null)}>All</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterOrders(0)}>Pending</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterOrders(1)}>Completed</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterOrders(2)}>Cancelled</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    {orders.map((order, index) => (
                        <Card key={index} className="d-flex" style={productCardStyle}>
                            <Card.Img style={{  
                                width: "100%",       
                                height: "150px",      
                                objectFit: "cover", 
                                borderRadius: "10px" }} variant="top" src={imageUrls[index]} />
                            <Card.Body className="d-flex flex-column" style={{ flex: 1 }}>
                                <Card.Title>{productNames[index]}</Card.Title>
                                <Card.Text>Price: {order.price.toFixed(2)}</Card.Text>
                                <Card.Text>Quantity: {order.quantity}</Card.Text>
                                <Card.Text>Status: {orderStatus[order.status]}</Card.Text>
                                <Card.Text>Order by: {userNames[index]}</Card.Text>
                                <Card.Text>Date: {getDateTime(order.dateOrdered)}</Card.Text>
                                <Button
                                    variant="primary"
                                    className="approve-button"
                                    disabled={order.status !== 0}
                                    style={{ marginBottom: "10px" }}
                                    onClick={() => changeStatus(order._id, order.productID, order.quantity, 1)}
                                >
                                    Approve
                                </Button>
                                <Button
                                    variant="danger"
                                    className="disapprove-button"
                                    disabled={order.status !== 0}
                                    style={{ marginTop: "10px" }}
                                    onClick={() => changeStatus(order._id, order.productID, order.quantity, 2)}
                                >
                                    Disapprove
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        </Container>
    );
}
