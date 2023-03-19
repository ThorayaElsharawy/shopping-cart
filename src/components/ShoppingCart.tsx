import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { FormateCurrency } from "../utilities/FormateCurrency";
import { CartItem } from "./CartItem";
import items from "../data/items.json";

type ShoppingCartprops = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartprops) {
  const { closeCart, cartItems } = useContext(ShoppingCartContext);
  const totalQuantity = cartItems.reduce((total, cartItem) => {
    const item = items.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);
  
  return (
    <>
      {isOpen && (
        <div
          className="relative z-10 "
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto relative w-screen max-w-md">
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={closeCart}
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <h2
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="slide-over-title"
                      >
                        Shopping cart
                      </h2>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {cartItems.map((item) => (
                        <ul
                          key={item.id}
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          <CartItem {...item} />
                        </ul>
                      ))}
                      <div className=" mt-10 text-xl flex justify-between items-center">
                        <p>Subtotal</p>
                        <p>{FormateCurrency(totalQuantity)}</p>
                      </div>
                      <span className="text-gray-600">Shipping and taxes calculated at checkout.</span>
                      <div className="w-full ">
                      <button className="bg-blue-700 text-white w-full py-2 rounded mt-4">Checkout</button>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
