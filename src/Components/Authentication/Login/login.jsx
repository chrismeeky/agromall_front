import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    showSubmitLoader: false,
    loggedIn: false,
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      showSubmitLoader: true,
      passwordError: "",
      emailError: "",
    });
    if (!this.state.email.length) {
      setTimeout(() => {
        this.setState({ emailError: "please enter a valid email" });
      }, 2000);
    } else {
      this.setState({ emailError: "" });
    }
    if (!this.state.password.length) {
      setTimeout(() => {
        this.setState({ passwordError: "please enter a valid password" });
      }, 2000);
    } else {
      this.setState({ passwordError: "" });
    }
    if (this.state.email.length && this.state.password.length) {
      const { email, password } = this.state;
      try {
        const loggedIn = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/login`,
          {
            email,
            password,
          }
        );
        if (loggedIn) {
          this.setState({
            showSubmitLoader: false,
            loggedIn: true,
            userDetails: loggedIn.data.data.userDetails,
          });
          localStorage.setItem(
            "userDetails",
            JSON.stringify(loggedIn.data.data.userDetails)
          );
        }
      } catch (error) {
        this.setState({
          emailError: "Invalid credentials",
          showSubmitLoader: false,
        });
      }
    } else {
      setTimeout(() => {
        this.setState({ showSubmitLoader: false });
      }, 2000);
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.loggedIn ? (
          <Redirect
            to={{
              pathname: "/",
              state: { userDetails: this.state.userDetails },
            }}
          />
        ) : (
          ""
        )}
        <div className="login-form">
          <div className="container">
            <div>
              <span>Sign in to Agromall</span>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div class="form-group">
                <label for="login-input-email">Login</label>
                <input
                  type="email"
                  class="form-control "
                  id="login-input-email"
                  name="email"
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={this.handleChange}
                ></input>
                <span className="submission-warning">
                  {this.state.emailError}
                </span>
              </div>
              <div class="form-group">
                <label for="login-input-password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="login-input-password"
                  name="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.handleChange}
                ></input>
                <span className="submission-warning">
                  {this.state.passwordError}
                </span>
              </div>
              <div class="custom-control custom-checkbox  ">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="rememberme"
                  name="rememberMe"
                ></input>
                <label
                  class="remember-me custom-control-label"
                  for="rememberme"
                >
                  Remember me
                </label>
              </div>
              <div class="form-group submit-button">
                <button
                  className="btn btn-primary"
                  type="submit"
                  class="form-control"
                  id="password"
                  placeholder="Enter your password"
                >
                  {this.state.showSubmitLoader ? (
                    <Loader
                      type="ThreeDots"
                      color="grey"
                      height={30}
                      width={50}
                      timeout={10000000000000} //3 secs
                    />
                  ) : (
                    "Sign me in!"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
