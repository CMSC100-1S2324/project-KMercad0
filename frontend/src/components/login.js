import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

//comments
export default function Login(props) {  //component for login page
    const logout = props.logout; //logout function passed from App.js

    const imageFolder = '../backgrounds/'; //folder where background images are stored
    const backgroundImages = ['bg1.png', 'bg2.png', 'bg3.png']; //array of background images

    const [currentBackground, setCurrentBackground] = useState(0); //state variable to keep track of current background image

    useEffect(() => { //useEffect hook to change background image every 5 seconds
        const intervalId = setInterval(() => { //setInterval function to change background image every 5 seconds
            setCurrentBackground((prevBackground) => (prevBackground + 1) % backgroundImages.length); //change background image
        }, 5000);

        return () => clearInterval(intervalId); //clear interval when component unmounts
    }, []);

    const backgroundImageStyle = { //style for background image
        background: `url(${imageFolder}${backgroundImages[currentBackground]}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const outerContainerStyle = { //style for outer container
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        margin: 'auto',
        width: '50%',
        height: '60vh',
        color: 'green',
        alignItems: 'center',
    };

    const whiteBoxStyle = { //style for white box
        background: 'white',
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '80%',
        height: '35vh',
        margin: 'auto',        
    };

    const text = { //style for text
        textAlign: 'center', 
        marginTop: '20px',
        color: '085025',
    };

    const buttonStyle = { //style for button
        backgroundColor: 'green',
        borderColor: 'green',
        color: 'white',
        position: 'relative',
        marginTop: '3%',
        marginBottom: '3%' ,
        left: '50%',
        transform: 'translateX(-50%)',
    };


    return ( //return login page
        <div>
            Header
        <div style={backgroundImageStyle}>
            <Container style={outerContainerStyle}>
                <Row>
                    <Col xs={12} className="mb-3" style={text}>
                        <h4>Login to your account</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} style={whiteBoxStyle}>
                        <Form>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter your username" />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" style={buttonStyle}>
                                Sign In
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="mb-3" style={text}>
                        <h6>Don't have an account? Sign up.</h6>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
    );
}
