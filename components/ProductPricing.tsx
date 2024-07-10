"use client";
import { ProductPrice } from '@shopify/hydrogen-react';
import type {Product} from '@shopify/hydrogen-react/storefront-api-types';

export function ProductPricing({product}: {product: Product}) {

  return (
      <div className="flex">
        <h2 className="sr-only">Product Price</h2>
       <ProductPrice data={product} priceType="regular" valueType="min" className={product.compareAtPriceRange.minVariantPrice.amount != '0.0' ? 'text-red-700 mr-2 text-3xl tracking-tight' : 'text-3xl text-black tracking-tight'} />
       { product.compareAtPriceRange.maxVariantPrice.amount !== '0.0' ? <ProductPrice data={product} priceType="compareAt" valueType="min"  className='line-through text-3xl tracking-tight font-medium' /> : null }
      </div>  
  );
}
