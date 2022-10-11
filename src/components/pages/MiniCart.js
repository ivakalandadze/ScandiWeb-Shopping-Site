import React, { Component } from 'react'
import { CartConsumer } from '../../context/CartContext'
import InCartItem from '../InCartItem';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

export default class MiniCart extends Component {
  render() {
    return (
      <CartConsumer>
        {cart=>{
          const {cartItems} = cart;
          const cartItemElements = cartItems.map(cartItem=>{
            const id = Object.keys(cartItem)[0]
            return <InCartItem class="mini-cart" itemId={id} cartItem={cartItem[id]}/>
          })
          let totalCost = 0
          cartItems.forEach(item => {
            const id = Object.keys(item)[0]
            totalCost+=item[id].price
          });
          if(this.props.miniCart){
            return ReactDOM.createPortal(
              <div>
                <div className='ovarlay'></div>
                {cartItems.length>0 ? 
                  <div className='mini-cart'>
                      {cartItemElements}
                      <div className='mini-cart-checkout'>
                        <Link to="/cart"><button className="view-bag-button"onClick={this.props.toogleMiniCart}>VIEW BAG</button></Link>
                        <button className="check-out-button" onClick={()=>alert("Order has been placed")}>CHECK OUT</button>
                      </div>
                  </div> : 
                  <h1>Please add items to cart</h1>
                }
              </div>,
              document.getElementById('portal')
            )
          }else {
            return null
          }
        }}
      </CartConsumer>
    )
  }
}
