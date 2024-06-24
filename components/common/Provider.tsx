"use client";
import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react";
import CartDrawer, { useDrawer } from "./CartDrawer";
import CartDrawerDetail from "./CartDrawerDetail";

export default function Provider({children}: {children: React.ReactNode}){

    const { isOpen, openDrawer, closeDrawer } = useDrawer();
    const pubToken = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN;

    return (
       <ShopifyProvider storeDomain="https://greenworks-tools-dev.myshopify.com" storefrontToken={pubToken ? pubToken : "No Token Defined"} storefrontApiVersion="2024-04" countryIsoCode="CA" languageIsoCode="EN">
          <CartProvider  onLineAdd={() => {
      console.log('a line is being added');
    }}
    onLineAddComplete={openDrawer}
    >
             {children}
             <CartDrawer open={isOpen} onClose={closeDrawer}>
               <CartDrawerDetail />
             </CartDrawer>
          </CartProvider>        
       </ShopifyProvider>
    )
}