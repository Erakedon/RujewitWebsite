import React from "react";
// import logo from "./logo.svg";
import { ReactComponent as Logo } from './logoMin.svg';
// import { ReactSVG } from 'react-svg';
// import { render } from 'react-dom'
// import ReactSVG from "react-svg";
// import PropTypes from 'prop-types';
// import ReactDOMServer from 'react-dom-server';

const header = () => {
  return (
    <div className="Header">
      {/* <div className="headerLogo"></div> */}

      {/* <Logo></Logo> */}
      {/* <svg src={Logo} /> */}
      {/* <svg src={logo} alt="Logo"/> */}


      <Logo />

    {/* <ReactSVG src="logo.Min.svg"></ReactSVG> */}

    </div>
  );
};

export default header;
 