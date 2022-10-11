import React, { Component, createContext } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

export const CartContext = createContext();

export const CartConsumer = CartContext.Consumer

export default class CartProvider extends Component {
    state = {
        cartItems: []
    }

    

    getProducts = (id,price, symbol, attributes) =>{
      client
            .query({
                query: gql`
                query Query($productId: String!) {
                  product(id: $productId) {
                    name
                    id
                    gallery
                    brand
                    description
                    attributes {
                      id
                      name
                      type
                      items {
                        displayValue
                        value
                        id
                      }
                    }
                  }
                }
                `,
                variables: {
                   "productId": id
                }
            })
            .then(result=>{
              const product = {...result.data.product}
              const choosenAttributes = attributes ? attributes : {}
              if(!attributes) {
                product.attributes.forEach(attribute=>{
                  choosenAttributes[attribute.id] = attribute.items[0]
                })
              } 
              this.setState(prevState=>({
              cartItems:[...prevState.cartItems, {[id]:{
                "count": 1,
                product,
                price,
                symbol,
                choosenAttributes
              }}]
            }))
          })
    }

    addItemtoCart = (item,price,symbol) => {
      const existingItem = this.state.cartItems.find(prevItem=>Object.keys(prevItem)[0]===item.id)
      if(existingItem){
          if(item.choosenAttributes&&JSON.stringify(item.choosenAttributes)!==JSON.stringify(existingItem[item.id].choosenAttributes)){
            this.getProducts(item.id, price, symbol, item.choosenAttributes)
          }else {
          const prevItems = [...this.state.cartItems]
          const index = this.state.cartItems.indexOf(existingItem)
          prevItems[index][item.id]["count"] ++
          this.setState({cartItems: prevItems})
          }
      }else {
        this.getProducts(item.id, price, symbol, item.choosenAttributes)
      }
    }

    changeQuantity = (id,item,command) => {
      this.state.cartItems.map((cartItem,index)=>{
        if(Object.keys(cartItem)[0]===id && JSON.stringify(cartItem[id].choosenAttributes)==JSON.stringify(item.choosenAttributes)){
          const newQuantity = [...this.state.cartItems]
          if(command==="increase"){
            newQuantity[index][id].count += 1
          }else if(command==="decrease") {
            newQuantity[index][id].count -= 1
          }
          this.setState({cartItems: newQuantity})
        }
      })
    }
    
    changeAttributeInCart = (productItem,id, attributeId, itemId) => {
      const prevCartItems=[...this.state.cartItems]
      const index = prevCartItems.findIndex(cartItem=>Object.keys(cartItem)[0]===id &&
       JSON.stringify(productItem.choosenAttributes)===JSON.stringify(cartItem[id].choosenAttributes))
      const attributeIndex = prevCartItems[index][id].product.attributes.findIndex(attribute=>attribute.id===attributeId)
      const newItem = prevCartItems[index][id].product.attributes[attributeIndex].items[itemId]
      prevCartItems[index][id].choosenAttributes[attributeId] = newItem
      this.setState({cartItems: prevCartItems})
    }

  render() {
    const {cartItems} = this.state;
    const {addItemtoCart,changeQuantity,changeAttributeInCart} = this;
    return (
      <CartContext.Provider 
        value={{
          cartItems,
          addItemtoCart,
          changeQuantity,
          changeAttributeInCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    )
  }
}
