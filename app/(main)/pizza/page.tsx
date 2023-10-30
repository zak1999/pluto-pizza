"use client";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../layout";
import { PizzaForm } from "@/app/components/PizzaForm";

export const notify = (msg: string, pos: boolean = true) => {
  if (pos) return toast.success(msg);
  else return toast(msg);
};

const page = () => {
  const { setCartCount } = useCart();
  useEffect(() => {
    let cartItemsFromLS;
    if (typeof window !== "undefined") {
      cartItemsFromLS = localStorage.getItem("cartItems");
    }
    if (!cartItemsFromLS) return;
    setCartCount(JSON.parse(cartItemsFromLS).length);
  }, []);
  return (
    <div className="w-full">
      <Toaster position="bottom-center" />
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          Create your pizza here:{" "}
        </h2>
      </div>
      <PizzaForm />
    </div>
  );
};
export default page;
