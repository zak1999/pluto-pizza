"use client";
import React, { Dispatch, Suspense, createContext, useContext, useState } from "react";
import dynamic from "next/dynamic";
import Spinner from "../components/Spinner";

type CartContextType = {
  cartCount: number;
  setCartCount: Dispatch<React.SetStateAction<number>>;
};
const NoSSRNavbar = dynamic(() => import("../components/Navbar"), {
  ssr: false,
});
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('outside of provider');
  }
  return context;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  return (
    <div className="flex flex-col items-center w-full h-full">
      <CartContext.Provider value={{ cartCount, setCartCount }}>
        <div className="pb-4">
          <NoSSRNavbar />
        </div>
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </CartContext.Provider>
    </div>
  );
};

export default Layout;
