"use client";
import CartDrawer, { useDrawer } from "./CartDrawer";
import { useCart, useShop } from "@shopify/hydrogen-react";
import Link from "next/link";
import CartDrawerDetail from "./CartDrawerDetail";
import Image from "next/image";
import { ShoppingBag, AlignJustify, User, Search, ChevronDown, Unlink2 } from "lucide-react";
import { main_navigation } from "@/lib/constants";
import React, { useState, useEffect, useRef } from "react";
import { ProductPricing } from "../ProductPricing";

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

interface SearchResult {
  queries: {
    text: string;
  }[];
  products: {
    id: string;
    title: string;
    handle: string;
    images: {
      nodes: {
        id: string;
        url: string;
      }[];
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    compareAtPriceRange: {
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };  
  }[];
  collections: {
    id: string;
    title: string;
    handle: string;
  }[];
  articles: {
    id: string;
    title: string;
    handle: string;
  }[];
  pages: {
    id: string;
    title: string;
    handle: string;
  }[];
}

export default function Header() {
  const shop = useShop();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  const closeDropdown = () => {
    setDropdownOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const tiemOutId = setTimeout(() => {
      if (searchQuery) {
        setIsLoading(true);

        const fetchSearchResults = async () => {
          const search_query = `
                 query PredictiveSearch {
                    predictiveSearch(query: "${searchQuery}") {
                      queries{
                        text
                      }
                      collections{
                        id
                        title
                        handle
                      }
                      products{
                        id
                        title
                        handle
                        images(first: 1){
                          nodes{
                            id
                            url
                          }
                        }
                        priceRange{
                          minVariantPrice{
                            amount
                            currencyCode
                          }
                        }
                        compareAtPriceRange{
                          maxVariantPrice{
                            amount
                            currencyCode
                          }
                          minVariantPrice{
                            amount
                            currencyCode
                          }
                        }
                      }
                      articles{
                        id
                        title
                        handle
                      }
                      pages{
                        id
                        title
                        handle
                      }
                    }
                 }
              `;

          try {
            const response = await fetch(shop.getStorefrontApiUrl(), {
              method: "POST",
              headers: shop.getPublicTokenHeaders({ contentType: "json" }),
              body: JSON.stringify({ query: search_query })
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.statusText}`);
            }

            const { data } = await response.json();
            setSearchResults(data.predictiveSearch);
            setIsLoading(false);
            setDropdownOpen(true);
            console.log(data.predictiveSearch)
          } catch (error) {
            console.error("Failed to fetch search results:", error);
          }
        }

        fetchSearchResults();
      } else {
        setSearchResults(null);
      }
    }, 1000);

    return () => clearTimeout(tiemOutId);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !(searchRef.current as any).contains(event.target)) {
        setSearchQuery('');  // Clear the input when clicking outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        <div className="hidden lg:inline-flex lg:flex-1 lg:items-center lg:justify-center">
          {/* search bar for desktop screens */}
          <div
            id="json-example-with-tab-filter-in-dropdown-tab-preview-markup"
            className="w-full max-w-3xl"
          >
            <div className="max-w-2xl w-full">
              {/* SearchBox */}
              <div
                className="relative"
              >
                <div className="relative" ref={searchRef}>
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-90 ps-3.5">
                    <svg
                      className="flex-shrink-0 size-4 text-gray-400"
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
                      <circle cx={11} cy={11} r={8} />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <input
                    className="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none text-gray-900"
                    type="text"
                    placeholder="Search For Products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={() => { console.log('search box clicked !!, here we will use prefetch query to fetch data from server') }}
                  />
                </div>
                {/* SearchBox Dropdown */}
                <div
                  className={`absolute z-50 w-full bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] ${searchResults && isDropdownOpen ? 'block' : 'hidden'}`}
                >
                  <div
                    className="max-h-[300px] p-2 rounded-b-xl overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
                    id="search-data"
                  >
                    {loading ? (
                      <p>Loading....</p>

                    ) : isDropdownOpen && searchResults && (
                      <div className="flex flex-col gap text-black">
                        {searchResults.products.length > 0 && (
                          <ul className="flex flex-col gap-2">
                             <h4 className="text-lg font-semibold">Products</h4>
                            {searchResults.products.map(product => (
                            <li key={product.id} className="p-2 text-black">
                              <Link href={`/products/${product.handle}`} onClick={closeDropdown}>
                                <div className="flex items-center gap-x-2">
                                  <Image src={product.images.nodes[0].url} alt={`${product.title}`} width={200} height={200} className="w-16 h-16 object-cover" />
                                  <div>
                                    <p className="font-bold">{product.title}</p>
                                    <p className={product.compareAtPriceRange &&  product.compareAtPriceRange.minVariantPrice.amount !== '0.0' ? 'font-bold text-sm text-gray-500' : 'text-sm text-gray-500'}>{product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode} {" "}
                                    { product.compareAtPriceRange &&  product.compareAtPriceRange.minVariantPrice.amount !== '0.0' && <span className="line-through inline-block"> {product.compareAtPriceRange.minVariantPrice.amount} {product.compareAtPriceRange.minVariantPrice.currencyCode}</span>}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                          </ul> 
                        )}
                        {searchResults.collections.length > 0 && (
                          <ul>
                            <h4 className="text-lg font-semibold">Collections</h4>
                            {searchResults.collections.map(collection => (
                              <li key={collection.id}>
                                <Link href={`/collections/${collection.handle}`} onClick={closeDropdown}>
                                  {collection.title}
                                </Link>
                              </li>

                            ))}
                          </ul>
                        )}
                        {searchResults.articles.length > 0 && (
                          <ul>
                            <h4 className="text-lg font-semibold">Blog Articles</h4>
                            {searchResults.articles.map(article => (
                              <li key={article.id}>
                                <Link href={`/blogs/${article.handle}`} onClick={closeDropdown}>
                                  {article.title}
                                </Link>
                              </li>

                            ))}
                          </ul>
                        )}
                        {searchResults.pages.length > 0 && (
                          <ul>
                            <h4 className="text-lg font-semibold">Pages</h4>
                            {searchResults.pages.map(page => (
                              <li key={page.id}>
                                <Link href={`/pages/${page.handle}`} onClick={closeDropdown}>
                                  {page.title}
                                </Link>
                              </li>

                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* End SearchBox Dropdown */}
              </div>
              {/* End SearchBox */}
            </div>
          </div>

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
          <button className="relative flex items-center justify-center w-8 h-8 lg:hidden">
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
    <div className="flex-grow z-20 hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
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
        <div className="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-20 sm:mt-12 top-full start-0 min-w-60 bg-primary shadow-md rounded-lg py-2 sm:px-2 before:absolute">
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