// common queries we use on the storefront to fetch the data we need;

export const FEATURED_COLLECTION_QUERY = `
query {
  collection(handle: "lawn-mowers-1"){
    id
    title
    products(first: 12, sortKey: BEST_SELLING) {
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