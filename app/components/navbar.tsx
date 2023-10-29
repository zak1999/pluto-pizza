"use client";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const Navbar = () => {
  const path = usePathname();
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
  const cartItemsCount = cartItems.length
  
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
        Cart ({cartItemsCount})
      </Link>
    </div>
  );
};

export default Navbar;
