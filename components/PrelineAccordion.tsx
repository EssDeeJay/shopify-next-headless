import type Product from "@shopify/hydrogen-react/storefront-api-types";

export default function PrelineAccordion({product}: {product: Product}){
   return(
    <div className="hs-accordion-group">
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
            {product.description ? product.description : "No description available"}
          </p>
        </div>
      </div>
    </div>
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
          <p className="text-gray-600">
            <em>This is the second item's accordion body.</em> It is hidden by
            default, until the collapse plugin adds the appropriate classes that
            we use to style each element. These classes control the overall
            appearance, as well as the showing and hiding via CSS transitions.
          </p>
        </div>
      </div>
    </div>
    <div
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
          <p className="text-gray-800 dark:text-neutral-200">
            <em>This is the first item's accordion body.</em> It is hidden by
            default, until the collapse plugin adds the appropriate classes that
            we use to style each element. These classes control the overall
            appearance, as well as the showing and hiding via CSS transitions.
          </p>
        </div>
      </div>
    </div>
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
          <p className="text-gray-600">
            <em>This is the first item's accordion body.</em> It is hidden by
            default, until the collapse plugin adds the appropriate classes that
            we use to style each element. These classes control the overall
            appearance, as well as the showing and hiding via CSS transitions.
          </p>
        </div>
      </div>
    </div>
  </div>
   )
}