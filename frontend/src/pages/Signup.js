import { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const [isValidPassword, setValidPassword] = useState(false);
    const [isValidEmail, setValidEmail] = useState(false);
    const [formValue, setFormValue] = useState({
        fname: "",
        mname: "",
        lname: "",
        type: "user",
        email: "",
        password: "",
    });

    function togglePassword() {
        setValidPassword(!isValidPassword);
    }
    function handlePassword() {
        togglePassword();
    }
    function validatePassword(value) {
        const validPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*(),.?:{}|<>]).{8,}$");
        if (!validPassword.test(value)) {
            togglePassword();
            return false;
        }
        return true;
    }

    function toggleEmail() {
        setValidEmail(!isValidEmail);
    }
    function handleEmail() {
        toggleEmail();
    }
    function validateEmail(value) {
        const validEmail = new RegExp("^\\w+(\\.\\w+)*@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$");
        if (!validEmail.test(value)) {
            toggleEmail();
            return false;
        }
        return true;
    }

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };
    const onBackClick = () => {
        navigate("/");
    };

    function signUp(e) {
        e.preventDefault();

        console.log(formValue);
        // form validation goes here
        if (formValue.fname !== "" && formValue.lname !== "" && formValue.email !== "" && formValue.password !== "") {
            console.log(formValue.password);
            if (validatePassword(formValue.password) === true) {
                if (validateEmail(formValue.email) === true) {
                    console.log("pasok");
                    fetch("http://localhost:3001/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            fname: formValue.fname,
                            mname: formValue.mname,
                            lname: formValue.lname,
                            type: "user",
                            email: formValue.email,
                            password: formValue.password,
                        }),
                    })
                        .then((response) => response.json())
                        .then((body) => {
                            if (body.success) {
                                alert("Successfully sign up!");
                                navigate("/");
                            } else {
                                alert("Sign up failed");
                            }
                        });
                }
            }
        }
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
    });

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
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        background: "rgba(255, 255, 255, 0.8)",
        padding: "20px 0 50px 0",
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
        height: "auto",
        margin: "auto",
        paddingBottom: "8px",
    };

    const text = {
        //style for text
        textAlign: "center",
        marginTop: "5px",
        color: "085025",
    };

    const buttonStyle = {
        //style for button
        backgroundColor: "#198754",
        borderColor: "#198754",
        color: "white",
        position: "relative",
        marginTop: "3%",
        marginBottom: "3%",
        left: "45%",
        transform: "translateX(-60%)",
    };

    return (
        //return signup page
        <div style={backgroundImageStyle}>
            {" "}
            {/* background image */}
            <Container style={outerContainerStyle}>
                <Row>
                    <Col xs={12}>
                        <h4 className="mt-3 mb-4" style={text}>
                            Create an Account
                        </h4>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} style={whiteBoxStyle}>
                        <Form>
                            <Form.Group controlId="firstName" style={{ paddingBottom: "10px" }}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your first name"
                                    value={formValue.fname}
                                    name="fname"
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="middleName" style={{ paddingBottom: "10px" }}>
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your middle name"
                                    value={formValue.mname}
                                    name="mname"
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="lastName" style={{ paddingBottom: "10px" }}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your last name"
                                    value={formValue.lname}
                                    name="lname"
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="email" style={{ paddingBottom: "10px" }}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your email"
                                    value={formValue.email}
                                    name="email"
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password" style={{ paddingBottom: "10px" }}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formValue.password}
                                    name="password"
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="button" onClick={signUp} style={buttonStyle}>
                                Sign Up
                            </Button>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={onBackClick}
                                style={{ ...buttonStyle, marginLeft: "10px" }}
                            >
                                Back
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            {isValidPassword && (
                <Modal show={isValidPassword} onHide={togglePassword}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and
                        1 special character
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handlePassword} className="w-100 mb-4">
                            Try Again
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {isValidEmail && (
                <Modal show={isValidEmail} onHide={toggleEmail}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please enter a valid email address</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleEmail} className="w-100 mb-4">
                            Try Again
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}
