"use client";
import CartDrawer, { useDrawer } from "./CartDrawer";
import { useCart } from "@shopify/hydrogen-react";
import Link from "next/link";
import CartDrawerDetail from "./CartDrawerDetail";
import Image from "next/image";
import { ShoppingBag, AlignJustify, User, Search, ChevronDown } from "lucide-react";
import { main_navigation } from "@/lib/constants";
import React from "react";

interface NavItem {
  label: string;
  href: string;
  hasChildren: boolean;
  children?: SubNavItem[];
}

interface SubNavItem {
  label: string;
  href: string;
  hasSubchildren: boolean;
  subchildren?: SubNavItemDetail[];
  image?: string;  // Optional since not all sub-nav items have images
}

interface SubNavItemDetail {
  label: string;
  href: string;
  image: string;
}

export default function Header() {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <div className={`bg-primary text-white px-4 md:px-6 lg:px-8`}>
      <header
        role="banner"
        className={`flex items-center justify-between  gap-4  max-w-7xl lg:max-w-screen-2xl mx-auto h-8 py-6 md:py-8 lg:py-12 sticky z-40 top-0 w-full leading-none antialiased transition`}
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
        <nav className="flex justify-center items-center py-2 max-w-7xl xl:max-w-screen-2xl w-full relative mx-auto" aria-label="primary">
          <ul className="flex justify-between items-center" aria-label="primary">
            {/* load data from main_avigation */}
            <div className="flex items-center w-full gap-x-8 hs-collapse">
              {main_navigation.map((navItem) => (
                <NavItem key={navItem.label} item={navItem} />
              ))}
            </div>
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
          <div className="hs-accordion-group flex flex-col gap-8 mt-4">
            {main_navigation.map((item, index) => (
              <div key={index} className="hs-accordion" id={`hs-basic-nested-heading-${index}`} aria-labelledby={`hs-basic-nested-heading-${index}`}>
                {item.hasChildren ? (
                  <button className="hs-accordion-toggle inline-flex justify-between items-center w-full font-bold text-start text-white text-2xl" aria-controls={`hs-basic-nested-collapse-${index}`}>
                    {item.label}
                    <svg
                      className="hs-accordion-active:hidden block size-3.5"
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
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <svg
                      className="hs-accordion-active:block hidden size-3.5"
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
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                ) : (
                  <Link href={item.href} data-hs-overlay="#mobile-menu" className="inline-flex justify-between items-center w-full font-bold text-start text-white text-2xl">
                    {item.label}
                  </Link>
                )}

                <div className="hs-accordion-content overflow-hidden transition-[height] duration-300 hidden" aria-labelledby={`hs-basic-nested-heading-${index}`}>
                  {item.hasChildren && (
                    <div className="hs-accordion-group flex flex-col gap-4 mt-4">
                      {item.children?.map((subitem: SubNavItem, index) => (
                        <div className="hs-accordion" id={`hs-basic-nested-sub-heading-${index}`} key={index}>
                          {subitem.hasSubchildren ? (
                            <button className="hs-accordion-toggle inline-flex justify-between items-center w-full font-bold text-start text-white text-2xl" aria-controls={`hs-basic-nested-sub-collapse-${index}`}>
                              {subitem.label}
                              <svg
                                className="hs-accordion-active:hidden block size-3.5"
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
                                <path d="M5 12h14" />
                                <path d="M12 5v14" />
                              </svg>
                              <svg
                                className="hs-accordion-active:block hidden size-3.5"
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
                                <path d="M5 12h14" />
                              </svg>
                            </button>
                          ) : (
                            <Link href={subitem.href} data-hs-overlay="#mobile-menu" className="">
                              {subitem.label}
                            </Link>
                          )}

                          <div id={`hs-basic-nested-sub-collapse-${index}`} className="hs-accordion-content overflow-hidden transition-[height] duration-300 hidden" aria-labelledby={`hs-basic-nested-sub-heading-${index}`}>
                            {subitem.hasSubchildren && (
                              <ul className="subchildren-group flex flex-col gap-2 mt-4">
                                {subitem.subchildren?.map((item: SubNavItemDetail, index: number) => (
                                  <li key={index}>
                                    <Link href={item.href} data-hs-overlay="#mobile-menu">
                                      {item.label}
                                    </Link>
                                  </li>

                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

          </div>
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
  const { totalQuantity, status } = useCart();

  return (
    <div
      className={`text-white bg-secondary absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{status && status === "idle" ? totalQuantity : ""}</span>
    </div>
  );
}

const NavItem: React.FC<{ item: NavItem }> = ({ item }) => {
  return (
    <div className="flex-grow z-40 hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
      {item.hasChildren ? (<button className=" text-base xl:text-lg font-bold text-white hover:border-b-2 hover:border-white py-2 inline-flex items-center gap-x-2" aria-label="Mega menu dropdown link">
        {item.label}
        <span><ChevronDown strokeWidth={1.5} size={24} className="w-4 h-4" /></span>
      </button>)
        :
        (<Link href={item.href} className="text-base xl:text-lg font-bold text-white hover:border-b-2 hover:border-white py-2">
          {item.label}
        </Link>)
      }

      {item.hasChildren && (
        <div className="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-10 sm:mt-12 top-full start-0 min-w-60 bg-primary shadow-md rounded-lg py-2 sm:px-2 before:absolute">
          <div className="p-4 grid grid-cols-4 gap-8">
            {item.children?.map(subItem => (
              <SubNavItem key={subItem.label} item={subItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SubNavItem: React.FC<{ item: SubNavItem }> = ({ item }) => {
  return (
    <div className="space-y-2">
      <Link href={item.href} className="text-lg font-extrabold">
        {item.label}
      </Link>
      {item.hasSubchildren && (
        <div className="grid grid-cols-2 gap-2">
          {item.subchildren?.map(detail => (
            <div key={detail.label} className="text-xs">
              <Link href={detail.href} className="text-center">
                <img src={detail.image} alt={detail.label} className="w-48 h-auto object-cover" />
                <p>{detail.label}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}