import React, { Component, Fragment } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import logo from "./shopping-cart.jpg"
import { CartConsumer } from '../context/CartContext';
import { CurrencyConsumer } from '../context/CurrencyContext';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });

export default class Product extends Component {

  state ={
    price : "",
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
        this.setState({price:`${price.currency.symbol}${price.amount}`})
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
                    <div className='img-box'>
                      {item.inStock ? <div className='out-stock'>OUT OF STOCK</div> : <Fragment></Fragment>}
                      <img src={item.gallery[0]} className="product-img"/>
                    </div>
                    {this.state.onIt ? <button onClick={()=>addItemtoCart(item)}className='onItem-cart'><img className='onItem-cart-logo' src={logo} /></button> : <Fragment></Fragment>}
                    <div className='isa'>
                      <h4 className="product-name">{item.name}</h4>
                      <p>{this.state.price}</p>
                    </div>
                </div>
              )
            }}
          </CartConsumer>
    )
  }
}
