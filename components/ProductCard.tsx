import type { Product } from "@shopify/hydrogen-react/storefront-api-types";
import Image from "next/image";
import { flattenConnection } from "@shopify/hydrogen-react";
import formatMoney from "@/utilities/formatMoney";

export default function ProductCard({data} : {data: Product}){
    // code to display the product card with the image and title
    const featuredImage = flattenConnection(data.images);
    const soldOut = data.availableForSale === false;
    

    return(
        <div className="group relative">
            {soldOut && 
              <div className="z-10 absolute top-0 left-0 bg-black opacity-75 flex items-center justify-center text-white font-semibold text-sm py-1 px-2">
                Sold Out
              </div>
            }
            <div className="w-full flex aspect-square bg-gray-50 rounded-lg overflow-hidden group-hover:opacity-75">
                <Image 
                    src={featuredImage[0] ? featuredImage[0].url : "https://dummyimage.com/400x400.png&text=Image+Coming+Soon"}
                    alt={data.title}
                    width={400}
                    height={400}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk"
                    className="object-contain object-center mix-blend-multiply"
                />
            </div>

            <div className="mt-4">
                <h3 className="text-sm text-gray-700">
                    <a href={`/products/${data.handle}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {data.title}
                    </a>
                </h3>
                <p className="text-sm font-semibold">{formatMoney({amount: data.priceRange.minVariantPrice.amount, currencyCode: data.priceRange.minVariantPrice.currencyCode})}
                {data.compareAtPriceRange.minVariantPrice.amount !== '0.0' && (
                    <s className="text-sm ml-2 text-gray-500">{formatMoney({amount: data.compareAtPriceRange.minVariantPrice.amount, currencyCode: data.compareAtPriceRange.minVariantPrice.currencyCode})}</s>
                )}
                </p>
            </div>
        </div>
    )
}