import "./IndivRegis.css"; // Import CSS styles
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3000/signup", {
          email,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            alert("User already exists");
          } else if (res.data == "notexist") {
            //if user doesnt exist redirect it to home
            history("/mainPageAfterSignUp", { state: { id: email } });
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
  // const togglePasswordVisibility = (fieldId) => {
  //   const field = document.getElementById(fieldId);
  //   const toggleButton = field.nextElementSibling;
  //   if (field.type === "password") {
  //     field.type = "text";
  //     toggleButton.textContent = "Hide";
  //   } else {
  //     field.type = "password";
  //     toggleButton.textContent = "Show";
  //   }

  return (
    <div className="login">
      <div className="gradient-background">
        <div className="container">
          <div className="header">
            <h2>Signup</h2>
          </div>
          <div className="content">
            <form action="POST">
              <div className="input-field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                />
              </div>
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
                <div className="password-field">
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                {/* <span
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility("password")}
                  >
                    Show
                  </span>
                </div> */}
              </div>
              <div className="input-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-field">
                  <input
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Password"
                  />
                  {/* <span
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    Show
                  </span> */}
                </div>
              </div>
              {/* //<button type="submit">Sign Up</button> */}
              <Link to="/mainPageAfterSignUp">
                <button type="submit" onClick={submit}>
                  Sign Up
                </button>
              </Link>
            </form>

            <div className="footer">
              <span>
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
