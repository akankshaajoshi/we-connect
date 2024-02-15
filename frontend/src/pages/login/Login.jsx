import "./login.css";
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    const userCredentials = { email: email.current.value, password: password.current.value };
    loginCall(userCredentials, dispatch);
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
            <input type="email" placeholder="Email" className="loginInput" ref={email} required />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              minLength={6}
              ref={password}
              required
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? <CircularProgress style={{ width: "24px", height: "24px", color: "white" }} /> : "Login"}
            </button>
            <span className="loginForgot">Forgot password?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress style={{ width: "24px", height: "24px", color: "white" }} />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
