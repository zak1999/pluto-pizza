import { FC } from "react";
import { Modal } from "./EditPizzaModal";
import { CheckoutPizza } from "@/types.global";

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
          <ul className="list-inside list-disc indent-4">
            {pizza.toppings.map((topping, i) => (
              <li key={`${topping}_${i}`}>{<span> {topping}</span>} </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="indent-4 text-xs">No toppings.</p>
      )}
      <div className="flex gap-4 justify-between pt-2">
        <button
          onClick={() => handleRemove(index)}
          className="btn btn-xs btn-outline btn-primary"
        >
          Remove
        </button>
        <label
          htmlFor={`edit_pizza_modal_${index}`}
          className="btn btn-xs flex justify-self-end"
        >
          Edit
        </label>
      </div>
      <Modal pizza={pizza} index={index} />
    </div>
  );
};