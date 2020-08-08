import React, { Component } from "react";
import Navbar from "../navbar/Navbar";
import ProductList from "../ProductList/ProductList";
import { Link } from "react-router-dom";

class Catigories extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <Link to="/product/add" className="btn btn-success mb-10">Add New Product</Link>
          <ProductList />
        </div>
      </>
    )
  }
}
export default Catigories;
