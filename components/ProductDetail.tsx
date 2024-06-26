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

export default function ProductDetail({product} : {product: Product}){
  const media = flattenConnection(product.media) as ProductMedia[];
  const mediaImages = media.map((media: ProductMedia) => media.image.url);

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

               {mediaImages.map((image, index) => (
                  <Image key={index} src={image} alt={product.title} height={800} width={800} className="" priority={index && index === 0 ? true : false} placeholder="blur" blurDataURL={image} />
               ))}
        </div>
      </ProductProvider>   
    )
}