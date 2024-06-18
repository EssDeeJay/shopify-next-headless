import { getStorefrontApiUrl, privateHeaders } from "@/lib/client";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";

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
                price {
                  amount
                  currencyCode
                }
              }
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
            <div>
                Product Information Below.
            </div>
            <div>
               {data.product.title}
               <br/>
               {data.product.description}
               <br/>
               {data.product.variants.edges[0].node.title}
               <br/>
               {data.product.variants.edges[0].node.price.amount} - {data.product.variants.edges[0].node.price.currencyCode}
               <br/>
               {data.product.variants.edges[0].node.quantityAvailable ? data.product.variants.edges[0].node.quantityAvailable : "Out of Stock"} 
               <br/>
            </div>
        </main>
    )
}