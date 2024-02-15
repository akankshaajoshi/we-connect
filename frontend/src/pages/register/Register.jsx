import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match.");
    } else {
      const userCredentials = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("https://we-connect-api-r7xb.onrender.com/api/auth/register", userCredentials);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">WeConnect</h3>
          <span className="loginDesc">Connect with friends and the world around you on WeConnect.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input type="text" required placeholder="Username" ref={username} className="loginInput" />
            <input type="email" required placeholder="Email" ref={email} className="loginInput" />
            <input type="password" required placeholder="Password" ref={password} className="loginInput" />
            <input type="password" required placeholder="Password again" ref={passwordAgain} className="loginInput" />
            <button className="loginButton">Sign Up</button>
            <Link
              to="/login"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
            >
              <button className="loginRegisterButton">Log into your Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
