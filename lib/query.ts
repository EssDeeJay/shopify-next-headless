export const SHOP_QUERY = `
query {
  shop {
    name
    id
  }
}`;

export const PRODUCT_QUERY = `
 query{
    products(first: 10){
        edges{
            node{
                id
                title
                handle
            }
        }
    }
 }
`;

export const FEATURED_COLLECTION_QUERY = `
query {
  collection(handle: "lawn-mowers-1"){
    id
    title
    products(first: 100, sortKey: BEST_SELLING) {
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
        }
      }
    }
  }
}
`;