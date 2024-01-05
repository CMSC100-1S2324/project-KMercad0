import { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function ViewAccount() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/get-all-user-accounts")
            .then((response) => response.json())
            .then((body) => {
                setUsers(body.users);
            });
    });

    const containerStyle = { fontSize: "24px", paddingTop: "40px", paddingBottom: "40px" };
    const userCardStyle = {
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

    return (
        <Container fluid>
            <Container fluid style={containerStyle}>
                <Row>
                    <Col>
                        <h1>
                            <b>Users</b>
                        </h1>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="d-flex align-items-center" style={{ fontSize: "24px", marginBottom: "15px" }}>
                <Col md="auto">
                    <div>
                        Total: <strong>{users.length.toFixed(0)}</strong>
                    </div>
                </Col>
            </Container>
            <Container fluid>
                <Row>
                    {users.map((user, index) => {
                        return (
                            <Card key={index} style={userCardStyle}>
                                <Card.Body>
                                    <Card.Title>
                                        User: {user.fname} {user.mname} {user.lname}{" "}
                                    </Card.Title>
                                    <Card.Text>Email: {user.email}</Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
            </Container>
        </Container>
    );
}
