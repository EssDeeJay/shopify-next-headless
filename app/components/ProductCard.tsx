import type { Product } from "@shopify/hydrogen-react/storefront-api-types";
import Image from "next/image";
import { flattenConnection } from "@shopify/hydrogen-react";

export default function ProductCard({data} : {data: Product}){
    // code to display the product card with the image and title
    const featuredImage = flattenConnection(data.images);
    return(
        <div className="group relative">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-75 lg:aspect-w-7 lg:aspect-h-8">
                <Image 
                    src={featuredImage[0] ? featuredImage[0].url : "https://placehold.co/400x400"}
                    alt={data.title}
                    width={400}
                    height={400}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk"
                />
            </div>

            <div className="mt-4">
                <h3 className="text-sm text-gray-700">
                    <a href={`/products/${data.handle}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {data.title}
                    </a>
                </h3>
                
            </div>
        </div>
    )
}