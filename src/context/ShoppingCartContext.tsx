import { createContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number,
  cartItems: CartItem[]
};

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

  const [cartItems, setCartITems] = useLocalStorage<CartItem[]>("shopping-cart", []);
  
  const [isOpen, setIsOpen] = useState(false);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id == id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    const curr = cartItems.find((item) => item.id === id);

    if (curr) {
      const newItems = cartItems.map((item) => {
        if (item.id === id) {
          return { ...curr, quantity: curr.quantity + 1 };
        }
        return item;
      });

      setCartITems(newItems);
      return;
    }

    setCartITems([...cartItems, { id, quantity: 1 }]);
    return;
  }

  function decreaseCartQuantity(id: number) {
    setCartITems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartITems((currItem) => {
      return currItem.filter((item) => item.id !== id);
    });
  }

  function openCart() {
    setIsOpen(true)
  }

  function closeCart() {
    setIsOpen(false)
  }

  const cartQuantity = cartItems.reduce((quantity, item) => {
    return item.quantity + quantity
  }, 0)

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        openCart,
        closeCart,
        cartItems,
      }}
    >
      {children}

      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
