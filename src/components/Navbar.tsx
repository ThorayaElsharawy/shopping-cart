import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

export function Navbar() {
  const {openCart, cartQuantity} = useContext(ShoppingCartContext)

  return (
    <div className="bg-white shadow-sm mb-3 sticky top-0">
      <div className="h-16 container mx-auto flex justify-between items-center">
        <nav className="text-lg font-light text-gray-500 px-3 md:px-0">
          <span className="hover:text-gray-900">
            <Link to="/">Home</Link>
          </span>
          <span className="inline-block mx-4 hover:text-gray-900">
            <Link to="/store">Store</Link>
          </span>
          <span className="hover:text-gray-900">
            <Link to="/about">About</Link>
          </span>
        </nav>
        <button 
        onClick={openCart}
        className="p-2 rounded-full text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 relative mr-4">
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1.8em"
            width="1.8em"
          >
            <path d="M208 416 A32 32 0 0 1 176 448 A32 32 0 0 1 144 416 A32 32 0 0 1 208 416 z" />
            <path d="M432 416 A32 32 0 0 1 400 448 A32 32 0 0 1 368 416 A32 32 0 0 1 432 416 z" />
            <path d="M456.8 120.78a23.92 23.92 0 00-18.56-8.78H133.89l-6.13-34.78A16 16 0 00112 64H48a16 16 0 000 32h50.58l45.66 258.78A16 16 0 00160 368h256a16 16 0 000-32H173.42l-5.64-32h241.66A24.07 24.07 0 00433 284.71l28.8-144a24 24 0 00-5-19.93z" />
          </svg>
          <div className=" w-6 h-6 flex justify-center items-center rounded-full bg-red-500 absolute -right-3 -top-1  text-sm text-white">
            {cartQuantity}
          </div>
        </button>
      </div>
    </div>
  );
}
