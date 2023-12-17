import { useState, useEffect } from "react";
import { Card, Button, Container, Row } from "react-bootstrap";

export default function ManageOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/get-orders")
            .then((response) => response.json())
            .then((body) => {
                setOrders(body);
            });
    }, []);

    function updateOrders() {
        fetch("http://localhost:3001/get-orders")
            .then((response) => response.json())
            .then((body) => {
                setOrders(body);
            });
    }

    useEffect(() => {}, [orders]);

    const [productNames, setProductNames] = useState([]);

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
        });
    }, [orders]);

    function changeStatus(orderID, status) {
        fetch("http://localhost:3001/change-status", {
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

    return (
        <>
            <Container>
                <Row>
                    {orders.map((order, index) => {
                        return (
                            <Card key={index} style={{ width: "18rem" }}>
                                <Card.Img variant="top" src="https://picsum.photos/20" />
                                <Card.Body>
                                    <Card.Title>{productNames[index]}</Card.Title>
                                    <Card.Text>Price: {order.price}</Card.Text>
                                    <Card.Text>Quantity: {order.quantity}</Card.Text>
                                    <Card.Text>Status: {order.status}</Card.Text>
                                    <Card.Text>Date: {order.dateOrdered}</Card.Text>
                                    <Button variant="primary" onClick={() => changeStatus(order._id, 2)}>
                                        Cancel Order
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
