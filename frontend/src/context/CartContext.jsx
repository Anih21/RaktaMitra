import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {

    const existing = cart.find(
      (i) =>
        i.bankId === item.bankId &&
        i.group === item.group
    );

    if (existing) {

      setCart(
        cart.map((i) =>
          i.bankId === item.bankId &&
          i.group === item.group
            ? {
                ...i,
                quantity: i.quantity + item.quantity
              }
            : i
        )
      );

    } else {

      setCart([...cart, item]);

    }

  };

  const removeFromCart = (bankId, group) => {

    setCart(
      cart.filter(
        (i) =>
          !(
            i.bankId === bankId &&
            i.group === group
          )
      )
    );

  };

  const clearCart = () => {

    setCart([]);

  };

  const totalAmount = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>

  );

};

export const useCart = () => useContext(CartContext);