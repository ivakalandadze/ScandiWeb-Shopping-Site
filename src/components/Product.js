import React, { Component, Fragment } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import logo from "./shopping-cart.jpg"
import { CartConsumer } from '../context/CartContext';
import { CurrencyConsumer } from '../context/CurrencyContext';
import { Link, Route, Routes } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });

export default class Product extends Component {

  state ={
    price : 0,
    priceSymbol : "",
    onIt: false,
    item: []
  }

  componentDidMount(){
    this.setCurrency()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.selectedCurrency != this.props.selectedCurrency){
      this.setCurrency()
    }
  }
  
  toggleOnIt = () => {
    this.setState({onIt: true})
  }
  toggleOutOnIt = () => {
    this.setState({onIt: false})
  }

  setCurrency = () => {
    this.props.prices.map((price)=>{
      if(price.currency.label===this.props.selectedCurrency){
        this.setState({price:price.amount, priceSymbol: `${price.currency.symbol}`})
      } 
    })
  }
  
  render() {
    
    const item = this.props
    
    return (
      
          <CartConsumer>
            {props=>{
              const {addItemtoCart}=props;
              return(
                <div onMouseEnter={this.toggleOnIt} onMouseLeave={this.toggleOutOnIt} className={this.state.onIt ? 'onProduct' : 'product'}>
                    <Link to={`/product/${item.id}`}className='link-text'>
                      <div className='img-box'>
                        {!item.inStock ? <div className='out-stock'>OUT OF STOCK</div> : <Fragment></Fragment>}
                      <img src={item.gallery[0]} className="product-img"/>
                      </div>
                    </Link>
                    {this.state.onIt ? 
                    <button onClick={()=>!item.inStock ?  alert("Item out of stock") : 
                      addItemtoCart(item, this.state.price, this.state.priceSymbol)}
                      className='onItem-cart'>
                      <img className='onItem-cart-logo' src={logo} />
                    </button> : <Fragment></Fragment>}
                    <div className='isa'>
                      <h4 className="product-name">{item.name}</h4>
                      <p>{`${this.state.priceSymbol}${this.state.price}`}</p>
                    </div>
                </div>
              )
            }}
          </CartConsumer>
    )
  }
}

