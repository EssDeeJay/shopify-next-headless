"use client";
import { AddToCartButton } from "@shopify/hydrogen-react";
import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import { useCart, useProduct } from "@shopify/hydrogen-react";

export default function AddButton({product}: {product: Product}){
    const { status, lines, linesAdd } = useCart();
    const { selectedVariant } = useProduct();
    
     
    return( 
         <form>
            <AddToCartButton variantId={product.variants.edges[0].node.id} quantity={1} type="button">
                Add to cart
            </AddToCartButton>
         </form>    
           
    )
}