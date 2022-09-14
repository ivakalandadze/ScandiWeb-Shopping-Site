import React, { Component, createContext } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const CurencyContext = createContext();

export const CurrencyConsumer = CurencyContext.Consumer;

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });

export default class CurrencyProvider extends Component {
    state = {
        currencies: [],
        selectedCurrency: "USD"
    }

    componentDidMount(){
        client
          .query({
            query: gql`
            query Query {
              currencies {
                label
                symbol
              }
            }
            `
            
          })
          .then(result => this.setState({currencies: result.data.currencies}));
      }

      chooseCurrency = (event) => {
        this.setState({selectedCurrency:event.target.value})
      }

  render() {
      const {currencies, selectedCurrency} = this.state;
      const {chooseCurrency} = this;
    return (
      <CurencyContext.Provider value={{
        currencies,
        selectedCurrency,
        chooseCurrency
      }}
      >
        {this.props.children}
      </CurencyContext.Provider>
    )
  }
}
