import { useState, useEffect } from "react";
import { useNavigate, useLoaderData, Outlet, Link } from "react-router-dom";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { House, Person, Receipt, Bag } from 'react-bootstrap-icons';
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
        <Container fluid style={{ backgroundColor: "#2d3133", minHeight: "100vh"}}>
            <Navbar expand="lg" style={{ backgroundColor: "#1b1e1f", fontSize: "18px" }}>
                <Navbar.Brand style={{ marginLeft: "2em" }}>
                    <img
                        src="/bukidmart-logo.png"
                        alt="logo"
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Text style={{ fontWeight: "bold", color: "white", fontSize: "20px" }}>BUKID MART</Navbar.Text>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{ marginLeft: "3em" }}>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/dashboard" style={{ color: "lightgray" }}>
                            <House size={18} style={{ marginBottom: "5px" }}/>
                            <strong> Dashboard</strong>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/manage-order" style={{ color: "lightgray" }}>
                            <Receipt size={18} style={{ marginBottom: "5px", marginLeft: "20px"  }}/>
                            <strong> Manage Orders</strong> 
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Button variant="primary" onClick={logout} size="24px" style={{ marginRight: "3rem" }}>
                    Log Out
                </Button>
            </Navbar>
            <Outlet />
        </Container>
    ) : (
        // admin
        <Container fluid style={{ backgroundColor: "#2d3133", minHeight: "100vh"}}>
            <Navbar expand="lg" style={{ backgroundColor: "#1b1e1f", fontSize: "18px" }}>
                <Navbar.Brand style={{ marginLeft: "2em" }}>
                    <img
                        src="/bukidmart-logo.png"
                        alt="logo"
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Text style={{ fontWeight: "bold", color: "white", fontSize: "20px" }}>BUKID MART</Navbar.Text>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{ marginLeft: "3em" }}>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/dashboard" style={{ color: "lightgray" }}>
                            <House size={18} style={{ marginBottom: "5px" }}/>
                            <strong> Dashboard</strong>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/view-account" style={{ color: "lightgray" }}>
                            <Person size={18} style={{ marginBottom: "5px", marginLeft: "20px" }}/>
                            <strong> View Accounts</strong>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/manage-order" style={{ color: "lightgray" }}>
                            <Receipt size={18} style={{ marginBottom: "5px", marginLeft: "20px" }}/>
                            <strong> Manage Orders</strong>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/manage-product" style={{ color: "lightgray" }}>
                            <Bag size={18} style={{ marginBottom: "5px", marginLeft: "20px" }}/>
                            <strong> Manage Products</strong>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Button variant="primary" onClick={logout} size="24px" style={{ marginRight: "3rem" }}>
                    Log Out
                </Button>
            </Navbar>
            <Outlet />
        </Container>
    );
}
