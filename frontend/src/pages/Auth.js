import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";

import { Container, Navbar } from "react-bootstrap";

export default function Home() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // redirect when login is successful
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        }
    }, [isLoggedIn, navigate]);

    function signUp(e) {
        e.preventDefault();

        // form validation goes here

        fetch("http://localhost:3001/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fname: document.getElementById("s-fname").value,
                mname: document.getElementById("s-mname").value,
                lname: document.getElementById("s-lname").value,
                type: "user",
                email: document.getElementById("s-email").value,
                password: document.getElementById("s-password").value,
            }),
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.success) {
                    alert("Successfully sign up!");
                } else {
                    alert("Sign up failed");
                }
            });
    }

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

    /*
    TODO:
    1. Edit only this part.
    2. Convert the fields to Form field from bootstrap but retain the id for each input field.
    */
    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <Link to={`/`}>Saka Sa Lasa</Link>{" "}
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <h1>Sign Up</h1>
                <form id="sign-up">
                    <input id="s-fname" placeholder="First Name" />
                    <input id="s-mname" placeholder="Middle Name" />
                    <input id="s-lname" placeholder="Last Name" />
                    <input id="s-email" placeholder="email" />
                    <input id="s-password" type="password" placeholder="password" />
                    <button onClick={signUp}>Sign Up</button>
                </form>

                <h1>Log In</h1>
                <form id="log-in">
                    <input id="l-email" placeholder="email" />
                    <input id="l-password" type="password" placeholder="password" />
                    <button onClick={logIn}>Log In</button>
                </form>
            </Container>
        </>
    );
}
