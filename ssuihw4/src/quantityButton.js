import React, { Component } from 'react';
import './App.css';

class QuantityButton extends Component {
  constructor(props){
    super(props)
	this.state = {
    value: 1,
  };
	this.increaseQuantity = this.increaseQuantity.bind(this);
	this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  increaseQuantity(){
  	var qty = Number(this.state.value);
  	qty = qty+1;
    this.setState({value: qty}, function(){
      this.props.updateSelectedQuantity(qty);
      this.props.updateCartSubtotal();
    })
  }

  decreaseQuantity(){
  	var qty = Number(this.state.value);
  	if (qty > 1){
  		qty = qty-1;
      this.setState({value: qty}, function(){
        this.props.updateSelectedQuantity(qty);
        this.props.updateCartSubtotal();
      })
  	}
  }

  componentWillReceiveProps(){
    this.setState({value: 1}, function(){
      this.props.updateSelectedQuantity(1);
    });
  }

  render(){
  	var subtotal = this.props.price * this.state.value;
  	return (
  	  <div className="interactiveButtons">
  	    <div className="productSubTotal">Subtotal: ${subtotal}</div>
  	    <div className="quantityButton">
          <span className="quanButt" id="decButton" onClick={this.decreaseQuantity}>-</span>
          <span className="quanNum" id="quantityNum">{this.state.value}</span>
          <span className="quanButt" id="incButton" onClick={this.increaseQuantity}>+</span>
        </div>
        <div className="addToCart" onClick={this.props.addToCart}>Add To Cart</div>
      </div>
    );
  }

}

export default QuantityButton