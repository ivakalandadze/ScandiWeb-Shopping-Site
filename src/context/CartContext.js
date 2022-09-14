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

    getProducts = (id) =>{
      client
            .query({
                query: gql`
                query Query($productId: String!) {
                  product(id: $productId) {
                    id
                    name
                  }
                }
                `,
                variables: {
                   "productId": id
                }
            })
            .then(result=>{
              const product = result.data.product
              this.setState(prevState=>({
              cartItems:[...prevState.cartItems, {[id]:{
                "count": 1,
                product
              }}]
            }))})
    }

    addItemtoCart = (item) => {
      // this.setState(prevState=>{
      //   const existingItem = prevState.cartItems.find(prevItem=>Object.keys(prevItem)[0]===item.id)
      //   if(existingItem){
      //     const prevItems = [...prevState.cartItems]
      //     console.log("shevida")
      //     const index = prevState.cartItems.indexOf(existingItem)
      //     console.log(prevItems[index][item.id])
      //     prevItems[index][item.id]["count"] ++
      //     return {cartItems: prevItems}
      //   }
      //   else{
      //     // return {cartItems:[...prevState.cartItems,{[item.id]:
      //     //   {"count" : 1}}]}
      //     this.getProducts(item.id)
      //   }
      // })
      const existingItem = this.state.cartItems.find(prevItem=>Object.keys(prevItem)[0]===item.id)
      if(existingItem){
        const prevItems = [...this.state.cartItems]
        console.log("shevida")
        const index = this.state.cartItems.indexOf(existingItem)
        console.log(prevItems[index][item.id])
        prevItems[index][item.id]["count"] ++
        this.setState({cartItems: prevItems})
      }else {
        this.getProducts(item.id)
      }
    }
  render() {
    const {cartItems} = this.state;
    const {addItemtoCart} = this;
    return (
      <CartContext.Provider 
        value={{
          cartItems,
          addItemtoCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    )
  }
}
