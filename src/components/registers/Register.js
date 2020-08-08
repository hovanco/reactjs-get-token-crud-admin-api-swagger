
import React, { Component } from "react";
import "./Style_Register.css";
import { isEmail } from "validator";
import { callApi } from "../../utils/apiCaller";
import { NavLink } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  state = {
    isPasswordShown: false
  };

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  getInitialState = () => ({
    data: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    },
    errors: {}
  });

  handleChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: ""
      }
    });
  }

  validate = () => {
    const { data } = this.state;
    let errors = {};
    if (data.name === "") errors.name = "Name can not be blank.";
    if (!isEmail(data.email)) errors.email = "Email must be valid.";
    if (data.email === "") errors.email = "Email can not be blank.";
    if (data.password === "") errors.password = "Password must be valid.";
    if (data.password_confirmation !== data.password) errors.password_confirmation = "Passwords must match.";

    return errors;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate();

    if (Object.keys(errors).length === 0) {
      console.log(data);
      try { //Call an api here
        const registerResponse = await callApi("auth/signup", "POST", data)
        console.log("Register -> handleSubmit -> registerResponse", registerResponse)
        const token = registerResponse.data.access_token
        localStorage.setItem("_token", token)
        const userResponse = await callApi("auth/user", "GET", null, token)
        localStorage.setItem("_user", JSON.stringify(userResponse.data))
        this.props.history.push("/")
      } catch (error) {
        console.log("Register error: ", error);
      }
      this.setState(this.getInitialState()); //Resetting the form
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const { isPasswordShown } = this.state;
    const { data, errors } = this.state;
    return (
      <div className="register-wrapper">
        <div className="register-container">
        <header className="register-title">Register Form</header>
          <form className="register-form" onSubmit={this.handleSubmit}>
            <div className="register-input-field">
              <input
                placeholder="Your Name"
                id="name"
                value={data.name || ""} invalid={errors.name ? true : false}
                name="name"
                onChange={this.handleChange}
              />
              <span className="register-messages">{errors.name}</span>
            </div>

            <div className="register-input-field">
              <input
                placeholder="Email"
                id="email"
                value={data.email || ""} invalid={errors.email ? true : false}
                name="email"
                onChange={this.handleChange}
              />
              <span className="register-messages">{errors.email}</span>
            </div>

            <div className="register-input-field">
              <input
                placeholder="Password"
                id="password"
                value={data.password || ""}
                type={isPasswordShown ? "text" : "password"}
                name="password"
                invalid={errors.password ? true : false}
                onChange={this.handleChange}
              />
              <span className="register-messages">{errors.password}</span>
              <i
                className={`fa ${isPasswordShown ? "fa-eye-slash" : "fa-eye"} password-icon`}
                onClick={this.togglePasswordVisiblity}
              />
            </div>
              
            <div className="register-input-field">
              <input
                placeholder="Confirm Password"
                id="password_confirmation"
                value={data.confirmPassword || ""}
                type={isPasswordShown ? "text" : "password"}
                name="password_confirmation"
                invalid={errors.password_confirmation ? true : false}
                onChange={this.handleChange}
              />
              <span className="register-messages">{errors.password_confirmation}</span>
              <i
                className={`fa ${isPasswordShown ? "fa-eye-slash" : "fa-eye"} password-icon`}
                onClick={this.togglePasswordVisiblity}
              />
            </div>
            <div className="register-button">
              <div className="register-btn-background"></div>
              <button>REGISTER</button>
            </div>
            <div className="register-text-center">
              <small className="fogotPass"><NavLink to="/login">Already Account ? Login</NavLink></small>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
