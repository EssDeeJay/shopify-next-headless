import { createStorefrontClient } from "@shopify/hydrogen-react";

// Suggested code may be subject to a license. Learn more: ~LicenseLog:329558615.
export const client = createStorefrontClient({
  storeDomain: process.env.PUBLIC_STORE_DOMAIN,
  storefrontApiVersion: "2024-04",
  privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN,
  publicStorefrontToken: process.env.PUBLIC_STOREFRONT_API_TOKEN
});

export const storefrontDomain = client.getShopifyDomain();
export const getStorefrontApiUrl = client.getStorefrontApiUrl();
export const privateHeaders = client.getPrivateTokenHeaders();
export const publicHeaders = client.getPublicTokenHeaders();