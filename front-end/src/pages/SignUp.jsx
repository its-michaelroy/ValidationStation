import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useOutletContext } from "react-router-dom";
import { api } from "../utilities";

//States to keep track of email and password input & update userstate component parent with user info
const SignUp = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { setUser } = useOutletContext();

  //Function to register user
  const signupUser = async (e) => {
    e.preventDefault();
    const response = await api.post("users/register/", {
      email: emailInput,
      password: passwordInput,
    });
    //If user is successfully registered, save token and user info in local storage & update user state
    if (response.status === 201) {
      console.log("successfuly signed up, user info", response.data);
      const { token, user } = response.data;
      // save auth token so it can be used
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      // Update user context to include email and user info
      setUser({ email: emailInput, user });
    }
  };

  return (
    <>
      <br />
      <br />
      <h2>Signup</h2>
      <Form onSubmit={signupUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmailInput(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else!
          </Form.Text>
        </Form.Group>

        {/* Form group for password input */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPasswordInput(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignUp;
