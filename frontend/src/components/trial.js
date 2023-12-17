import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Button, Form } from 'react-bootstrap';

export default function Login(props) {
    const logout = props.logout;

    const imageFolder = '../images/';
    const backgroundImages = ['bg1.png', 'bg2.jpg'];

    const [currentBackground, setCurrentBackground] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentBackground((prevBackground) => (prevBackground + 1) % backgroundImages.length);
        }, 5000);

        return () => clearInterval(intervalId);

    }, []);

    const backgroundImageStyle = {
        background: `url(${imageFolder}${backgroundImages[currentBackground]}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        padding: '20px', // Adjust padding as needed
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: 'white', // Adjust text color for better readability
        minHeight: '100vh', // Ensures the background covers the entire viewport height
        display: 'flex',
        backgroundPosition: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const innerContainerStyle = {
        width: '60%',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: 'green', // Adjust text color for better readability
        background: 'white'
    };

    const outerContainerStyle = {
        width: '60%',
        heigh: '50%',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: 'black', // Adjust text color for better readability
        background: 'white'

    };


    const loginText = {
        display: 'flex', 
        alignItems: 'center'

    };
    return (
        <div style={backgroundImageStyle}>

            <div style={outerContainerStyle}>
                <div style={innerContainerStyle}>
                    <h4 style = {loginText}>Login to your account</h4>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter your username" />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" />
                        </Form.Group>

                        <Button variant="primary" onClick={logout}>Back</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
