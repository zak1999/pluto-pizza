import { FC, useEffect, useState } from "react";
import { useCart } from "../(main)/layout";
import { notify } from "../(main)/pizza/page";
import ToppingCard from "./ToppingCard";
import { CheckoutPizza } from "@/types.global";

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

export const PizzaForm: FC<{
  editingPizza?: CheckoutPizza;
  index?: number;
}> = ({ editingPizza, index }) => {
  const { setCartCount } = useCart();
  // inital pizza and price is set to that of a small pizza, unless a pizza is passed through the component we set it in the usEffect below.
  const [currentPizzaChoice, setCurrentPizzaChoice] = useState<PizzaType>(
    menu[0]
  );
  const [currentPrice, setCurrentPrice] = useState<number>(menu[0].price);
  const [currentToppings, setCurrentToppings] = useState<string[]>([]);

  // 
  useEffect(() => {
    if (editingPizza) {
      setCurrentPizzaChoice(
        menu.find((pizz) => pizz.size == editingPizza.size) as PizzaType
      );
      setCurrentPrice(editingPizza.price);
      setCurrentToppings(editingPizza.toppings);
    }
  }, []);

  // we update a price update when there is a change in the toppings or pizza size
  useEffect(() => {
    const extraToppingsCost = Math.max(
      currentToppings.length - currentPizzaChoice.includedToppings,
      0
    ); // we make sure we dont get a negative here
    if (extraToppingsCost) {
      setCurrentPrice(
        Math.round(
          (extraToppingsCost * 1.49 + currentPizzaChoice.price) * 100
        ) / 100
      );
    } else setCurrentPrice(Math.round(currentPizzaChoice.price * 100) / 100);
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
    e.preventDefault();
    // STORE IN LOCALSTORAGE
    if (typeof window !== "undefined" && window.localStorage) {
      const cartItems =
        JSON.parse(localStorage.getItem("cartItems") as string) || [];
      const newCart = [
        ...cartItems,
        {
          size: currentPizzaChoice.size,
          toppings: currentToppings,
          price: Math.round(currentPrice * 100) / 100,
        },
      ];
      localStorage.setItem(
        // store new pizza in localStorage
        "cartItems",
        JSON.stringify(newCart)
      );
      // update in nav
      setCartCount(newCart.length);
      // clear to defualt
      setStatesToDefault();
      notify("Added pizza to cart");      
    }
  };
  const setStatesToDefault = (e?: React.MouseEvent) => {
    e && e.preventDefault();
    setCurrentPizzaChoice(menu[0]);
    setCurrentPrice(menu[0].price);
    setCurrentToppings([]);
  };
  const handleUpdatePizza = (e: React.MouseEvent) => {
    e.preventDefault();
    if (index === undefined || !editingPizza) return;
    if (typeof window !== "undefined" && window.localStorage) {
      const cartItems =
        JSON.parse(localStorage.getItem("cartItems") as string) || [];
      cartItems[index] = {
        size: currentPizzaChoice.size,
        toppings: currentToppings,
        price: Math.round(currentPrice * 100) / 100,
      };
      const newCart = [...cartItems];
      localStorage.setItem(
        // store new pizza in localStorage
        "cartItems",
        JSON.stringify(newCart)
      );
      // update in nav
      setCartCount(newCart.length);
      // clear to defualt
      notify("Updated Pizza");
      // close modal
      // trigger a rerender of cart with this:
      setCartCount(1000)
    }
  };
  return (
    <div>
      <form>
        <div>
          <h4>Select Pizza Size</h4>
          <select
            onChange={(e) => handlePizzaSizeChange(e.target.value)}
            className="select w-full max-w-xs select-accent"
            value={currentPizzaChoice.size}
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
          <div className="flex justify-between">
            <h2 className="text-md font-semibold tracking-tight">
              Your pizza:
            </h2>
            <p className="text-md font-semibold tracking-tight">
              Price: £{currentPrice}
            </p>
          </div>
          <div className="text-accent">
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
          </div>
        </div>
        <div className="flex justify-between">
          <button className="btn" onClick={(e) => setStatesToDefault(e)}>
            Start again
          </button>
          {editingPizza ? (
            <div className="modal-action">

            <button
              className="btn bg-accent"
              type="submit"
              onClick={(e) => handleUpdatePizza(e)}
            >
              Update Pizza
            </button>
            </div>
          ) : (
            <button
              className="btn "
              type="submit"
              onClick={(e) => handleAddToCart(e)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
