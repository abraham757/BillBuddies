import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';

import App from './App.jsx';
import SavedBills from './pages/SavedBill.js';
import AddBillForms from './pages/AddBillForm.js';

// Apollo HTTP Link
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Auth context
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  console.log('Auth token:', token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Example query for logging (you can replace this with any real query)
const LOG_QUERY = gql`
  query LogMe {
    me {
      _id
      username
      email
    }
  }
`;

// Log requests and responses
client
  .watchQuery({
    query: LOG_QUERY,
    fetchPolicy: 'network-only', // optional: avoids cache
  })
  .subscribe({
    next(data) {
      console.log('📡 Apollo Request Sent:', data);
    },
    error(error) {
      console.error('❌ Apollo Request Error:', error);
    },
  });

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        path: '/saved',
        element: <SavedBills />,
      },
      {
        path: '/add-bill',
        element: <AddBillForms />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* @ts-ignore - bypass the type error */}
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
