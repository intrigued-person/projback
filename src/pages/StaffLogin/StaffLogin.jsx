import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "../Navbar/Topnav";
import './Login.css'; // Import the CSS file

const Login = () => {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const [staffName, setstaffName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitt = (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");

    if (!staffName) {
      setUsernameError("Username is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    axios
      .get(`http://localhost:9952/staffLogin/${staffName}/${password}`)
      .then((res) => {
        sessionStorage.setItem("staffName", res.data.staffName);
        if(res.data.staffName === "admin" && res.data.password === "admin") {
          navigate("/AdminApplicationrequest");
        } else {
          navigate("/Applicationrequest");
        }
      }).catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: "Please enter valid credentials",
        });
      });
  };

  return (
    <div>
      <Topnav />
      <Container fluid className="bg-light login-container">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={4} className="py-5">
            <div className="login-card p-4 shadow rounded bg-white">
              <div className="text-center mb-4">
                <Image
                  src="https://static.vecteezy.com/system/resources/previews/006/470/647/original/university-education-logo-design-template-free-vector.jpg"
                  alt="College Logo"
                  fluid
                  className="logo"
                />
                <h2 className="mt-3" role="staff-login">Staff Login</h2>
              </div>
              
              <Form onSubmit={handleSubmitt}>
                <Form.Group controlId="formUsername">
                  <Form.Label role="username">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="staffName"
                    placeholder="Enter your username"
                    role='name-input'
                    value={staffName}
                    onChange={(e) => setstaffName(e.target.value)}
                    isInvalid={!!usernameError}
                    className="form-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    {usernameError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label role='password'>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    role='pass-input'
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!passwordError}
                    className="form-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 w-100 login-btn"
                  data-testId="log-btn"
                >
                  Login
                </Button>
                <p className="mt-3 text-center">
                  <Link to="/" className="text-decoration-none go-home-link">Go to home</Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <footer className="bg-dark text-light py-4">
        <Container>
          <Row>
            <Col>
              <p className="mb-0">University of Houston</p>
              <p className="mb-0">Houston, Texas 77204</p>
              <p className="mb-0">(713) 743-2255</p>
            </Col>
            <Col>
              <h5>About Us</h5>
              <p>You can follow us on our social media platforms including Facebook, Instagram, YouTube, Twitter, and Google+ @ University of Houston</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Login;