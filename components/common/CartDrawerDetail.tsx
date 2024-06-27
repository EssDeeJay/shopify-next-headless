import { useCart, CartLineProvider, CartCost, useCartLine, CartLineQuantityAdjustButton, CartLineQuantity, CartCheckoutButton, ShopPayButton, useMoney } from "@shopify/hydrogen-react";
import Link from "next/link";
import Image from "next/image";
import formatMoney from "@/utilities/formatMoney";
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartDrawerDetail() {
  const { lines, checkoutUrl } = useCart();

  if (lines && lines.length === 0) {
    return <div className="p-4 text-center">Your cart is empty.</div>;
  }
  return (
    <form className="grid grid-cols-1 grid-rows-[1fr_auto] h-[calc(100vh-6rem)]">
      <section
        aria-labelledby="cart-contents"
        className="px-4 pb-4 overflow-auto transition md:px-6"
      >
        <ul className="grid gap-6 md:gap-10">
          {lines && lines.map((line) => (
            <CartLineProvider key={line?.id} line={line!}>
              <CartLineItem />
            </CartLineProvider>
          ))}
        </ul>
      </section>
      <section
        aria-labelledby="summary-heading"
        className="p-4 border-t md:px-6"
      >
        <div className="my-4">
          <div className="flex items-center justify-between font-bold">
            <span>Subtotal:</span>
            <CartCost amountType="subtotal" />
          </div>
          <div className="mb-4 mt-1 text-gray-500">
            <p className="text-sm">Shipping and Taxes are calculated at checkout.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <CartCheckoutButton className="flex-1 bg-primary text-white p-2 rounded hover:bg-secondary font-bold">Checkout</CartCheckoutButton>
        </div>
      </section>
    </form>
  )
}

function CartLineItem() {
  const { id, merchandise, quantity } = useCartLine();
  const linePrice = Number(merchandise?.price?.amount ?? 0) * Number(quantity ?? 1);
  const linePriceString = linePrice.toString();

  return (
    <li className="flex gap-4 items-center">
      <div className="flex bg-gray-50 p-2">
        <Image src={merchandise?.image?.url ?? "https://dummyimage.com/80x80.png&text=No+Image"}
          alt={merchandise?.product?.title ?? "Image coming soon"}
          height={120}
          width={120}
          className="object-cover rounded mix-blend-multiply"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk"
        />
      </div>
      <div className="flex-1">
        <Link href={`/products/${merchandise?.product?.handle}`}>
            <h4 className="font-bold text-base">{merchandise && merchandise.product?.title}</h4>
        </Link>
       

        <div className="flex items-center gap-2 my-2">
          <div className="inline-block">
            <div className="inline-flex items-center w-full border-2 border-gray-300 h-full focus-within:border-black py-1">
              <CartLineQuantityAdjustButton adjust="decrease" className="text-black hover:text-gray-500 px-2">
                <Minus strokeWidth={1.5} size={20} className="h-4 w-4" />
              </CartLineQuantityAdjustButton>
              <CartLineQuantity className="mx-2 flex-auto w-[2.5em] text-center" />
              <CartLineQuantityAdjustButton adjust="increase" className="text-black hover:text-gray-500 px-2">
                <Plus strokeWidth={1.5} size={20} className="h-4 w-4" />
              </CartLineQuantityAdjustButton>
            </div>
          </div>

          <CartLineQuantityAdjustButton adjust="remove" className="text-red-700">
            <Trash2 strokeWidth={1.5} size={20} className="h-6 w-6" />
          </CartLineQuantityAdjustButton>
        </div>

      </div>
      <div className="flex items-center gap-2">
        <dl className="m-0 flex">
          <dd className="m-0 font-bold">
            {formatMoney({ amount: linePriceString && linePriceString, currencyCode: merchandise?.price?.currencyCode })}
          </dd>
        </dl>
      </div>
    </li>
  );
}


