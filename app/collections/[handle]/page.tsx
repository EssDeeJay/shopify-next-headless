"use client";
import React, {useState, useEffect } from "react";
import { useShop, flattenConnection } from "@shopify/hydrogen-react";
import type { Collection, Product } from "@shopify/hydrogen-react/storefront-api-types";
import ProductCard from "@/components/ProductCard";


export default function Page({params} : {params: {handle: string}}){

    const [collection, setCollection] = useState<Collection | null>(null);
// Suggested code may be subject to a license. Learn more: ~LicenseLog:305197809.
    const [products, setProducts] = useState<Product[]>([]);
    
    const shop = useShop();

    useEffect(() => {
        if(params.handle){
            const fetchCollection = async () => {
                const collection_query = `
                query getProductsInCollection {
                    collection(handle: "${params.handle}") {
                      id
                      title
                      description
                      products(first: 50, sortKey: BEST_SELLING) {
                        edges {
                          node {
                            id
                            title
                            handle
                            vendor
                            availableForSale
                            images(first: 1) {
                              edges {
                                node {
                                  id
                                  url
                                  width
                                  height
                                  altText
                                }
                              }
                            }
                            priceRange {
                              minVariantPrice {
                                amount
                                currencyCode
                              }
                              maxVariantPrice {
                                amount
                                currencyCode
                              }
                            }
                            compareAtPriceRange {
                                maxVariantPrice {
                                    amount
                                    currencyCode
                                }
                                minVariantPrice {
                                    amount
                                    currencyCode
                                }
                            }
                          }
                        }
                      }
                    }
                  }
                `;

                try{
                    const response = await fetch(shop.getStorefrontApiUrl(), {
                        method: "POST",
                        headers: shop.getPublicTokenHeaders({contentType: "json"}),
                        body: JSON.stringify({query: collection_query})
                    });

                    if(!response.ok){
                        throw new Error(`HTTP error! status: ${response.statusText}`);
                    }

                    const {data}: {data: {collection: Collection}} = await response.json();
                    setCollection(data.collection);
                    if(data.collection.products.edges.length === 0){
                        throw new Error("No products found in the collection.")
                    }else{
                        const flattenedProducts = flattenConnection(data.collection.products) as Product[];
                        setProducts(flattenedProducts);
                    }       

                }catch(error){
                    console.error("Failed to fetch collection:", error);
                }
            }

            fetchCollection();
        }
    }, [params.handle])

    return (
        <main className="flex min-h-screen flex-col">
           <div className="px-4 sm:px-6 lg:px-8">
             <div className="max-w-7xl xl:max-w-screen-2xl mx-auto">
                <div className="py-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{collection?.title}</h1>
                <p className="mb-4">{collection?.description}</p>
                </div>            
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                  {
                    products.map((product: Product) => (
                      <ProductCard data={product} key={product.id} />
                    ))
                  }
                </div>
            </div>
           </div>
            
        </main>
    )
}