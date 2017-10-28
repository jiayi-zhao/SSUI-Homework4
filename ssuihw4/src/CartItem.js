import React, { Component } from 'react';
import './App.css';


class CartItem extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr className="cartItem" key={this.props.productName}>
        <td><img className="cartItemImage" src={this.props.productDetail.image} alt="product image"/></td>
        <td>
          <div className="cartItemInfoNB">
            <div className="cartItemName">{this.props.productDetail.name}</div>
            <div className="cartItemPrice">Subtotal: ${this.props.productDetail.price * this.props.productQty}</div>
          </div>
        </td>
        <td>
          <div className="cartItemQuantityButton">
            <button id="cartItemQuantitydecButton" onClick={this.props.decreaseCartQty.bind(this, this.props.productName)}>-</button>
            <span id="cartItemQuantityNum">{this.props.productQty}</span>
            <button id="cartItemQuantityincButton" onClick={this.props.increaseCartQty.bind(this, this.props.productName)}>+</button>
          </div>
        </td>
        <td>
          <div className="cartItemRemoveButton">
            <button id="cartRemoveButton" type="button" onClick={this.props.removeFromCart.bind(this, this.props.productName)}>x</button>
          </div>
        </td>
      </tr>
    );
  }
}


export default CartItem;