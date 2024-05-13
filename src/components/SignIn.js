// SignIn.js
import { useState, React } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link from React Router
import "./SignIn.css";
import logo from "./logo.png";

function Login() {
  //navigate btw diff pages in react routuer
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3000/", {
          //exact url in hwich u r filling the details
          email,
          password,
        })
        .then((res) => {
          // getting data from backend
          // if email exist we will be directed to home page
          if (res.data == "exist") {
            history("/AdminHomepage", { state: { id: email } });
          } else if (res.data == "notexist") {
            alert("Please provide a valid email address and password.");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="login">
      <div className="gradient-background">
        <div className="container">
          <div className="header">
            <img src={logo} alt="Taskify Logo" />
            <span className="signup">
              Don't have an account?{" "}
              <Link to="/Whoareyou" className="signup-link">
                Sign up
              </Link>
              {/* Use Link instead of <a> */}
            </span>
          </div>
          <div className="content">
            <h1>Login</h1>
            <form action="POST">
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" onClick={submit}>
                Log In
              </button>
              <div className="social-login">
                <span>G</span>
                <span>Sign in with Google</span>
              </div>
            </form>
          </div>

          <div className="footer">
            <span>
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
