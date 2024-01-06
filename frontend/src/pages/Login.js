import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { Container, Button, Form, Row, Col } from "react-bootstrap";

export default function Login() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // redirect when login is successful
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        }
    }, [isLoggedIn, navigate]);

    function logIn(e) {
        e.preventDefault();

        // form validation goes here

        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: document.getElementById("l-email").value,
                password: document.getElementById("l-password").value,
            }),
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.success) {
                    setIsLoggedIn(true);
                    // successful log in. store the token as a cookie
                    const cookies = new Cookies();
                    cookies.set("authToken", body.token, {
                        path: "localhost:3001/",
                        age: 60 * 60,
                        sameSite: false,
                    });

                    localStorage.setItem("_id", body._id);
                    localStorage.setItem("username", body.username);
                    localStorage.setItem("type", body.type);
                } else {
                    alert("Log in failed");
                }
            });
    }

    const imageFolder = "../backgrounds/"; //folder where background images are stored
    const backgroundImages = ["bg1.png", "bg2.png", "bg3.png"]; //array of background images

    const [currentBackground, setCurrentBackground] = useState(0); //state variable to keep track of current background image

    useEffect(() => {
        //useEffect hook to change background image every 5 seconds
        const intervalId = setInterval(() => {
            //setInterval function to change background image every 5 seconds
            setCurrentBackground((prevBackground) => (prevBackground + 1) % backgroundImages.length); //change background image
        }, 5000);

        return () => clearInterval(intervalId); //clear interval when component unmounts
    }, []);

    const backgroundImageStyle = {
        //style for background image
        background: `url(${imageFolder}${backgroundImages[currentBackground]}) no-repeat center center fixed`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const outerContainerStyle = {
        //style for outer container
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        background: "rgba(255, 255, 255, 0.8)",
        padding: "20px",
        margin: "auto",
        width: "50%",
        height: "auto",
        color: "#198754",
        alignItems: "center",
    };

    const whiteBoxStyle = {
        //style for white box
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "80%",
        height: "35vh",
        margin: "auto",
    };

    const text = {
        //style for text
        color: "green",
        textAlign: "center",
        marginTop: "20px",
        // color: "085025",
    };

    const buttonStyle = {
        //style for button
        backgroundColor: "green",
        borderColor: "#198754",
        color: "white",
        position: "relative",
        marginTop: "3%",
        marginBottom: "3%",
        left: "50%",
        transform: "translateX(-50%)",
    };

    return (
        //return login page
        <div>
            <div style={backgroundImageStyle}>
                <Container style={outerContainerStyle}>
                    <Row>
                        <Col xs={12} className="mb-3" style={text}>
                            <h4>Login to your Account</h4>
                        </Col>
                    </Row>
                    <Row>
                        {/* This part holds the solid white part of the page */}
                        <Col xs={12} style={whiteBoxStyle}>
                            <Form>
                                <Form.Group controlId="l-email" style={{ paddingBottom: "10px" }}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your username" />
                                </Form.Group>

                                <Form.Group controlId="l-password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        style={{ paddingBottom: "10px" }}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" style={buttonStyle} onClick={logIn}>
                                    Sign In
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="mb-3" style={text}>
                            <h6>
                                Don't have an account?{" "}
                                <Link to={`/sign-up`} style={{ color: "green" }}>
                                    Sign up here!
                                </Link>
                            </h6>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
