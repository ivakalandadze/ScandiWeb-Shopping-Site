import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React, { Component } from 'react'
import Header from './components/Header';
import "./App.css"
import "./ProductInfo.css"
import "./InCartItem.css"
import CurrencyProvider from './context/CurrencyContext';
import ProductPage from './components/pages/ProductPage';
import CartProvider from './context/CartContext';
import MiniCart from './components/pages/MiniCart';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});
export default class App extends Component {
  state = {
    selectedCategory: "all",
    categories: [],
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


  render() {
    return (
      <CurrencyProvider>
        <CartProvider>
          <div className='main-page'>
            <Header 
            categorySelect={this.categorySelect} 
            categories={this.state.categories}
            selectedCategory={this.state.selectedCategory}
            />
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
                  <MiniCart />
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

