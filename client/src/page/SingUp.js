import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import domain from "../utils/config";
import { userSignin } from "../redux/user/UserAction";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${domain}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    console.log(data);
    userSignin({
      type: "USER_SIGNIN",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    navigate("/");
  };

  return (
    <Container className="signUp-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="form-wrapper">
        <h2 className="form-title">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Sign Up
            </button>
            <Link className="sign-in-link" to="/signin">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
