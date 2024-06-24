import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";

export default function ProductCarousel({products} : {products: Product[]}){
  


  return (
    <div className="relative w-full">
        <div className="overflow-hidden relative">
            <div id="product-carousel"
            className="flex snap-x snap-x-mandatory scroll-smooth whitespace-nowrap scroll-p-4 overflow-x-auto"
            >
            {products.map((product: Product) => (
            <div key={product.id} className="snap-center shrink-0 w-1/2 md:w-1/3 lg:w-1/4 px-4 inline-block">
                <ProductCard data={product} />
            </div>
            ))}
            </div>
        </div>
        <button  onClick={() => document.querySelector('#product-carousel').scrollBy({ left: -document.querySelector('#product-carousel').clientWidth, behavior: 'smooth' })}
                className="absolute left-0 z-10 bg-gray-200 p-2 text-xl top-1/2 -translate-y-1/2" aria-label="Previous">
          ‹
        </button>
        <button onClick={() => document.querySelector('#product-carousel').scrollBy({ left: document.querySelector('#product-carousel').clientWidth, behavior: 'smooth' })}
                className="absolute right-0 z-10 bg-gray-200 p-2 text-xl top-1/2 -translate-y-1/2"
                aria-label="Next slide"
         >
        ›
      </button>
    </div>
  )

}