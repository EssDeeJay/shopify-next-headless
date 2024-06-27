"use client";
import React, { useState, useEffect } from "react";
import { useShop } from "@shopify/hydrogen-react";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";
import ProductDetail from "@/components/ProductDetail";

export default function Page({params}: {params: {handle: string}}){
    const [product, setProduct] = useState<Product | null>(null);
    const shop = useShop();

useEffect(() => {
        if (params.handle) { // Ensure handle is not undefined
            const fetchProduct = async () => {
                const product_query = `
                    query getProductByHandle {
                        product(handle: "${params.handle}") {
                            id
                            title
                            description
                            variants(first: 3) {
                                edges {
                                    cursor
                                    node {
                                        id
                                        title
                                        sku
                                        quantityAvailable
                                        selectedOptions {
                                            value
                                            name
                                        }
                                    }
                                }
                            }
                            priceRange {
                                maxVariantPrice {
                                    amount
                                    currencyCode
                                }
                                minVariantPrice {
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
                            media(first: 20){
                                edges{
                                  node{
                                    mediaContentType
                                    alt
                                    ...mediaFieldsByType
                                  }
                                }
                            }
                            keyFeatures: metafield(namespace: "custom", key: "key_features"){
                                value
                                type
                            }
                        }
                    }

                    fragment mediaFieldsByType on Media {
                        ... on ExternalVideo {
                          id
                          host
                          originUrl
                        }
                        ... on MediaImage{
                          image{
                            url
                          }
                        }
                      }
                `;

                try {
                    const response = await fetch(shop.getStorefrontApiUrl(), {
                        method: "POST",
                        headers: shop.getPublicTokenHeaders({ contentType: "json" }),
                        body: JSON.stringify({ query: product_query })
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.statusText}`);
                    }

                    const { data }: { data: { product: Product } } = await response.json();
                    setProduct(data.product);
                } catch (error) {
                    console.error("Failed to fetch product:", error);
                }
            };

            fetchProduct();
        }
    }, [params.handle]); // Dependency array includes handle to re-fetch if it changes

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex min-h-screen flex-col">
            <ProductDetail product={product} />
        </main>
    )
}