import { useCart, CartLineProvider, CartCost, useCartLine, CartLineQuantityAdjustButton, CartLineQuantity, CartCheckoutButton, ShopPayButton } from "@shopify/hydrogen-react";
import Link from "next/link";

export default function CartDrawerDetail(){
     const { lines, checkoutUrl } = useCart();

     console.log(lines);

     if(lines && lines.length === 0){
        return <div className="p-4 text-center">Your cart is empty.</div>;
     }
    return(
        <form className="grid grid-cols-1 grid-rows-[1fr_auto] h-[calc(100vh-6rem)]">
      <section
        aria-labelledby="cart-contents"
        className="px-4 pb-4 overflow-auto transition md:px-12"
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
        className="p-4 border-t md:px-12"
      >
        <h2 id="summary-heading" className="text-lg font-bold">Order summary</h2>
        <div className="my-4">
          <CartCost amountType="subtotal" />
          <CartCost amountType="total" />
        </div>
        <div className="flex gap-4">
          <CartCheckoutButton className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Checkout</CartCheckoutButton>
        </div>
      </section>
    </form>
    )
}

function CartLineItem() {
    const { id, merchandise } = useCartLine();
  
    return (
      <li className="flex gap-4 items-center">
        <div className="flex-1">
          <h3 className="font-bold">{merchandise && merchandise.product?.title}</h3>
          
        </div>
        <div className="flex items-center gap-2">
          <CartLineQuantityAdjustButton adjust="decrease" className="p-2 border rounded">
            -
          </CartLineQuantityAdjustButton>
          <CartLineQuantity className="mx-2" />
          <CartLineQuantityAdjustButton adjust="increase" className="p-2 border rounded">
            +
          </CartLineQuantityAdjustButton>
        </div>
      </li>
    );
  }
  
  
  