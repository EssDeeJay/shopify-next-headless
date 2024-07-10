"use client";
import { ProductPricing } from "./ProductPricing";
import type { Product, Media, GenericFile } from "@shopify/hydrogen-react/storefront-api-types";
import { ProductProvider, flattenConnection } from "@shopify/hydrogen-react";
import AddButton from "./AddButton";
import Image from "next/image";
import PrelineAccordion from "./PrelineAccordion";

interface ProductMedia extends Media {
   image: {
      url: string;
   };
}

interface ExtendedProduct extends Product {
   keyFeatures?: {
      references: {
         nodes: KeyFeature[];
      };
   };
   specifications?: Specifications;
   manuals?: {
      references: {
         nodes: GenericFile[];
      };
   };
   includes?: IncludedItems;
}

interface KeyFeature {
   id: string;
   field: {
      value: string; // JSON string
   };
}

interface Specifications {
   title: string;
   value: string;
}

interface IncludedItems {
   value?: string;
}
interface FileNames{
   url: URL;
   fileName: string;
 }

export default function ProductDetail({ product }: { product: ExtendedProduct }) {
   if (!product) return null;
     
   const media = flattenConnection(product?.media) as ProductMedia[];
   const mediaImages = media.map((media: ProductMedia) => media.image.url);
   const keyFeatures = product.keyFeatures?.references?.nodes.map((node: KeyFeature) => JSON.parse(node.field.value));
   const manuals = product.manuals?.references?.nodes.map((node) => node.url);
   const rawSpecifications = product.specifications?.value && product.specifications?.value;
   const includedItems = product.includes?.value && JSON.parse(product.includes?.value);

   const specifications = rawSpecifications && rawSpecifications.split("\n").map((line: String) => {
      const [title, ...value] = line.split(":");
      return {title: title.trim(), value: value.join(":").trim()}
   });
   const fileNames = manuals && manuals?.map((manual) => {
      const url = new URL(manual!);    
      return {url: url, fileName: url.pathname.split("/").pop()};
   });

   return (
      <ProductProvider data={product}>
         <div className="mx-auto max-w-7xl lg:max-w-screen-2xl px-4 sm:px-6 lg:px-8 sm:pt-16">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:align-start">
               <div>
                  <div className="relative" data-hs-carousel='{"loadingClasses": "opacity-0", "isInfiniteLoop": false}'>
                     <div className="hs-carousel relative overflow-hidden w-full min-h-[400px] sm:min-h-[650px] xl:min-h-[720px] bg-white">
                        <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap items-center transition-transform duration-700 opacity-0">
                           {mediaImages.map((image, index) => (
                              <div className="bg-gray-50 mt-2 rounded-lg hs-carousel-slide" key={index}>
                                 <Image src={image} alt={product.title} height={800} width={800} className="w-full h-auto mix-blend-multiply" priority={index && index === 0 ? true : false} placeholder="blur" blurDataURL={image} />
                              </div>
                           ))}
                        </div>
                     </div>

                     <button
                        type="button"
                        className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute top-1/2 start-0 inline-flex justify-center items-center w-[46px] h-[46px] text-black rounded-s-lg bg-gray-100 ml-4"
                     >
                        <span className="text-2xl" aria-hidden="true">
                           <svg
                              className="flex-shrink-0 size-5"
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           >
                              <path d="m15 18-6-6 6-6" />
                           </svg>
                        </span>
                        <span className="sr-only">Previous</span>
                     </button>
                     <button
                        type="button"
                        className="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute top-1/2 end-0 inline-flex justify-center items-center w-[46px] h-[46px] text-black rounded-e-lg bg-gray-100 mr-4"
                     >
                        <span className="sr-only">Next</span>
                        <span className="text-2xl" aria-hidden="true">
                           <svg
                              className="flex-shrink-0 size-5"
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           >
                              <path d="m9 18 6-6-6-6" />
                           </svg>
                        </span>
                     </button>

                     <div className="hs-carousel-pagination flex justify-start space-x-2 mt-4 overflow-x-scroll snap-x snap-mandatory snap-start no-scrollbar">
                        {mediaImages.map((image, index) => (
                              <div className="hs-carousel-active:border-b-primary hs-carousel-active:border-b-2 border border-gray-100 cursor-pointer flex-[0_0_84px] lg:flex-[0_0_80px]" key={index}>
                                 <Image src={image} alt={product.title} height={100} width={100} className="w-full h-auto mix-blend-multiply" priority={index && index === 0 ? true : false} placeholder="blur" blurDataURL={image} />
                              </div>
                        ))}
                     </div>

                  </div>

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

                  {keyFeatures &&
                     <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                        <ul className="space-y-2">
                           {keyFeatures && keyFeatures.map((feature, index) => (
                              <li key={index} className="text-base text-gray-700 before:content-['\2713'] before:mr-2 before:text-primary">
                                 {feature.type === "root" ? feature.children[0].children[0].value : ""}
                              </li>
                           ))}
                        </ul>
                     </div>
                  }


                  <div className="mt-6">
                     <hr className="w-full border-b border-gray-300" />
                     <div className="flex items-center my-6">
                        <AddButton product={product} />
                     </div>
                     <hr className="w-full border-b border-gray-300" />
                  </div>

                  <div className="mt-6">
                     <PrelineAccordion product={product} specifications={specifications as Specifications[]} manuals={fileNames as FileNames[]} included={includedItems} />
                  </div>
               </div>
            </div>

         </div>
      </ProductProvider>
   )
}