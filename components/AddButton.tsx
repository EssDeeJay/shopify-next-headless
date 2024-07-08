"use client";
import { AddToCartButton } from "@shopify/hydrogen-react";
import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import { Plus, Minus } from 'lucide-react';
import { useState } from "react";

export default function AddButton({product}: {product: Product}){
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1)); // Prevents the quantity from going below 1
    };

    const soldOut = product.availableForSale === false;
    
    return( 
         <form className="flex w-full items-center justify-start">
            <div className="inline-block mr-4 flex-[1_1_35%] lg:basis-36">
             <div className="inline-flex items-center w-full border-2 border-gray-300 h-full focus-within:border-black">
                <label htmlFor="quantity" className="sr-only">Quantity</label>
                {/* plus and minus buttons for quantity */}
                <button type="button" className="text-black hover:text-gray-500 px-2" onClick={handleDecrement}>
                    <Minus strokeWidth={1.5} size={20} className="h-4 w-4" />
                </button>
                <input type="number" id="quantity" name="quantity" className="py-3 text-gray-700 w-[2.5em] flex-auto max-w-full shadow-none border-none focus:outline-none text-center" min={1}  value={quantity}  onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
                <button type="button" className="text-black hover:text-gray-500 px-2" onClick={handleIncrement}>
                    <Plus strokeWidth={1.5} size={20} className="h-4 w-4" />
                </button>
             </div>
            </div>
            <div className="flex-[1_1_65%]">
             <AddToCartButton variantId={product.variants.edges[0].node.id} quantity={quantity} type="button" className={`bg-primary hover:bg-secondary text-white font-medium py-3 px-8 rounded flex max-w-xs flex-1 items-center justify-center sm:w-full ${soldOut ? "opacity-50 cursor-not-allowed" : "" }`} disabled={soldOut ? true : false}>
                { soldOut ? "Sold Out" : "Add to Cart"}
             </AddToCartButton>
            </div>
            
         </form> 
    )
}