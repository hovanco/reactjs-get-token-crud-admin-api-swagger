import React, { Component } from "react";
import ProductList from "./../../componets/ProductList/ProductList";
import { Link } from "react-router-dom";

class ProductListPage extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Link to="/product/add" className="btn btn-success mb-10">Add New Product</Link>
        <ProductList />
      </div>
    );
  }
}
export default ProductListPage;