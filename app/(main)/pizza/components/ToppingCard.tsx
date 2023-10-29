import clsx from "clsx";
import React, { FC } from "react";

const ToppingCard: FC<{
  topping: string;
  active: boolean;
  handleClick: (topping: string) => void;
}> = ({ topping, active, handleClick }) => {
  return (
    <div
      className={clsx(
        "cursor-pointer card shadow-md p-2 border-accent flex justify-center",
        active && "bg-secondary underline"
      )}
      onClick={() => handleClick(topping)}
    >
      <div className="">{topping}</div>
    </div>
  );
};

export default ToppingCard;
