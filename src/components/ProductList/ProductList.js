import React, { Component } from "react";
import ProductItem from "../ProductItem/ProductItem";
import { connect } from "react-redux";
import { actFetchProductsRequest, actDeleteProductRequest } from "./../../actions/index";

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productIds: []
    }
  }
  componentDidMount() {
    this.props.fetchAllProducts();
  }
  onDelete = (id) => {
    this.props.onDeleteProduct(id);
  }
  handleOnSelect = id => {
    const { productIds } = this.state
    if (productIds.includes(id)) {
      this.setState({ // Xoa 1 phan tu trong mot mang
        productIds: [...productIds.filter(element => element !== id)]
      })
    } else {
      this.setState({ // Them 1 phan tu trong mot mang
        productIds: [...productIds, id]
      })
    }
  }
  showProducts(products) {
    var result = null;
    if (products) {
      if (products.length > 0) {
        products = products.sort((a, b) => b.id - a.id); // sap xep theo value gi, cu the o day la id
        result = products.map((product, index) => {
          return (
            <ProductItem
              onSelect={this.handleOnSelect}
              key={index}
              product={product}
              index={index}
              checked={this.state.productIds.includes(product.id)} //de truyen t/tinh cho the input vao ProductItem
              onDelete={this.onDelete}
            />
          );
        });
      }
    }
    return result;
  }
  handleOnDeleteSelectedIds = () => {
    const { productIds } = this.state
    productIds.forEach(productId => {
      this.props.onDeleteProduct(productId)
    });
  }
  render() {
    const { products } = this.props;
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">DANH SACH SAN PHAM</h3>
        </div>
        <div className="panel-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th></th>
                <th>No.</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.showProducts(products.data)}
              {/* {this.showProducts(products)} phai dua theo cau truc cua API */}
            </tbody>
          </table>
          <button
            onClick={this.handleOnDeleteSelectedIds}
            type="button"
            className="btn btn-danger btn-delete">Delete</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProducts: () => {
      dispatch(actFetchProductsRequest());
    },
    onDeleteProduct: (id) => {
      dispatch(actDeleteProductRequest(id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);