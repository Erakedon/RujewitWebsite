import React from "react";
import { ReactComponent as Logo } from './logo.svg';
import Navigation from "../Navigation/Navigation";



const header = () => {
  return (
    <div className="Header">
      <div className="floatingPart">
      <Logo className="logo" />
      <Navigation />

      </div>
      <div className="backgroundPart"></div>

    </div>
  );
};

export default header;
 