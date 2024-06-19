
import { getStorefrontApiUrl, privateHeaders } from "@/lib/client";
import { FEATURED_COLLECTION_QUERY } from "@/lib/query";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";
import ProductCard from "../components/ProductCard";
import { flattenConnection } from "@shopify/hydrogen-react";

export default async function Page() {
 
  const featuredCollectionProducts = await fetch(getStorefrontApiUrl, {
    body: JSON.stringify({
      query: FEATURED_COLLECTION_QUERY
    }),
    headers: privateHeaders,
    method: "POST"
  });

  if(!featuredCollectionProducts.ok) {
    throw new Error(featuredCollectionProducts.statusText);
  }

  const { data : featuredCollection } = await featuredCollectionProducts.json();

  const flattenedProducts = flattenConnection(featuredCollection.collection.products) as Product[];

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <h1 className="text-4xl font-bold">Featured Products</h1>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">             
                {flattenedProducts.map((product: Product) => (
                  <ProductCard data={product} key={product.id} />
                ))}     
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
