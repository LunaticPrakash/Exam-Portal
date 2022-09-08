import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as authConstants from "../constants/authConstants";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerReducer = useSelector((state) => state.registerReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    if (temp) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const showConfirmPasswordHandler = () => {
    const temp = !showConfirmPassword;
    setShowConfirmPassword(temp);
    if (temp) {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      phoneNumber: phoneNumber,
    };
    register(dispatch, user).then((data) => {
      if (data.type === authConstants.USER_REGISTER_SUCCESS) {
        navigate("/login");
      }
    });
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="fname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="lname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={`${passwordType}`}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
            <Button
              onClick={showPasswordHandler}
              variant=""
              style={{ border: "1px solid black" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="my-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={`${confirmPasswordType}`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></Form.Control>
            <Button
              onClick={showConfirmPasswordHandler}
              variant=""
              style={{ border: "1px solid black" }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="my-3" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button variant="" className="my-3" type="submit" style={{backgroundColor:"rgb(68 177 49)", color:"white"}}>
          Register
        </Button>
      </Form>

      {registerReducer.loading ? (
        <Loader />
      ) : (
        <Row className="py-3">
          <Col>
            Have an Account? <Link to="/" style={{color:"rgb(68 177 49)"}}>Login</Link>
          </Col>
        </Row>
      )}

    </FormContainer>
  );
};

export default RegisterPage;
