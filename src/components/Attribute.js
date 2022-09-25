import React, { Component } from 'react'
import { CartConsumer } from '../context/CartContext';
import { CurrencyConsumer } from '../context/CurrencyContext'

export default class Attribute extends Component {
  state = {
    choosenAttributeIndex: 0
  }

  chooseAttribute = (index) => {
    this.setState({choosenAttributeIndex: index})
  }
  
  render() {
    const {type, id, items} = this.props.attribute;
    const attributeOptions = items.map((item,index)=>(
          <button onClick={()=>this.chooseAttribute(index)}className={index===this.state.choosenAttributeIndex ? "choosen-attribute" : "attribute"}>
            {
              type==="swatch" ? <div style={{backgroundColor:`${item.value}`}}>{`${item.displayValue}`}</div> 
              : type==="text" ? <div>{`${item.displayValue}`}</div> 
              : <></>
            }
          </button>
       )
    )
      return (
        // <CartConsumer>
        //   {cart=>{
            <div>
              {attributeOptions}
            </div>
        //   }}
        // </CartConsumer>
      )
  }
}
