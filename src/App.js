import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/homes/Home";
import Login from "./components/logins/Login";
import Register from "./components/registers/Register";
import Profile from "./components/profiles/Profile";
import NotFoundPage from "./components/notfoundpages/NotFoundPage";
import Users from "./components/users/Users";
import Languages from "./components/languages/Languages";
import RoomTypes from "./components/roomtypes/RoomTypes";
import Citys from "./components/citys/Citys";
import Categories from "./components/categories/Categories";
import Bookings from "./components/bookings/Bookings";
import Revenues from "./components/revenues/Revenues";
import Hosts from "./components/hosts/Hosts";
import ProductActionPage from "./pages/ProductActionPage/ProductActionPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-body"> 
          <Switch>
            <Route path="/" exact component={Home} /> 
            <Route path="/users" component={Users} />
            <Route path="/languages" component={Languages} />
            <Route path="/roomtypes" component={RoomTypes} />
            <Route path="/citys" component={Citys} />
            <Route path="/categories" component={Categories} />
            <Route path="/bookings" component={Bookings} />
            <Route path="/revenues" component={Revenues} />
            <Route path="/hosts" component={Hosts} />
            
            {/* cac router them vao de chay CRUD category */}
            <Route path="/product/add" component={ProductActionPage} /> 
            <Route path="/product-list" component={ProductActionPage} />
            <Route path="/product/:id/edit"  component={ProductActionPage} />

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} /> 
            <Route path="/profile" component={Profile} /> 
            <Route component={NotFoundPage} /> 
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
