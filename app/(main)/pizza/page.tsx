"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import ToppingCard from "./components/ToppingCard";
import toast, { Toaster } from 'react-hot-toast';

type PizzaType = {
  size: string;
  price: number;
  includedToppings: number;
};
const toppings = [
  "Pepperoni",
  "Mushrooms",
  "Sausage",
  "Onions",
  "Green Peppers",
  "Black Olives",
  "Green Olives",
  "Bacon",
  "Ham",
  "Pineapple",
  "Spinach",
  "Tomatoes",
  "Jalapenos",
  "Anchovies",
  "Extra Cheese",
];

const menu: PizzaType[] = [
  {
    size: "small",
    price: 6.99,
    includedToppings: 2,
  },
  {
    size: "medium",
    price: 8.99,
    includedToppings: 3,
  },
  {
    size: "large",
    price: 11.99,
    includedToppings: 5,
  },
];

export const notify = (msg: string, pos: boolean = true) => {
  if (pos) return toast.success(msg);
  else return toast(msg);
};

const page = () => {
  const router = useRouter()

  // inital pizza and price is set to that of a small pizza.
  const [currentPizzaChoice, setCurrentPizzaChoice] = useState<PizzaType>(
    menu[0]
  );
  const [currentPrice, setCurrentPrice] = useState<number>(menu[0].price);
  const [currentToppings, setCurrentToppings] = useState<string[]>([]);

  // we update a price update when there is a change in the toppings or pizza size
  useEffect(() => {
    const extraToppingsCost = Math.max(
      currentToppings.length - currentPizzaChoice.includedToppings,
      0
    ); // we make sure we dont get a negative here
    if (extraToppingsCost) {
      setCurrentPrice(extraToppingsCost * 1.49 + currentPizzaChoice.price);
    } else setCurrentPrice(currentPizzaChoice.price);
  }, [currentPizzaChoice, currentToppings]);

  // this doesn't just update the size, but also the menu item - we then know how to work out price.
  const handlePizzaSizeChange = (size: string) => {
    const pizza = menu.find((piz) => piz.size == size) as PizzaType; // I am asserting here, as I know we will find the pizzaType in the array.
    setCurrentPizzaChoice(pizza);
  };

  const handleToppingClick = (topping: string) => {
    if (currentToppings.includes(topping)) {
      setCurrentToppings(currentToppings.filter((item) => item !== topping));
    } else {
      setCurrentToppings([...currentToppings, topping]);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    // STORE IN COOKEIES?? OR STORE IN LOCALSTORAGE
    e.preventDefault()
    if (typeof window !== "undefined" && window.localStorage) {
      const cartItems =
        JSON.parse(localStorage.getItem("cartItems") as string) || [];
        localStorage.setItem(
        // store new pizza in localStorage
        "cartItems",
        JSON.stringify([
          ...cartItems,
          {
            size: currentPizzaChoice.size,
            toppings: currentToppings,
            price: currentPrice,
          },
        ])
      );
      //soft refresh so that the screen doesnt blank out,
      // but cart in nav still updates correctly
      router.refresh()
      // clear to defualt
      setStatesToDefault()  
      notify('Added pizza to cart')
    }
  };
  const setStatesToDefault = (e?: React.MouseEvent) => {
    e && e.preventDefault();
    setCurrentPizzaChoice(menu[0]);
    setCurrentPrice(menu[0].price);
    setCurrentToppings([]);
  };

  return (
    <div className="w-full">
      <Toaster position="bottom-center" />
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          Create your pizza here:{" "}
        </h2>
        <p className="text-md font-semibold tracking-tight">
          Price: £{currentPrice}
        </p>
      </div>
      <form>
        <div>
          <h4>Select Pizza Size</h4>
          <select
            onChange={(e) => handlePizzaSizeChange(e.target.value)}
            className="select w-full max-w-xs select-accent"
            defaultValue={"small"}
          >
            <option value={"small"}>Small</option>
            <option value={"medium"}>Medium</option>
            <option value={"large"}>Large</option>
          </select>{" "}
          <h4>Select Toppings</h4>
          <div className="grid grid-cols-4 auto-rows-fr gap-4 container mx-auto">
            {toppings.map((topping, i) => (
              <ToppingCard
                key={`${topping}_${i}`}
                topping={topping}
                active={currentToppings.includes(topping)}
                handleClick={handleToppingClick}
              />
            ))}
          </div>
        </div>
        <div className="">
          <h2 className="text-md font-semibold tracking-tight">Your pizza:</h2>
          <p className="text-accent">
            A {currentPizzaChoice.size} pizza
            {currentToppings.length ? (
              <>
                <span> with</span>
                <ul className="list-disc list-inside">
                  {currentToppings.map((topping, i) => (
                    <li key={`${topping}_${i}`}>
                      {<span> {topping}</span>}{" "}
                      {i + 1 > currentPizzaChoice.includedToppings
                        ? "(+£1.49)"
                        : "(free)"}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>.</>
            )}
          </p>
        </div>
        <button className="btn" onClick={(e) => setStatesToDefault(e)}>
          Start again
        </button>
        <button
          className="btn"
          type="submit"
          onClick={(e) => handleAddToCart(e)}
        >
          Add to Cart
        </button>
      </form>
    </div>
  );
};

export default page;
