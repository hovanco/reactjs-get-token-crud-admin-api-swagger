import React, { Component } from "react";
import { Link } from 'react-router-dom';

class ProductItem extends Component {
  onDelete = (id) => {
    if (confirm("ban muon xoa?")) {//eslint-disable-line
      this.props.onDelete(id)
    }
  }
  onSelectProduct = id => {
    this.props.onSelect(id)
  }
  render() {
    var { product, index } = this.props;
    return (
      <tr>
        <td>
          <input type="checkbox"
            className=""
            checked={this.props.checked} // nhan ckecked thong qua props tu ProductList truyen vao
            onChange={() => this.onSelectProduct(product.id)} />
        </td>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>
          <Link to={`/product/${product.id}/edit`} className="btn btn-warning mr-10">Update</Link>
          {/* <button onClick={this.handleClick} type="button" className="btn btn-danger">Delete</button> */}
        </td>
      </tr>
    )
  }
}
export default ProductItem;
