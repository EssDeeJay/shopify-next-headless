import React, { useRef } from "react";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function ProductCarousel({products, carouselTitle, carouselLink} : {products: Product[], carouselTitle?: string, carouselLink?: string}){

  const carouselRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: any, scrollLeft: any;

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    isDown = true;
    startX = e.pageX - carouselRef.current!.offsetLeft;
    scrollLeft = carouselRef.current!.scrollLeft;
    carouselRef.current!.classList.add("dragging");
  };

  const stopDragging = () => {
    isDown = false;
    carouselRef.current!.classList.remove("dragging");
  }

  const handleMouseMove = (e: MouseEvent) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current!.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    carouselRef.current!.scrollLeft = scrollLeft - walk;
  }

  const scrollBySlide = (direction: 'left' | 'right') => {
    const scrollAmount = direction === 'left' ? -carouselRef.current!.clientWidth : carouselRef.current!.clientWidth;
    carouselRef.current!.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

    return(
      <>
      {carouselTitle && 
       <div className="relative">
       <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">{carouselTitle}</h1>
        <Link href={carouselLink ? carouselLink : '/collections/all'} className="underline text-primary font-bold">
          View All
        </Link>
        </div>
      </div>
      } 
      <div className="relative w-full select-none">
         <div className="overflow-hidden relative">
            <div  ref={carouselRef}  className="flex snap-x snap-mandatory scroll-smooth overflow-x-auto py-4 space-y-2" id="product-carousel" onMouseDown={startDragging} onMouseLeave={stopDragging} onMouseUp={stopDragging} onMouseMove={(e: any) => handleMouseMove(e)}
              style={{ cursor: 'grab', paddingBottom: '20px'}}
            >
                 {
                   products.map((product) => (
                    <div key={product.id} className="snap-center shrink-0 w-1/2 lg:w-1/3 xl:w-1/4 inline-block px-4">
                      <ProductCard data={product} />
                    </div>
                   ))
                 }
            </div>
         </div>
         <button 
        onClick={() => scrollBySlide('left')}
        className="absolute -left-[2%] z-10 bg-gray-200 p-2 text-xl top-[40%] -translate-y-1/2 hidden lg:block"
        aria-label="Scroll left"
      >
       <ArrowLeft strokeWidth={1.5} size={24} className="w-6 h-6" />
      </button>
      <button 
        onClick={() => scrollBySlide('right')}
        className="absolute -right-[2%] z-10 bg-gray-200 p-2 text-xl top-[40%] -translate-y-1/2 hidden lg:block"
        aria-label="Scroll right"
      >
        <ArrowRight strokeWidth={1.5} size={24} className="w-6 h-6" />
      </button>
      </div>
    </>
    )
}