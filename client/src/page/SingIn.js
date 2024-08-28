import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignin } from "../redux/user/UserAction";
import { Helmet } from "react-helmet-async";
import domain from "../utils/config";

function SingIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelsubmit = async (event) => {
    event.preventDefault();
    const data = await fetch(`${domain}/api/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const datas = await data.json();

    userSignin({
      type: "USER_SIGNIN",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
      setTimeout(() => {
      navigate("/");
      window.location.reload(); 
    }, 500);
  };

  return (
    <Container className="signIn-container">
      <Helmet>
        <title> Sign In</title>
      </Helmet>

      <div className="form-wrapper">
        <h2 className="form-title">Sign In</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            required={true}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            required={true}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            onClick={handelsubmit}
          >
            Sign In
          </button>

          <Link className="sign-up-link" to={"/singup"}>
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default SingIn;
