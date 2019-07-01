import React, { Component } from "react";
import { ReactComponent as Logo } from "./logo.svg";
import Navigation from "../Navigation/Navigation";
import HeaderBg from "./HeaderBg/HeaderBg";
import { ReactComponent as MainPageSvg } from './HeaderBg/swallow3.svg';
import { ReactComponent as TravelsSvg } from './HeaderBg/drakkar.svg';
import { ReactComponent as TeamSvg } from './HeaderBg/team.svg';

class Header extends Component {

  state = {
    headerNotCollapsed: true,
  }
  previousPage = "";
  currentPage = "none";

  componentDidMount = () => {

    document.addEventListener("scroll", (ev) => {
      if(window.scrollY > 50 && this.state.headerNotCollapsed)
        this.setHeaderState(false);
      else if(window.scrollY < 50 && !this.state.headerNotCollapsed)
        this.setHeaderState(true);
    });
}

  setHeaderState = (bool) => {
    this.setState({headerNotCollapsed: bool});
  }

  getCorrespondingSvg(id,type) {

    switch(id) {
      case "travels":
      return(<TravelsSvg key={id} className={type} />);
      case "team":
      return(<TeamSvg key={id} className={type} />);
      case "none":
      return(<div key={id}></div>)
      default:
      return (<MainPageSvg key={id} className={type} />);
    }
  }

  render() {
    if(this.currentPage !== this.props.history.location.pathname.split("/")[1])
    {
      this.previousPage = this.currentPage;
      this.currentPage = this.props.history.location.pathname.split("/")[1];
    }

  let previousHeaderBg = [];
  let currentHeaderBg = []

  previousHeaderBg.push(this.getCorrespondingSvg(this.previousPage,"previous"));
  currentHeaderBg.push(this.getCorrespondingSvg(this.currentPage,"current"));

    return (
      <div className={this.state.headerNotCollapsed ? "Header notCollapsed" : "Header"}>
        <div className="floatingPart">
          <Logo className="logo" />
          <Navigation headerPropsRef={this.props} headerNotCollapsed={this.state.headerNotCollapsed} />
          <HeaderBg>{previousHeaderBg}</HeaderBg>
          <HeaderBg>{currentHeaderBg}</HeaderBg>
        </div>
        <div className="backgroundPart" />
      </div>
    );
  }
}

export default Header;
