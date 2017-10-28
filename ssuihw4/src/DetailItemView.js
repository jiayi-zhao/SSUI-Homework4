import React, { Component } from 'react';
import './App.css';
import QuantityButton from './quantityButton.js'


class DetailItemView extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="detailPane">
        <div className="Xout" onClick={this.props.onClose}>X</div>
        <div className="detailPane-inner">
          <img className="productImage" src={this.props.image} alt={this.props.altText} />
          <div className="productNameDetailView">{this.props.productName}</div>
          <div className="productLabel">{this.props.description}</div>
          <div className="productDetail">{this.props.detail}</div>
          <QuantityButton 
           item={this.props.id} 
           price={this.props.price} 
           updateSelectedQuantity={this.props.updateSelectedQuantity} 
           addToCart = {this.props.addToCart}
           updateCartSubtotal={this.props.updateCartSubtotal}
          />
        </div>
      </div>
    );
  }
}


export default DetailItemView;
