"use client";
import { useRouter } from "next/navigation";
import React, { FC, Fragment, useEffect, useState } from "react";
import { notify } from "../pizza/page";
import { Toaster } from "react-hot-toast";

type CheckoutPizza = {
  size: string;
  toppings: string[];
  price: number;
};

const page = () => {
  const router = useRouter();
  const cartItemsFromLS: CheckoutPizza[] =
    localStorage ? JSON.parse(localStorage.getItem("cartItems") as string) || []: []  
  const [cartItems, setCartItems] = useState<CheckoutPizza[]>(cartItemsFromLS);
    
  const handleRemove = (index: number) => {
    // remove from local storage AND remove from state
    const newCart = cartItems.filter((pizz, i) => i != index);
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    router.refresh();
    notify("Pizza removed", false);
  };

  return (
    <div className="w-full">
      <Toaster position="bottom-center" />

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
    </div>
  );
};

export default page;

export const CheckoutPizzaCard: FC<{
  pizza: CheckoutPizza;
  index: number;
  handleRemove: (index: number) => void;
}> = ({ pizza, index, handleRemove }) => {
  return (
    <div className="card w-full bg-slate-50 shadow-xl p-2">
      <div className="flex justify-between">
        <h2 className="text-md capitalize font-semibold tracking-tight">
          {pizza.size} Pizza
        </h2>
        <div>£{pizza.price}</div>
      </div>
      {pizza.toppings.length ? (
        <div className="text-xs">
          <p>Toppings:</p>
          <ul className="list-inside  list-disc indent-4">
            {pizza.toppings.map((topping, i) => (
              <li key={`${topping}_${i}`}>{<span> {topping}</span>} </li>
            ))}
          </ul>
        </div>
      ) : (
        "No toppings."
      )}
      <div className="flex gap-4 justify-between pt-">
        <button
          onClick={() => handleRemove(index)}
          className="btn btn-xs btn-outline btn-primary"
        >
          Remove
        </button>
        <button className="btn btn-xs flex justify-center">Edit</button>
      </div>
    </div>
  );
};
