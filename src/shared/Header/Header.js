import React, { Component } from "react";
import { ReactComponent as Logo } from "./logo.svg";
import Navigation from "../Navigation/Navigation";
import HeaderBg from "./HeaderBg/HeaderBg";
// import * as Scroll from "react-scroll";

import { ReactComponent as MainPageSvg } from './HeaderBg/swallow3.svg';
import { ReactComponent as TravelsSvg } from './HeaderBg/drakkar.svg';
import { ReactComponent as TeamSvg } from './HeaderBg/team.svg';
// import { ReactComponent as Leftover3 } from './leftout_3.svg';
// import { ReactComponent as Leftover4 } from './leftout_4.svg';

class Header extends Component {

  state = {
    headerNotCollapsed: true,
    // previousHeaderBg: [],
    // currentHeaderBg: []
  }
  previousPage = "";
  currentPage = "brak poprzedniej strony";

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

  getCorrespondingSvg(id,type) {

    switch(id) {
      case "travels":
      return(<TravelsSvg key={id} className={type} />);
      case "team":
      return(<TeamSvg key={id} className={type} />);
      default:
      return (<MainPageSvg key={id} className={type} />);
    }
  }


  render() {

    console.log(this.props);

    if(this.currentPage !== this.props.history.location.pathname.split("/")[1])
    {
      this.previousPage = this.currentPage;
      this.currentPage = this.props.history.location.pathname.split("/")[1];
      console.log("prev: " + this.previousPage);
      console.log("curr: " + this.currentPage);
    }

    
    
  let previousHeaderBg = [];
  let currentHeaderBg = []

  previousHeaderBg.push(this.getCorrespondingSvg(this.previousPage,"previous"));
  currentHeaderBg.push(this.getCorrespondingSvg(this.currentPage,"current"));

  // previousHeaderBg.push(
  //   <HeaderBg key="prev">{this.previousPage}</HeaderBg>
  // );
  
  // if(this.currentPage === "/travels")
  // currentHeaderBg.push(
  //   <HeaderBg key="curr"><Travels className="current leftover2" /></HeaderBg>
  // );
  // else 
  // currentHeaderBg.push(
  //   <HeaderBg key="prev">{this.previousPage}</HeaderBg>
  // );

  // if(this.currentPage === "/travels")
  // {
  //   currentHeaderBg.push(
  //     <TravelsSvg key={this.currentPage} className="current leftover2" />
  //   );
  //   previousHeaderBg.push(
  //     <MainPageSvg key={this.previousPage} className="previous leftover1" />
  //   );
  // }
  // else {
  //   currentHeaderBg.push(
  //     <MainPageSvg key={this.currentPage} className="current leftover1" />
  //   );
  //   previousHeaderBg.push(
  //     <TravelsSvg key={this.previousPage} className="previous leftover2" />
  //   );
  // } 


    // switch(this.currentPage) {
    //   case "travels":
    //   console.log("set trav on cur");
    //     currentHeaderBg.push(
    //       <TravelsSvg key={this.currentPage} className="current" />
    //     );
    //   break;
    //   case "team":
    //   console.log("set trav on cur");
    //     currentHeaderBg.push(
    //       <TeamSvg key={this.currentPage} className="current" />
    //     );
    //   break;
    //   default:
    //   console.log("set def on cur");
    //   currentHeaderBg.push(
    //     <div key={this.currentPage}></div>
    //   );
    //   break;
    // }

    
    // switch(this.previousPage) {
    //   case "travels":
    //   console.log("set trav on prev");
    //     previousHeaderBg.push(
    //       <TravelsSvg key={this.previousPage} className="current" />
    //     );
    //   break;
    //   default:
    //   console.log("set def on prev");
    //   previousHeaderBg.push(
    //     <div key={this.previousPage}></div>
    //   );
    //   break;
    // }


    return (
      <div className={this.state.headerNotCollapsed ? "Header notCollapsed" : "Header"}>
        <div className="floatingPart">
          <Logo className="logo" />
          <Navigation headerPropsRef={this.props} headerNotCollapsed={this.state.headerNotCollapsed} />
          {/* <HeaderBg><MainPage className="leftover1" /></HeaderBg>
          <HeaderBg><Travels className="leftover2" /></HeaderBg> */}
    {/* <HeaderBg key="prev"><MainPage className="previous leftover1" /></HeaderBg> */}

          <HeaderBg>{previousHeaderBg}</HeaderBg>
          <HeaderBg>{currentHeaderBg}</HeaderBg>
        </div>
        <div className="backgroundPart" />
      </div>
    );
  }
}

export default Header;
