"use client";
import React, { FC, Fragment, useEffect, useState } from "react";
import { notify } from "../pizza/page";
import { Toaster } from "react-hot-toast";
import { useCart } from "../layout";
import Spinner from "@/app/components/spinner";
import { PizzaForm } from "@/app/components/PizzaForm";
import { CheckoutPizzaCard } from "@/app/components/CheckoutPizzaCard";

export type CheckoutPizza = {
  size: string;
  toppings: string[];
  price: number;
};

const page = () => {
  const { cartCount, setCartCount } = useCart();
  const [cartItems, setCartItems] = useState<CheckoutPizza[] | undefined>(
    undefined
  );
  const [notes, setNotes] = useState("");

  useEffect(() => {
    let cartItemsFromLS;
    if (typeof window !== "undefined") {
      cartItemsFromLS = localStorage.getItem("cartItems");
    }
    if (!cartItemsFromLS) return setCartItems([]);
    setCartItems(JSON.parse(cartItemsFromLS));
    setCartCount(JSON.parse(cartItemsFromLS).length);
  }, [cartCount]);

  const handleRemove = (index: number) => {
    // remove from local storage AND remove from state
    const newCart = (cartItems as CheckoutPizza[]).filter(
      (pizz, i) => i != index
    );
    setCartItems(newCart);
    setCartCount(cartCount - 1);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    notify("Pizza removed", false);
  };
  const handleCheckout = () => {
    // send post req to endpoint 
    // with info
    // await,
    // with whatever randomly generated id/index,
    // we return it back to the page
  };
  if (cartItems == undefined) return <Spinner />;
  return (
    <div className="w-full h-full flex flex-col justify-between gap-2">
      <Toaster position="bottom-center" />
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Your Cart: ({cartItems.length}){" "}
        </h2>
        <div className="flex flex-col gap-2 ">
          {cartItems.length ? (
            cartItems.map((pizza, i) => (
              <Fragment key={i}>
                <CheckoutPizzaCard
                  handleRemove={handleRemove}
                  pizza={pizza}
                  index={i}
                />
              </Fragment>
            ))
          ) : (
            <h2 className="text-xl font-semibold tracking-tight self-center">
              Your cart is empty
            </h2>
          )}
        </div>
        <div className="pt-2">
          <textarea
            disabled={cartItems.length == 0}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="textarea textarea-accent w-full"
            placeholder="Notes/allergy info."
          ></textarea>
        </div>
      </div>
      <div className="flex self-end justify-self-end">
        your total: £
        <span className="underline">
          {Math.round(
            cartItems.reduce((total, piz) => total + piz.price, 0) * 100
          ) / 100}
        </span>
      </div>
      <button
        onClick={() => handleCheckout()}
        disabled={cartItems.length == 0}
        className="btn flex self-end justify-self-end"
      >
        Checkout
      </button>
    </div>
  );
};

export default page;

