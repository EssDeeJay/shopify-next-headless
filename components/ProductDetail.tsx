"use client";
import { ProductPricing } from "./ProductPricing";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";
import { ProductProvider, useCart } from "@shopify/hydrogen-react";
import AddButton from "./AddButton";

export default function ProductDetail({product} : {product: Product}){
   const { status, lines } = useCart();
   console.log(status, lines);
    return(
       <ProductProvider data={product}>
        <div>
               {product.title}
               <br/>
               {product.description}
               <br/>
               <br/>
               <ProductPricing product={product} />
               <br/>
              Quantity - {product.variants.edges[0].node.quantityAvailable ? product.variants.edges[0].node.quantityAvailable : "Out of Stock"} 
               <br/>
               <AddButton product={product} />
        </div>
      </ProductProvider>   
    )
}