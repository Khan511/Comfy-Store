import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    // domain={process.env.REACT_APP_COMFY_DOMAIN_KEY}
    // clientId={process.env.REACT_APP_COMFY_CLIENT_ID}
    domain="dev-0gecznqgxwme8fdk.eu.auth0.com"
    clientId="3eldhOTlCxgZRg7UJf3RfZh2VkSmGGwc"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
);
