import { FC } from "react";
import { PizzaForm } from "./PizzaForm";
import { CheckoutPizza } from "@/types.global";

export const Modal: FC<{ pizza: CheckoutPizza; index: number }> = ({
  pizza,
  index,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`edit_pizza_modal_${index}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <div className="modal-action">
            <PizzaForm editingPizza={pizza} index={index} />
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={`edit_pizza_modal_${index}`}>
          Close
        </label>
      </div>
    </div>
  );
};
