import React, { Component } from 'react'
import logo from "./shopping-cart.jpg"
import { CurrencyConsumer } from '../context/CurrencyContext'
import { CartConsumer } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default class Header extends Component {

  render() {
    
    return (
      <CartConsumer>
        {cart=>{
          const {cartItems} = cart
          const countQuantity = () => {
            let quantity = 0
            cartItems.map(cartItem=>{
              quantity += cartItem.count
            })
          }
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
                    <Link to="/" className='link-text'>
                      <div className='category-box'>
                          {categoryTags}
                      </div>
                    </Link> 
                      <div className={`${cartItems.length>0?"cart-currency": "cart-currency-zero"}`}>
                          <select
                          className='currency-select'
                          value={selectedCurrency}
                          name="currencies"
                          onChange={(event)=>chooseCurrency(event)}> 
                          {currencyOptions}
                          </select>
                          <div className='mini-cart-button'>
                              {cartItems.length>0 ? <div className='item-quantity'>{cartItems.length}</div> : <></>}
                              <button className='cart-icon-button'><Link to="/cart"><img className='cart-icon' src={logo}/></Link></button>
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

