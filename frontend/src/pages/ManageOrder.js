import { useState, useEffect } from "react";
import { Card, Button, Container, Row } from "react-bootstrap";
import "../manage-order.css";

export default function ManageOrder() {
    const _id = localStorage.getItem("_id");
    const type = localStorage.getItem("type");
    const orderStatus = ["Pending", "Completed", "Cancelled"];
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        type !== "admin"
            ? fetch("http://localhost:3001/get-orders", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ _id: _id }),
              })
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body);
                  })
            : fetch("http://localhost:3001/get-all-orders")
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body);
                  });
    }, [_id, type]);

    function updateOrders() {
        type !== "admin"
            ? fetch("http://localhost:3001/get-orders", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ _id: _id }),
              })
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body);
                  })
            : fetch("http://localhost:3001/get-all-orders")
                  .then((response) => response.json())
                  .then((body) => {
                      setOrders(body);
                  });
    }

    useEffect(() => {}, [orders]);

    const [productNames, setProductNames] = useState([]);
    const [userNames, setUserNames] = useState([]);

    useEffect(() => {
        orders.forEach((order) => {
            fetch("http://localhost:3001/get-order-product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: order._id }),
            })
                .then((response) => response.json())
                .then((body) => {
                    setProductNames((prevProductNames) => [...prevProductNames, body.title]);
                });

            fetch("http://localhost:3001/get-order-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: order._id }),
            })
                .then((response) => response.json())
                .then((body) => {
                    setUserNames((prevUserNames) => [...prevUserNames, `${body.fname} ${body.lname}`]);
                });
        });
    }, [orders]);

    function changeStatus(orderID, status) {
        fetch("http://localhost:3001/change-order-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: orderID, status: status }),
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

    return type === "user" ? (
        <>
            <Container>
                <Row>
                    {orders.map((order, index) => {
                        return (
                            <Card key={index} style={{ width: "18rem" }}>
                                <Card.Img className="card-img" variant="top" src="https://picsum.photos/20" />
                                <Card.Body className="card-body">
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
                        );
                    })}
                </Row>
            </Container>
        </>
    ) : (
        <>
            <Container>
                <Row>
                    {orders.map((order, index) => {
                        return (
                            <Card key={index} style={{ width: "18rem" }}>
                                <Card.Img className="card-img" variant="top" src="https://picsum.photos/20" />
                                <Card.Body className="card-body">
                                    <Card.Title>{productNames[index]}</Card.Title>
                                    <Card.Text>Price: {order.price}</Card.Text>
                                    <Card.Text>Quantity: {order.quantity}</Card.Text>
                                    <Card.Text>Status: {orderStatus[order.status]}</Card.Text>
                                    <Card.Text>Order by: {userNames[index]}</Card.Text>
                                    <Card.Text>Date: {order.dateOrdered}</Card.Text>
                                    <Button
                                        variant="primary"
                                        className="approve-button"
                                        disabled={order.status !== 0}
                                        onClick={() => changeStatus(order._id, 1)}
                                    >
                                        Approve Order
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="disapprove-button"
                                        disabled={order.status !== 0}
                                        onClick={() => changeStatus(order._id, 2)}
                                    >
                                        Disapprove Order
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}
