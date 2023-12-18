
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form} from 'react-bootstrap';

export default function SignUp() {  //component for signup page

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

    
    const informationContainerStyle = { //style for outer container
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        margin: 'auto',
        width: '50%',
        height: '80vh',
        color: 'green',
        alignItems: 'center',
    };

    
    const text = { //style for text
        textAlign: 'center', 
        marginTop: '5px',
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
        transform: 'translateX(-60%)',
    };


    return (
        <div style={backgroundImageStyle}> {/* background image */}
        <Container style={informationContainerStyle}>
          <h4 className="mt-5 mb-4" style ={text}>Create an Account</h4>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                // value={firstName}
                // onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
    
            <Form.Group controlId="middleName">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your middle name"
                // value={middleName}
                // onChange={(e) => setMiddleName(e.target.value)}
              />
            </Form.Group>
    
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                // value={lastName}
                // onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
    
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
    
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
    
            <Button variant="primary" type="button" style = {buttonStyle}>
              Sign Up
            </Button>
          </Form>
        </Container>
        </div>
      );
    }