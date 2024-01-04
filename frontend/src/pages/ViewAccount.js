import { useState, useEffect } from "react";
import { Card, Container, Row } from "react-bootstrap";

export default function ViewAccount() {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3001/get-all-user-accounts")
            .then((response) => response.json())
            .then((body) => {
                setUsers(body.users);
            });
        fetch("http://localhost:3001/get-total-user-accounts")
            .then((response) => response.json())
            .then((body) => {
                setTotal(body.total);
            });
    });

    return (
        <>
            <Container>
                <div>
                    Total: <strong>{total.toFixed(0)}</strong>
                </div>
                <Row>
                    {users.map((user, index) => {
                        return (
                            <Card key={index} style={{ width: "18rem" }}>
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
        </>
    );
}
