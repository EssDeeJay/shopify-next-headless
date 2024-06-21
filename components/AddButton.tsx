"use client";
import { AddToCartButton } from "@shopify/hydrogen-react";
import { Product } from "@shopify/hydrogen-react/storefront-api-types";

export default function AddButton({product}: {product: Product}){
    
    return( 
         <form>
            <AddToCartButton variantId={product.variants.edges[0].node.id} quantity={1} type="button" className="button" disabled={product.variants.edges[0].node.quantityAvailable ? false : true}>
                {product.variants.edges[0].node.quantityAvailable ? "Add To Cart" : "Sold Out"}
            </AddToCartButton>
         </form> 
    )
}