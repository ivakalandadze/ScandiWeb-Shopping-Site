import React, { Component } from 'react'
import logo from "./shopping-cart.jpg"
import { CurrencyConsumer } from '../context/CurrencyContext'
import { CartConsumer } from '../context/CartContext'

export default class Header extends Component {

  render() {
    
    return (
      <CartConsumer>
        {cart=>{
          const {cartItems} = cart
          return(
          <CurrencyConsumer>
            {props=>{
              const {currencies, selectedCurrency, chooseCurrency} = props;
              const categoryTags = this.props.categories.map((category, index)=>(
                <button className='category' onClick={(event)=>this.props.categorySelect(event)} value={category.name}key={index}>{category.name.toUpperCase()}</button>
            ))
        
            const currencyOptions = currencies.map(currency=>(
                <option value={currency.label}>{currency.symbol} {currency.label}</option>
            ))
              return (
                <div className='header-box'> 
                      <div className='category-box'>
                          {categoryTags}
                      </div>
                      <div className='cart-currency'>
                          <select
                          value={selectedCurrency}
                          name="currencies"
                          onChange={(event)=>chooseCurrency(event)}> 
                          {currencyOptions}
                          </select>
                          <div className='mini-cart-button'>
                              <div>{cartItems.length}</div>
                              <button><img className='cart-icon' src={logo} /></button>
                          </div>
                      </div>
                </div>
            )}}
          </CurrencyConsumer>
        )}}
      </CartConsumer>
    )
  }
}

