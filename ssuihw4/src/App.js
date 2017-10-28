import React, { Component } from 'react';
import './App.css';
import Store from './Store.js';
import About from './About.js';
import CartOverview from './CartOverview.js';
import dogCookieBackdrop from './images/dog-cookies.jpg';
import pupIcon from './images/pupIcon.svg';
import boneIcon from './images/bone.svg';

class App extends Component {
  constructor(props) {
    super(props);
    var data = require('./products.json');
    this.state = {
      page: 0,
      products: data,
      cart: [],
      cartQty: 0,
      cartSubTotal: 0,
      selectedProduct: '',
      selectedQuantity: 1,
      cartOverview: false,
    };
    this.getTotalItemsNum = this.getTotalItemsNum.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.increaseCartQty = this.increaseCartQty.bind(this);
    this.decreaseCartQty = this.decreaseCartQty.bind(this);
    this.updateSelectedProduct = this.updateSelectedProduct.bind(this);
    this.updateSelectedQuantity = this.updateSelectedQuantity.bind(this);
    this.updateCartSubtotal = this.updateCartSubtotal.bind(this);
  }

  getTotalItemsNum(){
    var sum = 0;
    for (var i = 0; i < this.state.cart.length; i++){
      sum += this.state.cart[i].qty;
    }
    this.setState({cartQty: sum});
  }

  componentWillMount(){
    this.getTotalItemsNum();
  }

  navToShopPage() {
    this.setState({page: 0})
  }

  navToAboutPage(){
    this.setState({page: 1})
  }

  copyArray(src){
    var result = [];
    for (var i = 0; i < src.length; i++){
      result.push(src[i]);
    }
    return result;
  }

  updateSelectedProduct(product){
    console.log("updateSelectedProduct is triggured");
    this.setState({selectedProduct: product});
  }

  updateSelectedQuantity(qty){
    console.log("updateSelectedQuantity is triggured");
    console.log("Input", qty);
    console.log("selectedProduct", this.state.selectedProduct);
    console.log("selectedQuantityOld", this.state.selectedQuantity);
    this.setState({selectedQuantity: qty});
    console.log("selectedQuantityNew", this.state.selectedQuantity);
  }

  addToCart(){
    console.log("addToCart is triggered");
    console.log("selectedProduct", this.state.selectedProduct);
    console.log("selectedQuantity", this.state.selectedQuantity);
    var flag = true;
    var newCart = [];
    for (var i = 0; i < this.state.cart.length; i++){
      newCart.push(this.state.cart[i]);
    }
    for (var i = 0; i < this.state.cart.length; i++){
      if (this.state.cart[i].product === this.state.selectedProduct){
        newCart[i].qty+=this.state.selectedQuantity;
        this.setState({cart: newCart}, function(){
          this.updateCartSubtotal();
          this.updateCartQty();
        });
        flag = false;
      }
    }
    if (flag === true){
      newCart.push({"product": this.state.selectedProduct, "qty": this.state.selectedQuantity});
      this.setState({cart: newCart}, function(){
        this.updateCartSubtotal();
        this.updateCartQty();
      });
    }
    console.log(this.state.cart);
  }

  removeFromCart(product){
    console.log("removeFromCart is called");
    var newCart = this.copyArray(this.state.cart);
    console.log("input/product: ", product);
    var index = this.state.cart.findIndex(x => x.product === product);
    console.log("index: ", index);
    if (index !== -1){
      newCart.splice(index, 1);
      this.setState({cart: newCart}, function(){
        this.updateCartSubtotal();
        this.updateCartQty();
        console.log("new cart: ", this.state.cart);
      });
    }
  }

  increaseCartQty(product){
    console.log("increaseCartQty is called");
    var newCart = this.copyArray(this.state.cart);
    var index = this.state.cart.findIndex(x => x.product === product);
    if (index !== -1){
      newCart[index].qty++;
      this.setState({cart: newCart}, function(){
        this.updateCartSubtotal();
        this.updateCartQty();
      });
    }
  }

  decreaseCartQty(product){
    console.log("decreaseCartQty is called");
    var newCart = this.copyArray(this.state.cart);
    var index = this.state.cart.findIndex(x => x.product === product);
    if (index !== -1 && this.state.cart[index].qty > 1){
      newCart[index].qty--;
      this.setState({cart: newCart}, function(){
        this.updateCartSubtotal();
        this.updateCartQty();
      });
    }
  }

  hoverCart(){
    this.setState({cartOverview: true})
  }

  leaveHoverCart(){
    this.setState({cartOverview: false})
  }

  getProductPrice(product){
    for (var i = 0; i < this.state.products.length; i++){
      if (this.state.products[i].id === product){
        return this.state.products[i].price;
      }
    }
    return 0;
  }

  updateCartSubtotal(){
    var sum = 0;
    for (var i = 0; i < this.state.cart.length; i++){
      var productName = this.state.cart[i].product;
      var productQty = this.state.cart[i].qty;
      sum += productQty * this.getProductPrice(productName);
    }
    this.setState({cartSubTotal: sum}, function(){
      console.log("updateCartSubtotal was triggered, new subtotal:", this.state.cartSubTotal);
    });
  }

  updateCartQty(){
    console.log("updateCartQty was triggered");
    var sum = 0;
    for (var i = 0; i < this.state.cart.length; i++){
      sum += this.state.cart[i].qty;
    }
    this.setState({cartQty: sum});
  }

  renderPageView() {
    if(this.state.page === 0)
      return <Store
              product={this.state.products}
              addToCart={this.addToCart}
              updateSelectedProduct={this.updateSelectedProduct}
              updateSelectedQuantity={this.updateSelectedQuantity}
              updateCartSubtotal={this.updateCartSubtotal}
             />
    if(this.state.page === 1)
      return <About/>
  }

  renderCartOverview(){
    if(this.state.cartOverview === true)
      return <CartOverview
               products={this.state.products}
               cart={this.state.cart}
               cartQty={this.state.cartQty}
               cartSubTotal={this.state.cartSubTotal}
               removeFromCart={this.removeFromCart}
               increaseCartQty={this.increaseCartQty}
               decreaseCartQty={this.decreaseCartQty}
             />
  }

  render() {
    return (
      <div className="App">
        <img src={dogCookieBackdrop} className="App-largeDogCookieImage" alt="dog eating cookies" />
        <div className = "App-background" />
        <div className = "App-content">
          <div className = "App-navMenu">
            <div className = {"App-navMenu-button" + (this.state.page === 0 ? " active" : "")} onClick={this.navToShopPage.bind(this)}>Shop</div>
            <div className = {"App-navMenu-button" + (this.state.page === 1 ? " active" : "")} onClick={(ev) => this.setState({page: 1})} >About</div>
            <div className = "App-navMenu-button" onMouseEnter={this.hoverCart.bind(this)} onMouseLeave={this.leaveHoverCart.bind(this)}><img src={boneIcon} className="App-boneIcon" alt="dog bone cart"/>{this.state.cartQty}</div>
            <div className="Container" onMouseEnter={this.hoverCart.bind(this)} onMouseLeave={this.leaveHoverCart.bind(this)}>{this.renderCartOverview()}</div>
          </div>
          <header className="App-header">
            <h1 className="App-title"><img src={pupIcon} className="App-pupIcon" alt="dog face" />Pip Pup Cookies</h1>
            <p className="App-intro">
              Welcome to Pip Pup Cookies! We home-bake organic dog cookies from
               only the finest ingrediants for your distinguished pup. Based out of Pittsburgh, PA,
               we ship across the US.
            </p>
          </header>
          {this.renderPageView()}
        </div>
      </div>
    );
  }
}

export default App;
