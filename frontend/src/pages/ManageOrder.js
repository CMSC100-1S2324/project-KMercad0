import { useState, useEffect } from "react";
import { Card, Button, Container, Row } from "react-bootstrap";

export default function ManageOrder() {
    const _id = localStorage.getItem("_id");
    const type = localStorage.getItem("type");
    const orderStatus = ["Pending", "Completed", "Cancelled"];

    const [orders, setOrders] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const [userNames, setUserNames] = useState([]);

    useEffect(() => {
        type !== "admin"
            ? fetch(`http://localhost:3001/get-user-orders/${_id}`)
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body.orders);
                  })
            : fetch("http://localhost:3001/get-orders")
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body.orders);
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
                    console.log(body.user.fname);
                    setUserNames((prevUserNames) => [...prevUserNames, `${body.user.fname} ${body.user.lname}`]);
                });
        });
    }, [orders]);

    useEffect(() => {}, [orders]);

    function updateOrders() {
        type !== "admin"
            ? fetch(`http://localhost:3001/get-user-orders/${_id}`)
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body.orders);
                  })
            : fetch("http://localhost:3001/get-orders")
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body.orders);
                  });
    }

    function changeStatus(orderID, status) {
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
                    updateOrders();
                    console.log("Successfully changed status!");
                } else {
                    console.log("Change status failed");
                }
            });
    }

    const productCardStyle = {
        width: "15rem",
        height: "auto",
        flexDirection: "column",
        lineHeight: "1.2",
        padding: "20px",
        margin: "10px",
        border: "0",
        borderRadius: "10px",
        backgroundColor: "#d9d9d9",
    };

    return type === "user" ? (
        <Container fluid>
            <Row>
                {orders.map((order, index) => (
                    <Card key={index} className="d-flex" style={productCardStyle}>
                        <Card.Img style={{ borderRadius: "10px" }} variant="top" src="https://picsum.photos/20" />
                        <Card.Body className="d-flex flex-column" style={{ flex: 1 }}>
                            <Card.Title>{productNames[index]}</Card.Title>
                            <Card.Text>Price: {order.price}</Card.Text>
                            <Card.Text>Quantity: {order.quantity}</Card.Text>
                            <Card.Text>Status: {orderStatus[order.status]}</Card.Text>
                            <Card.Text>Date: {order.dateOrdered}</Card.Text>
                            <Button
                                variant="primary"
                                className="cancel-button"
                                disabled={order.status !== 0}
                                onClick={() => changeStatus(order._id, 2)}
                            >
                                Cancel Order
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </Container>
    ) : (
        <Container>
            <Row>
                {orders.map((order, index) => {
                    return (
                        <Card key={index} className="d-flex" style={productCardStyle}>
                            <Card.Img style={{ borderRadius: "10px" }} variant="top" src="https://picsum.photos/20" />
                            <Card.Body className="d-flex flex-column" style={{ flex: 1 }}>
                                <Card.Title>{productNames[index]}</Card.Title>
                                <Card.Text>Price: {order.price}</Card.Text>
                                <Card.Text>Quantity: {order.quantity}</Card.Text>
                                <Card.Text>Status: {orderStatus[order.status]}</Card.Text>
                                <Card.Text>Order by: {userNames[index]}</Card.Text>
                                <Card.Text>Date: {order.dateOrdered}</Card.Text>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button
                                        variant="primary"
                                        className="approve-button"
                                        disabled={order.status !== 0}
                                        onClick={() => changeStatus(order._id, 1)}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="disapprove-button"
                                        disabled={order.status !== 0}
                                        onClick={() => changeStatus(order._id, 2)}
                                    >
                                        Disapprove
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Row>
        </Container>
    );
}
