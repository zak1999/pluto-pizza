import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { useCart } from "../(main)/layout";

const  Navbar = () => {
  const { cartCount } = useCart();
  const path = usePathname();
  return (
    <div className="tabs">
      <Link
        href="/pizza"
        className={clsx(
          "tab tab-bordered",
          path === "/pizza" ? "tab-active" : ""
        )}
      >
        Create Your Pizza
      </Link>
      <Link
        href={"/cart"}
        className={clsx(
          "tab tab-bordered",
          path === "/cart" ? "tab-active" : ""
        )}
      >
        Cart ({cartCount})
      </Link>
    </div>
  );
};

export default Navbar;
