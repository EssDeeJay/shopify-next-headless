import type Product from "@shopify/hydrogen-react/storefront-api-types";
import Link from "next/link";

interface Specifications {
  title: string,
  value: string
}

interface FileNames{
  url: URL;
  fileName: string;
}

export default function PrelineAccordion({ product, specifications, manuals, included }: { product: Product, specifications: Specifications[], manuals: FileNames[], included: Array<string> }) {
  return (
    <div className="hs-accordion-group">
      {product.description &&       
      <div
        className="hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl active"
        id="hs-active-bordered-heading-one"
      >
        <button
          className="hs-accordion-toggle hs-accordion-active:text-secondary inline-flex justify-between items-center gap-x-3 w-full font-bold text-start text-black py-6 px-5 text-2xl"
          aria-controls="hs-basic-active-bordered-collapse-one"
        >
          Description
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
        <div
          id="hs-basic-active-bordered-collapse-one"
          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="hs-active-bordered-heading-one"
        >
          <div className="pb-4 px-5">
            <p className="text-gray-600">
              {product.description}
            </p>
          </div>
        </div>
      </div>
      }


      {specifications && 
      <div
        className="hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl"
        id="hs-active-bordered-heading-two"
      >
        <button
          className="hs-accordion-toggle hs-accordion-active:text-secondary inline-flex justify-between items-center gap-x-3 w-full font-bold text-start text-black py-6 px-5 text-2xl"
          aria-controls="hs-basic-active-bordered-collapse-two"
        >
          Specifications
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
        <div
          id="hs-basic-active-bordered-collapse-two"
          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="hs-active-bordered-heading-two"
        >
          <div className="pb-4 px-5">
            <ul className="">
              {specifications && specifications.map((spec, index) => (
                <li key={index} className="flex flex-col md:flex-row pb-4 mb-4 border-b border-gray-200 border-dashed last:pb-0 last:mb-0 gap-x-8 last:border-none">
                  <div className="">
                     <strong>{spec.title}:</strong>
                  </div>
                   <div className="">
                   {spec.value}
                   </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      }

      

      {included &&  <div
        className="hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl"
        id="hs-active-bordered-heading-three"
      >
        <button
          className="hs-accordion-toggle hs-accordion-active:text-secondary inline-flex justify-between items-center gap-x-3 w-full font-bold text-start text-black py-6 px-5 text-2xl"
          aria-controls="hs-basic-active-bordered-collapse-three"
        >
          What's Included
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
        <div
          id="hs-basic-active-bordered-collapse-three"
          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="hs-active-bordered-heading-three"
        >
          <div className="pb-4 px-5">
            <ul className="text-gray-800 dark:text-neutral-200 pl-4">
              {included.map((item, index) => (
                <li key={index} className="list-disc my-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>}

     {manuals && 
      <div
        className="hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl"
        id="hs-active-bordered-heading-four"
      >
        <button
          className="hs-accordion-toggle hs-accordion-active:text-secondary inline-flex justify-between items-center gap-x-3 w-full font-bold text-start text-black py-6 px-5 text-2xl"
          aria-controls="hs-basic-active-bordered-collapse-four"
        >
          Manuals
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
        <div
          id="hs-basic-active-bordered-collapse-four"
          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="hs-active-bordered-heading-four"
        >
          <div className="pb-4 px-5">
            <ul className="">
              {manuals.map((item, index) => (
                <li key={index} className="flex flex-col md:flex-row pb-4 mb-4 border-b border-gray-200 border-dashed last:pb-0 last:mb-0 gap-x-8 last:border-none">
                    <div className="">Download:</div>
                    <div className="underline">
                      <Link href={`${item.url.href}`} target="_blank" rel="noopener noreferrer">
                        {item.fileName}
                      </Link>
                    </div>
                </li>              
              ))}
            </ul>
          </div>
        </div>
      </div>
      }    

    </div>
  )
}