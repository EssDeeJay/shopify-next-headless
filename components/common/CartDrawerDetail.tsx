import { useCart, CartLineProvider, CartCost, useCartLine, CartLineQuantityAdjustButton, CartLineQuantity, CartCheckoutButton, ShopPayButton, useMoney } from "@shopify/hydrogen-react";
import Link from "next/link";
import Image from "next/image";
import formatMoney from "@/utilities/formatMoney";

export default function CartDrawerDetail(){
     const { lines, checkoutUrl } = useCart();

     if(lines && lines.length === 0){
        return <div className="p-4 text-center">Your cart is empty.</div>;
     }
    return(
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
        <h2 id="summary-heading" className="text-lg font-bold">Order summary</h2>
        <div className="my-4">
          <div className="flex items-center justify-between">
            <span>Subtotal:</span>
            <CartCost amountType="subtotal" />
          </div>
          <div className="my-4">
            <p>Taxes and shipping calculated at checkout.</p>  
          </div>       
        </div>
        <div className="flex gap-4">
          <CartCheckoutButton className="flex-1 bg-primary text-white p-2 rounded hover:bg-secondary">Checkout</CartCheckoutButton>
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
        <div className="flex">
        <Image src={merchandise?.image?.url ?? "https://dummyimage.com/80x80.png&text=No+Image"}
               alt={merchandise?.product?.title ?? "Image coming soon"}
               height={80}
               width={80}
               className="object-cover rounded"
               loading="lazy"
               placeholder="blur"
               blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk"
        />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-base">{merchandise && merchandise.product?.title}</h4>

          <div className="flex items-center gap-2 my-2">
          <CartLineQuantityAdjustButton adjust="decrease" className="p-2 border rounded">
            -
          </CartLineQuantityAdjustButton>
          <CartLineQuantity className="mx-2" />
          <CartLineQuantityAdjustButton adjust="increase" className="p-2 border rounded">
            +
          </CartLineQuantityAdjustButton>
          <CartLineQuantityAdjustButton adjust="remove" className="text-red-700">
            Remove
          </CartLineQuantityAdjustButton>
          </div>
         
        </div>
        <div className="flex items-center gap-2">
           <dl className="m-0 flex">
             <dd className="m-0 font-bold">
               {formatMoney({amount: linePriceString && linePriceString, currencyCode: merchandise?.price?.currencyCode})}
             </dd>      
           </dl>
        </div>
      </li>
    );
  }
  
  
  