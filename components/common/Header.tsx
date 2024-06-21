"use client";
import CartDrawer, { useDrawer } from "./CartDrawer";
import { useCart } from "@shopify/hydrogen-react";
import Link from "next/link";
import CartDrawerDetail from "./CartDrawerDetail";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export default function Header(){
   const { isOpen, openDrawer, closeDrawer } = useDrawer();

   return(
    <div className={`bg-primary text-white px-4 md:px-6 lg:px-8`}>   
        <header
        role="banner"
        className={`flex items-center justify-between  gap-4  max-w-7xl lg:max-w-screen-2xl mx-auto h-16 py-6 md:py-8 lg:py-12 sticky z-40 top-0 w-full leading-none antialiased transition shadow-sm`}
      >
        <div className="flex gap-12">
          <Link className="font-bold" href="/">
            <Image src="https://cdn.shopify.com/s/files/1/0632/6331/0018/files/new_GW_logo_-_2022-white.png?v=1700688522"
                   alt="greenworks-logo"
                   width={2854}
                   height={588}
                   className="w-48 md:w-64 h-full"
                   priority
            />

          </Link>
        </div>

        <button
          onClick={openDrawer}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconBag />
          <CartBadge />
        </button>
      </header>
    <CartDrawer open={isOpen} onClose={closeDrawer}>
        <CartDrawerDetail />
    </CartDrawer>
    </div>
   )

}

function IconBag() {
    return (
      <ShoppingBag size={48} strokeWidth={1.5} className="w-6 h-6" />
    );
  }
  
  function CartBadge() {
    const { lines } = useCart();

    return (
      <div
        className={`text-white bg-secondary absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
      >
        <span>{lines ? lines.length : 0}</span>
      </div>
    );
  }