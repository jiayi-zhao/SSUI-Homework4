import React, { Component } from 'react';
import CartItem from './CartItem.js';
import './App.css';

class CartOverview extends Component{
  constructor(props){
  	super(props);

  	this.state = {
  	  products: this.props.products,
  	  cart: this.props.cart,
  	  cartQty: this.props.cartQty,
  	  subtotal: 0,
  	}

  }

  getProductDetail(product){
  	for (var i = 0; i < this.props.products.length; i++){
  		if (this.props.products[i].id === product){
        console.log(this.props.products[i]);
  			return this.props.products[i];
  		}
  	}
  }

  copyArray(src){
    var result = [];
    for (var i = 0; i < src.length; i++){
      result.push(src[i]);
    }
    return result;
  }

  renderCartOverviewContent(){
    var elements = [];
    for (var i = 0; i < this.props.cart.length; i++){
      var item = this.props.cart[i];
      elements.push(<CartItem 
                     productName={item.product}
                     productQty={item.qty}
                     productDetail={this.getProductDetail(item.product)}
                     increaseCartQty={this.props.increaseCartQty}
                     decreaseCartQty={this.props.decreaseCartQty}
                     removeFromCart={this.props.removeFromCart}
                    />)
    }
    if (this.props.cart.length > 0){
      return (
        <table className="cartOverviewContent">
          {elements}
        </table>);
    }
  }

  render(){
  	return(
      <div className="cartOverview">
        <div className="cartOverviewHeader">Cart</div>
        <hr/>
        {this.renderCartOverviewContent()}
        <hr/>
        <div className="cartOverviewSub">Subtotal: ${this.props.cartSubTotal}</div>
        <div className="checkoutButton">
          <button id="checkOutButton" type="button" className={this.props.cart.length > 0 ? " " : "disabled"}>Checkout</button>
        </div>
      </div>
  	);
  }
}

export default CartOverview;