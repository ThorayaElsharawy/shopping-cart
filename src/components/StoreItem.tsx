import { useContext, useState } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { FormateCurrency } from "../utilities/FormateCurrency";

type StoreItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
  };
};

export function StoreItem({ item }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useContext(ShoppingCartContext);

  const quantity = getItemQuantity(item.id);

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="p-8 rounded-t-lg object-unset"
        src={item.imgUrl}
        alt="product image"
        style={{ height: "450px", width: "100%" }}
      />
      <div className="px-5 pb-5">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {item.name}
          </h5>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {FormateCurrency(item.price)}M
          </p>
        </div>

        {quantity == 0 ? (
          <button
          onClick={() => increaseCartQuantity(item.id)}
            className="mt-3 mx-auto w-full  text-white border bg-blue-700 
                hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                text-sm px-5 py-2.5 text-center  transition-all duration-300"
          >
            Add to cart
          </button>
        ) : (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex">
              <button
                onClick={() => decreaseCartQuantity(item.id)}
                className="flex justify-center bg-blue-700 w-10 text-white rounded text-lg focus:ring-4 focus:ring-blue-300"
              >
                -
              </button>
              <p className="mx-2">
                <span className="font-extrabold px-1 text-xl">{quantity}</span>
                in cart
              </p>
              <button
                onClick={() => increaseCartQuantity(item.id)}
                className="flex justify-center bg-blue-700 w-10 text-white rounded text-xl focus:ring-4 focus:ring-blue-300"
              >
                +
              </button>
            </div>
            <button 
            onClick={() => removeFromCart(item.id)}
            className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
