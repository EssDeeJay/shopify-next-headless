"use client";
import { ShopifyProvider, useShop, CartProvider } from "@shopify/hydrogen-react";

export default function Provider({children}: {children: React.ReactNode}){
    const shop = useShop();

    const { storeDomain, storefrontToken, storefrontApiVersion, countryIsoCode, languageIsoCode } = useShop();
    console.log(storeDomain, storefrontToken, storefrontApiVersion, countryIsoCode, languageIsoCode)
    return (
       <ShopifyProvider storeDomain={shop.storeDomain} storefrontToken={shop.storefrontToken} storefrontApiVersion={shop.storefrontApiVersion} countryIsoCode={shop.countryIsoCode} languageIsoCode={shop.languageIsoCode}>
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