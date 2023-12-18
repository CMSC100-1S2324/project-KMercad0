import { Outlet, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function Root() {
    const type = localStorage.getItem("type");

    return type === "user" ? (
        // user
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/manage-order">
                            Manage Orders
                        </Nav.Link>
                        {/* <Nav.Link as={Link} to="">Edit Profile</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet />
        </>
    ) : (
        // admin
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/view-account">
                            View Accounts
                        </Nav.Link>
                        <Nav.Link as={Link} to="">
                            Manage Products
                        </Nav.Link>
                        <Nav.Link as={Link} to="">
                            Manage Orders
                        </Nav.Link>
                        {/* <Nav.Link as={Link} to="">Edit Profile</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet />
        </>
    );
}
