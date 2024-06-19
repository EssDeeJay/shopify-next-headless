import { getStorefrontApiUrl, privateHeaders } from "@/lib/client";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";
import ProductDetail from "@/components/ProductDetail";

export default async function Page({params} : {params: {handle: string}}){
    
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
                quantityAvailable
                selectedOptions{
                  value
                  name
                }
              }
            }
          }
          priceRange{
            maxVariantPrice{
              amount
              currencyCode
            }
            minVariantPrice{
              amount
              currencyCode
            }
          }
          compareAtPriceRange{
            maxVariantPrice{
              amount
              currencyCode
            }
            minVariantPrice{
              amount
              currencyCode
            }
          }
        }
      }
    `;

    const product = await fetch(getStorefrontApiUrl, {
        body: JSON.stringify({
            query: product_query
        }),
        headers: privateHeaders,
        method: "POST"
    });
    
    if(!product.ok) {
        throw new Error(product.statusText);
    }

    const { data } : {data: {product: Product}} = await product.json();

    return (
        <main className="flex min-h-screen flex-col">
            <ProductDetail product={data.product} />
        </main>
    )
}