import React from "react";
import ApolloClient from "apollo-boost";
// ApolloProvider: It wraps your React app and places the client on the context,
// which allows you to access it from anywhere in your component tree.
import { ApolloProvider } from '@apollo/react-hooks';

import CharacterList from "./components/charactersList";

// Apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:6767/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Character list from GraphQL:</h1>
        <CharacterList />
      </div>
    </ApolloProvider>
  );
}

export default App;
