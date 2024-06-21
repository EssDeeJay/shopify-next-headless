"use client";
import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react";
import CartDrawer, { useDrawer } from "./CartDrawer";
import CartDrawerDetail from "./CartDrawerDetail";

export default function Provider({children}: {children: React.ReactNode}){

    const { isOpen, openDrawer, closeDrawer } = useDrawer();

    return (
       <ShopifyProvider storeDomain="https://greenworks-tools-dev.myshopify.com" storefrontToken="3304a77b1684f962c33ce179856359aa" storefrontApiVersion="2024-04" countryIsoCode="CA" languageIsoCode="EN">
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