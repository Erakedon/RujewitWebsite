import React, { Component } from "react";
import { ReactComponent as Logo } from "./logo.svg";
import Navigation from "../Navigation/Navigation";
import HeaderBg from "./HeaderBg/HeaderBg";
// import * as Scroll from "react-scroll";

class Header extends Component {

  state = {
    headerNotCollapsed: true
  }

  componentDidMount = () => {

    document.addEventListener("scroll", (ev) => {
      // console.log(ev);
      // console.log(document.querySelector(".floatingPart").scrollTop);
      if(window.scrollY > 50 && this.state.headerNotCollapsed)
      {
        console.log("changing state to true");
        this.setHeaderState(false);
      }
      else if(window.scrollY < 50 && !this.state.headerNotCollapsed)
      {
        console.log("changing state to false");
        this.setHeaderState(true);
      }

    });
}

  setHeaderState = (bool) => {
    this.setState({headerNotCollapsed: bool});
  }

  render() {
    return (
      <div className={this.state.headerNotCollapsed ? "Header notCollapsed" : "Header"}>
        <div className="floatingPart">
          <Logo className="logo" />
          <Navigation headerNotCollapsed={this.state.headerNotCollapsed} />
          <HeaderBg />
        </div>
        <div className="backgroundPart" />
      </div>
    );
  }
}

export default Header;
