import { useState, useEffect } from "react";
import { useNavigate, useLoaderData, Outlet, Link } from "react-router-dom";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import Cookies from "universal-cookie";

export default function Root() {
    const type = localStorage.getItem("type");
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    function logout() {
        const cookies = new Cookies();
        cookies.remove("authToken");

        localStorage.removeItem("_id");
        localStorage.removeItem("username");
        localStorage.removeItem("type");

        setIsLoggedIn(false);
    }

    return type === "user" ? (
        // user
        <Container fluid>
            <Navbar bg="light" expand="lg" style={{ fontSize: "18px" }}>
                <Navbar.Brand style={{ marginLeft: "2em" }}>
                    <img
                        src="/bukidmart-logo.png"
                        alt="logo"
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Text style={{ fontWeight: "bold", fontSize: "20px" }}>BUKID MART</Navbar.Text>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{ marginLeft: "3em" }}>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/manage-order">
                            Manage Orders
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Button onClick={logout} size="24px" style={{ marginLeft: "auto", marginRight: "2rem" }}>
                    Log Out
                </Button>
            </Navbar>
            <Outlet />
        </Container>
    ) : (
        // admin
        <Container fluid>
            <Navbar bg="light" expand="lg" style={{ fontSize: "17px", marginLeft: "1em" }}>
                <Navbar.Brand style={{ marginLeft: "2em" }}>
                    <img
                        src="/bukidmart-logo.png"
                        alt="logo"
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Text style={{ fontWeight: "bold", fontSize: "20px" }}>BUKID MART</Navbar.Text>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{ marginLeft: "3em" }}>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/view-account">
                            View Accounts
                        </Nav.Link>
                        <Nav.Link as={Link} to="/manage-order">
                            Manage Orders
                        </Nav.Link>
                        <Nav.Link as={Link} to="/manage-product">
                            Manage Products
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Button onClick={logout} size="24px" style={{ marginRight: "2rem" }}>
                    Log Out
                </Button>
            </Navbar>
            <Outlet />
        </Container>
    );
}
