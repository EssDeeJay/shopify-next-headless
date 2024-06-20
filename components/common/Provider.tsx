"use client";
import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react";

export default function Provider({children}: {children: React.ReactNode}){

    return (
       <ShopifyProvider storeDomain="https://greenworks-tools-dev.myshopify.com" storefrontToken="3304a77b1684f962c33ce179856359aa" storefrontApiVersion="2024-04" countryIsoCode="CA" languageIsoCode="EN">
          <CartProvider  onLineAdd={() => {
      console.log('a line is being added');
    }}
    onLineAddComplete={() => {
      console.log('a line has been added');
    }}>
             {children}
          </CartProvider>        
       </ShopifyProvider>
    )
}