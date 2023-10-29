"use client";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const Navbar = () => {
  const path = usePathname();

  return (
    <div className="tabs">
      <Link
        href='/pizza'
        className={clsx(
          "tab tab-bordered",
          path === "/pizza" ? "tab-active" : ""
        )}
      >
        Create Your Pizza
      </Link>
      <Link href={"/basket"}
          className={clsx(
            "tab tab-bordered",
            path === "/basket" ? "tab-active" : ""
          )}
        >
          Basket

      </Link>
    </div>
  );
};

export default Navbar;
