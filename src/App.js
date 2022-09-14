import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React, { Component } from 'react'
import Header from './components/Header';
import "./App.css"
import CurrencyProvider from './context/CurrencyContext';
import ProductPage from './components/pages/ProductPage';
import CartProvider from './context/CartContext';

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
            />
          <ProductPage 
            category={this.state.selectedCategory}
          />
          </div>
        </CartProvider>
      </CurrencyProvider>
    )
  }
}
// huarache-x-stussy-le



// const client = ...

