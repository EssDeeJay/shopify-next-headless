"use client";
import CartDrawer, { useDrawer } from "./CartDrawer";
import { useCart } from "@shopify/hydrogen-react";
import Link from "next/link";
import CartDrawerDetail from "./CartDrawerDetail";
import Image from "next/image";
import { ShoppingBag, AlignJustify, User, Search, ChevronDown } from "lucide-react";
import { main_navigation } from "@/lib/constants";

export default function Header() {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <div className={`bg-primary text-white px-4 md:px-6 lg:px-8`}>
      <header
        role="banner"
        className={`flex items-center justify-between  gap-4  max-w-7xl lg:max-w-screen-2xl mx-auto h-16 py-6 md:py-8 lg:py-12 sticky z-40 top-0 w-full leading-none antialiased transition`}
      >
        <div className="flex lg:hidden">
          <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm text-white lg:hidden" data-hs-overlay="#mobile-menu">
            <AlignJustify size={24} strokeWidth={1.5} className="w-6 h-6" />
            <span className="sr-only">Menu</span>
          </button>
        </div>
        <div className="flex">
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

        <div className="flex items-center gap-x-2">
          <button
            onClick={openDrawer}
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconBag />
            <CartBadge />
          </button>
          <button className="relative flex items-center justify-center w-8 h-8">
            <User size={24} strokeWidth={1.5} className="w-6 h-6" />
          </button>
          <button className="relative flex items-center justify-center w-8 h-8">
            <Search size={24} strokeWidth={1.5} className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="hidden lg:block">
         <nav className="flex justify-center items-center py-2" aria-label="primary">
           <ul className="flex items-center gap-x-8 font-bold">
              {/* load data from main_avigation */}
              
           </ul>
         </nav>
      </div>
      <CartDrawer open={isOpen} onClose={closeDrawer}>
        <CartDrawerDetail />
      </CartDrawer>

      <div
        id="mobile-menu"
        role="dialog"
        className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-lg w-full z-[80] bg-primary text-white"
        tabIndex={-1}
      >
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
        <Image src="https://cdn.shopify.com/s/files/1/0632/6331/0018/files/new_GW_logo_-_2022-white.png?v=1700688522"
              alt="greenworks-logo"
              width={2854}
              height={588}
              className="w-48 h-full"
              loading="lazy"
            />
          <button
            type="button"
            className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-white hover:font-bold disabled:opacity-50 disabled:pointer-events-none"
            data-hs-overlay="#mobile-menu"
          >
            <span className="sr-only">Close modal</span>
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <p className="text-white">
            Here we will display the mobile menu, so we can take this and make a different component to work on it to make this more cleaner.
          </p>
        </div>
      </div>
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