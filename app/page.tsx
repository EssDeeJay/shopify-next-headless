"use client";
import React, { useState , useEffect} from "react";
import { FEATURED_COLLECTION_QUERY } from "@/lib/query";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";
import ProductCard from "../components/ProductCard";
import { flattenConnection, useShop } from "@shopify/hydrogen-react";

export default function Page() {

  const [products, setProducts] = useState<Product[]>([]);
  const shop = useShop();

  useEffect(() => {
      
      const fetchData = async () => {
        try {
          const response = await fetch(shop.getStorefrontApiUrl(), {
            body: JSON.stringify({
              query: FEATURED_COLLECTION_QUERY
            }),
            headers: shop.getPublicTokenHeaders({contentType: "json"}),
            method: "POST"
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.statusText}`);
          }
  
          const { data }  = await response.json();

          if (!data || !data.collection || !data.collection.products) {
            console.error("No products data available");
            return; // Or set some state indicating the error
          }
          
          const flattenedProducts = flattenConnection(data.collection.products) as Product[];
          setProducts(flattenedProducts);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      };

      fetchData();

  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <h1 className="text-4xl font-bold">Featured Products</h1>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">             
                {products.map((product: Product) => (
                  <ProductCard data={product} key={product.id} />
                ))}     
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
