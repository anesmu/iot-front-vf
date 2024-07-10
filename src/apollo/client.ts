import { ApolloClient, InMemoryCache } from '@apollo/client';
import dotenv from 'dotenv';

dotenv.config();

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

export default client;
