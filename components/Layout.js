import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-screen">
        <Navbar />
      </div>
      <div className="flex-grow">{props.children}</div>

      <div className="w-screen">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
