import { Query, Mutation, Subscription } from '@apollo/client/react/components'; //this library contains various apollo-centric packages
import { graphql } from '@apollo/client/react/hoc';
import { ApolloClient } from '@apollo/client/core'; 
import { InMemoryCache } from '@apollo/client';

import { ApolloProvider, useQuery, useApolloClient } from '@apollo/client' //to bind Apollo to React, we wrap the App in this Provider
//It enables us to inject the data that Apollo receives from the endpoint specified in the client into our app

import BookList from "./Components/BookList";
import AddBook from "./Components/AddBook";

//Apollo Client Setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql'
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App" id="main">
        <h1>GraphQL Beginner Tutorial (Reading list)</h1>
        <BookList />
        <AddBook />
      </div> 
    </ApolloProvider>
  );
}

export default App;
