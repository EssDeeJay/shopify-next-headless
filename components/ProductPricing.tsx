"use client";
import {ProductPrice } from '@shopify/hydrogen-react';
import type {Product} from '@shopify/hydrogen-react/storefront-api-types';

export function ProductPricing({product}: {product: Product}) {

  return (
      <div className='flex'>
       <ProductPrice data={product} priceType="regular" valueType="min" className={product.compareAtPriceRange.minVariantPrice.amount ? 'font-bold text-red mr-2' : ''}/>
       { product.compareAtPriceRange.maxVariantPrice.amount !== '0.0' ? <ProductPrice data={product} priceType="compareAt" valueType="min"  className='line-through' /> : null }
      </div>  
  );
}
