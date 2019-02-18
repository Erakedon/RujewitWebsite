import React, { Component } from "react";
import { ReactComponent as Logo } from "./logo.svg";
import Navigation from "../Navigation/Navigation";
// import * as Scroll from "react-scroll";

class Header extends Component {

  state = {
    headerCollapsed: false
  }

  componentDidMount = () => {

    document.addEventListener("scroll", (ev) => {
      // console.log(ev);
      // console.log(document.querySelector(".floatingPart").scrollTop);
      console.log(window.scrollY);
      if(window.scrollY > 100 && !this.state.headerCollapsed)
      {
        console.log("changing state to true");
        this.setHeaderState(true);
      }
      else if(window.scrollY < 100 && this.state.headerCollapsed)
      {
        console.log("changing state to false");
        this.setHeaderState(false);
      }

    });

  // Scroll.Events.scrollEvent.register('begin',(to,element) => {
  //   console.log("begin",element);
  // });

  // Scroll.Events.scrollEvent.register('end', () => {
  //   console.log("scroll");
  // });
}

  setHeaderState = (bool) => {
    this.setState({headerCollapsed: bool});
  }

  render() {
    return (
      <div className={this.state.headerCollapsed ? "Header collapsed" : "Header"}>
        <div className="floatingPart">
          <Logo className="logo" />
          <Navigation />
        </div>
        <div className="backgroundPart" />
      </div>
    );
  }
}

export default Header;
