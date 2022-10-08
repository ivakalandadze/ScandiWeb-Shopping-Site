import React, { Component } from 'react'
import { CartConsumer } from '../context/CartContext';
import { CurrencyConsumer } from '../context/CurrencyContext'

export default class Attribute extends Component {

  
  render() {
      return (
        <CartConsumer>
          {cart=>{
            const {changeAttributeInCart} = cart;
            const changeAttribute = this.props.changeAttribute
            const productItem = this.props.productItem
            const {type, id, items} = this.props.attribute;
            const fromDetails = this.props.fromDetails
            const itemId = this.props.itemId
            const attributeOptions = items.map((item,index)=>{
                if(productItem.choosenAttributes[id].displayValue===item.displayValue){
                  if(type==="swatch"){
                    return (<button
                      onClick={()=>fromDetails ? changeAttribute(id,index) : changeAttributeInCart(productItem,itemId, id, index)}
                      className="choosen-swatch-attribute"
                      style={{backgroundColor:`${item.displayValue}`}}
                    />)
                  }else{
                    return (<button
                      onClick={()=>fromDetails ? changeAttribute(id,index) : changeAttributeInCart(productItem,itemId, id, index)}
                      className="choosen-text-attribute"
                    >
                      {`${item.displayValue}`}
                    </button>)
                  }
                }else{
                  if(type==="swatch"){
                    return (<button
                      onClick={()=>fromDetails ? changeAttribute(id,index) : changeAttributeInCart(productItem,itemId, id, index)}
                      className="swatch-attribute"
                      style={{backgroundColor:`${item.displayValue}`}}
                    />)
                  }else{
                    return (<button
                      onClick={()=>fromDetails ? changeAttribute(id,index) : changeAttributeInCart(productItem,itemId, id, index)}
                      className="text-attribute"
                    >
                      {`${item.displayValue}`}
                    </button>)
                  }
                }

              // return(
              // <button 
              //   onClick={()=>fromDetails ? changeAttribute(id,index) : changeAttributeInCart(productItem,itemId, id, index)  }
              //   // className={productItem.choosenAttributes[id].displayValue===item.displayValue ?  "choosen-attribute" : "attribute"}
              //   className={`${type}-${productItem.choosenAttributes[id].displayValue===item.displayValue ?  "choosen-attribute" : "attribute"}`}
                  

              // >
              //   {
              //     type==="swatch" ? <div classname="attribute-div" style={{backgroundColor:`${item.displayValue}`}}></div> 
              //     : type==="text" ? <div classname="attribute-div">{`${item.displayValue}`}</div> 
              //     : <></>
              //   }
              // </button>)
            }
        )
            return(
              <div>
                {attributeOptions}
              </div>

            )
          }}
        </CartConsumer>
      )
  }
}
