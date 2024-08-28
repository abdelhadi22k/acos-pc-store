import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignin } from "../redux/user/UserAction";
import { Helmet } from "react-helmet-async";
import domain from "../utils/config";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${domain}/api/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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
    <Container className="signIn-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="form-wrapper">
        <h2 className="form-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
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
              Sign In
            </button>
            <Link className="sign-up-link" to="/SingUp">
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
