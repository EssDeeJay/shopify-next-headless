import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type CartDrawerProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function CartDrawer({ open, onClose, children }: CartDrawerProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-lg transform text-left align-middle shadow-xl transition-all bg-white rounded-l-2xl">
                  <header className="sticky top-0 flex items-center justify-between px-4 h-20 sm:px-6 bg-white border-b border-gray-200 rounded-tl-2xl">
                    <h2 id="cart-contents" className="text-2xl font-extrabold">
                      Your cart
                    </h2>
                    <button type="button" className="p-2 text-gray-500" onClick={onClose}>
                      <IconClose aria-label="Close panel" />
                    </button>
                  </header>
                  <div className="relative my-2">
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}

function IconClose() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <path d="M4.5 4.5L15.5 15.5M15.5 4.5L4.5 15.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
