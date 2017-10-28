import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import StoreItem from './StoreItem.js';
import DetailItemView from './DetailItemView.js'

import peanutButterCookie from './images/peanutButterCookie.jpg';
import baconCookie from './images/baconCookie.jpg';
import sausageCookie from './images/sausageCookie.jpg';


class Store extends Component{
  constructor(props) {
    super(props);

    this.state = {
      detail: null,
    }
  }


  selectItem(id) {
    var item = this.props.product[id]
    this.props.updateSelectedProduct(item.id);
    this.props.updateSelectedQuantity(1);
    console.log("selected ",item.name)
    var detailView = <DetailItemView 
    onClose = {(ev) => this.setState({detail: null})} 
    productName = {item.name}
    image = {item.image} 
    altText = {item.altText} 
    description = {item.description} 
    detail = {item.detail}
    price = {item.price}
    quantity = {item.quantity}
    id = {item.id}
    addToCart = {this.props.addToCart}
    updateSelectedQuantity={this.props.updateSelectedQuantity}
    updateCartSubtotal={this.props.updateCartSubtotal}
    />
    this.setState({detail: detailView});
  }


  renderDetailView() {
    if(this.state.detail !== null)
    {
      return this.state.detail
    }
  }


  renderInventory() {
    var elements = []
    for(var i=0; i < this.props.product.length; i++)
    {
      var item = this.props.product[i]
      elements.push(<StoreItem key={item.id} onClick = {this.selectItem.bind(this, i)} image = {item.image} altText = {item.altText} description = {item.description} productName={item.name}/>)
    }
    return (
      <div>
        {elements}
        {this.renderDetailView()}
      </div>
    )
  }


  render() {
    return (
      this.renderInventory()
    );
  }
}


export default Store;
