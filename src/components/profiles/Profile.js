import React, { Component } from "react";
import { callApi } from "../../utils/apiCaller";
import Navbar from "../navbar/Navbar";

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      name: "",
      email: ""
    }
  }

  componentDidMount = async () => {
    try {
      const token = localStorage.getItem("_token")
      const response = await callApi("auth/user", "GET", null, token)
      const { name, email } = response.data;
      this.setState({
        loading: false,
        name,
        email
      })
    } catch (error) {
      console.log("Get profile error: ", error);
    }
  }

  render() {
    const { loading, name, email } = this.state; // extract object javascript
    if (loading) {
      return "Loading..."
    }
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="jumbotron mt-5">
            <div className="col-sm-4 mx-auto">
              <h1 className="text-center">PROFILE</h1>
            </div>
            <table className="table col-md-4 mx-auto">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{name || ""}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{email || ""}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
