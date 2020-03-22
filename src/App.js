import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import ContinentList from "./components/ContinentList";
import ContinentDetail from "./components/ContinentDetail";
import "./styles.css";

const history = createBrowserHistory();

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://countries.trevorblades.com/" //url to fetch data
  }),
  cache: new InMemoryCache() //setting cache
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={ContinentList} />
          <Route path="/:code" component={ContinentDetail} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}
