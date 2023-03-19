import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import items from "../data/items.json";
import { FormateCurrency } from "../utilities/FormateCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useContext(ShoppingCartContext);
  const item = items.find((i) => i.id === id);
  if (item == null) return null;
  
  return (
    <li className="flex py-6 border-b mb-5">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img src={item.imgUrl} className="h-full w-full" />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">{FormateCurrency(quantity * item.price)}M</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.color}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">QTY {quantity}</p>

          <div className="flex">
            <button
              onClick={() => removeFromCart(id)}
              type="button"
              className="font-medium text-red-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
