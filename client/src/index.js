import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ViewContextProvider} from './context/ViewContext'

const baseUrl = "http://localhost:8800/api"
axios.defaults.baseURL = baseUrl;

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ViewContextProvider>
    <App />
    </ViewContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
