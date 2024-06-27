"use client";
import { ProductPricing } from "./ProductPricing";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";
import { ProductProvider, flattenConnection } from "@shopify/hydrogen-react";
import AddButton from "./AddButton";
import type { Media } from "@shopify/hydrogen-react/storefront-api-types";
import Image from "next/image";

interface ProductMedia extends Media {
   image: {
      url: string;
   };
}

export default function ProductDetail({ product }: { product: Product }) {
   const media = flattenConnection(product.media) as ProductMedia[];
   const mediaImages = media.map((media: ProductMedia) => media.image.url);

   console.log(product)

   return (
      <ProductProvider data={product}>
         <div className="mx-auto max-w-7xl lg:max-w-screen-2xl px-4 sm:px-6 lg:px-8 sm:pt-16">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:align-start">
               <div className="flex flex-col">
                  {mediaImages.map((image, index) => (
                     <div className="bg-gray-50 mt-2" key={index}>
                      <Image  src={image} alt={product.title} height={800} width={800} className="w-full h-auto mix-blend-multiply" priority={index && index === 0 ? true : false} placeholder="blur" blurDataURL={image} />
                     </div> 
                  ))}
               </div>
               <div className="mt-10 sm:mt-16 lg:mt-0 px-4 lg:px-0">
                  <div className="my-4">
                     <span className="text-gray-500">
                        SKU: {product.variants.edges[0].node.sku}
                     </span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-black tracking-tight">{product.title}</h1>
                  <div className="mt-3">
                     <ProductPricing product={product} />
                  </div>
                  <div className="mt-3">
                     {/* Product Review Stars - Change this to the dynamic reviews of the tools you use for your online store */}
                     <div className="flex items-center">
                        <div className="flex items-center">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-6 w-6 text-yellow-500 shrink-0">
                              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd"></path>
                           </svg>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-6 w-6 text-yellow-500 shrink-0">
                              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd"></path>
                           </svg>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-6 w-6 text-yellow-500 shrink-0">
                              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd"></path>
                           </svg>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-6 w-6 text-yellow-500 shrink-0">
                              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd"></path>
                           </svg>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-6 w-6 text-gray-300 shrink-0">
                              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd"></path>
                           </svg>
                        </div>
                        <p className="sr-only">
                           4 out of 5 stars
                        </p>
                     </div>
                  </div>

                  <div className="mt-6">
                     <h3 className="sr-only">Product Description</h3>
                     <p className="text-base text-gray-700">
                        {product.description}
                     </p>
                  </div>

                  <div className="mt-6">
                  <hr className="w-full border-b border-gray-300" />
                     <div className="flex items-center my-6">
                          {/* Quantity Field to capture the quantity input */}
                           {/* Form Button to add to the cart */}               
                           <AddButton product={product} />
                     </div>
                     <hr className="w-full border-b border-gray-300" />
                  </div>
               </div>
            </div>

            <br />
            Quantity - {product.variants.edges[0].node.quantityAvailable ? product.variants.edges[0].node.quantityAvailable : "Out of Stock"}
            <br />
            


         </div>
      </ProductProvider>
   )
}