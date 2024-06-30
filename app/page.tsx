"use client";
import React, { useState, useEffect } from "react";
import { FEATURED_COLLECTION_QUERY } from "@/lib/query";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";
import { flattenConnection, useShop } from "@shopify/hydrogen-react";
import ProductCarousel from "@/components/ProductCarousel";

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
          headers: shop.getPublicTokenHeaders({ contentType: "json" }),
          method: "POST"
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.statusText}`);
        }

        const { data } = await response.json();

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
      <div className="flex-1 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:max-w-screen-2xl">
          <div className="py-12">
            <ProductCarousel products={products} carouselTitle="Featured Products" carouselLink="/collections/lawn-mowers-1" />
          </div>
        </div>
      </div>
    </main>
  );
}
