import { useState, useEffect } from "react";
import { Card, Container, Row } from "react-bootstrap";

export default function ManageOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/get-orders")
            .then((response) => response.json())
            .then((body) => {
                setOrders(body);
            });
    }, []);

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
                                    {/* <Button variant="primary" onClick={() => addToCart(product._id, product.price)}>
                                    Add to Cart
                                </Button> */}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}
