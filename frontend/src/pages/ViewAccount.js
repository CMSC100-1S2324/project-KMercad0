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

    const userCardStyle = {
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

    return (
        <Container fluid style={{ paddingBottom: "2em" }}>
            <Container fluid style={{ paddingTop: "3em", paddingBottom: "0.5em" }}>
                <Row>
                    <Col md="auto" style={{ color: "lightgray" }}>
                        <h3>
                            <b>Registered Accounts</b>
                        </h3>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="d-flex align-items-center" style={{ fontSize: "24px", marginBottom: "15px" }}>
                <Col md="auto" style={{ color: "lightgray" }}>
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
                                    <Card.Title style={{ color: "#198754" }}>
                                        <strong>{user.fname} {user.mname} {user.lname}{" "}</strong>
                                    </Card.Title>
                                    <Card.Text style={{ color: "lightgray" }}>Email: {user.email}</Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
            </Container>
        </Container>
    );
}
