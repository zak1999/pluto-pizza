import React from "react";
import Navbar from "../_components/navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;