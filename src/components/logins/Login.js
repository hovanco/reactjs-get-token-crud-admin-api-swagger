import React, { Component } from "react";
import "./Style_Login.css";
import { callApi } from "../../utils/apiCaller";
import { NavLink } from "react-router-dom";

class Login extends Component {
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
      username: "admin", 
      password: "password"
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
    
    if (data.username === "") errors.username = "username can not be blank.";
    if (data.password === "") errors.password = "Password must be valid.";

    return errors;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate();

    if (Object.keys(errors).length === 0) {
      console.log(data);
      try {
        const response = await callApi("users/sign-in", "POST", data)
        console.log("Login -> handleSubmit -> response", response) // nen console de xem cau truc data cua API
        
        // dong lay token
        // response.data => la toan bo cuc Response Body cua cau truc API
        const token = response.data.token //dong dau tien 

        //dong lay cau truc data
        const user = response.data.userPrinciple.user // dong 3,4

        console.log("Login -> handleSubmit -> user", user)
        console.log("Login -> handleSubmit -> token", token)

        localStorage.setItem("_access_token", token) // luu token o tren localStorage
        localStorage.setItem("_admin_user", JSON.stringify(user)) // luu user o tren localStorage

        this.props.history.push("/") // -> go to home menu
      } catch (error) {
        console.log("Login error: ", error);
      }
      this.setState(this.getInitialState());
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const { isPasswordShown } = this.state;
    const { data, errors } = this.state;
    return (
      <div className="login-wrapper">
        <div className="login-container">
          <header className="login-title">Login Form</header>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="login-input-field">
              <input
                placeholder="username"
                id="username"
                value={data.username || ""} invalid={errors.username ? true : false}
                name="username"
                onChange={this.handleChange}
              />
              <span className="login-messages">{errors.username || ""}</span>
            </div>

            <div className="login-input-field">
              <input
                placeholder="Password"
                id="password"
                value={data.password || ""}
                type={isPasswordShown ? "text" : "password"}
                name="password"
                invalid={errors.password ? true : false}
                onChange={this.handleChange}
              />
              <span className="login-messages">{errors.password || ""}</span>
              <i
                className={`fa ${isPasswordShown ? "fa-eye-slash" : "fa-eye"} password-icon`}
                onClick={this.togglePasswordVisiblity}
              />
            </div>
            <div className="login-button">
              <div className="login-btn-background"></div>
              <button>LOGIN</button>
            </div>
            <div className="login-text-center">
              <small className="fogotPass"><NavLink to="/register">Register</NavLink> | Fogot password ?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;