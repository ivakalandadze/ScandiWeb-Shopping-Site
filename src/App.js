import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React, { Component } from 'react'
import Header from './components/Header';
import "./App.css"
import "./ProductInfo.css"
import "./InCartItem.css"
import "./MiniCart.css"
import CurrencyProvider from './context/CurrencyContext';
import ProductPage from './components/pages/ProductPage';
import CartProvider from './context/CartContext';
import Cart from './components/pages/Cart';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import MiniCart from "./components/pages/MiniCart"

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});
export default class App extends Component {
  state = {
    selectedCategory: "all",
    categories: [],
    miniCart: false
  }
  componentDidMount(){
     this.getCategories()
    }

    getCategories = () => {
      client
      .query({
        query: gql`
        query Query {
          categories {
            name
          }
        }
        `
        
      })
      .then(result => this.setState({categories: result.data.categories}));
    }

    categorySelect = (event) => {
      this.setState({selectedCategory: event.target.value})
    }

    toogleMiniCart = (page) => {
      this.setState(prevState=>{
        return {miniCart:!prevState.miniCart}
      })
    }


  render() {
    return (
      <CurrencyProvider>
        <CartProvider>
          <div className='main-page'>
            <Header 
            categorySelect={this.categorySelect} 
            categories={this.state.categories}
            selectedCategory={this.state.selectedCategory}
            toogleMiniCart={this.toogleMiniCart}
            />
            <MiniCart toogleMiniCart={this.toogleMiniCart} miniCart={this.state.miniCart}/>
            <Routes>
              <Route path="/" 
                element={
                  <ProductPage 
                    category={this.state.selectedCategory}
                  />
                }
              />
              
              <Route path="/cart"
                element={
                  <Cart />
                }
              />
              <Route path="/product/:id"
                element={<ProductDetails />}
              />
            </Routes>
          </div>
        </CartProvider>
      </CurrencyProvider>
    )
  }
}
// huarache-x-stussy-le



// const client = ...

