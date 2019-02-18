import React from 'react';
import { ReactComponent as NavBtns } from './menuTest4.svg';
import { Component } from 'react';

class Navigation extends Component {

    state = {
        navOn: false
    };


        

     

     setNavState = (bool) => {
        // NavEl.classList.add("active");
        this.setState({navOn: bool});
        console.log("nav turned on");
    };

    isNavActive() {
        if(this.state.navOn) return "Nav active";
        return "Nav";
    }

    render() {
        return (
        <div className={this.state.navOn ? 'Nav active' : 'Nav'}>
            <div className="menuBtn btnOff" onClick={() => {this.setNavState(true)}}>
                <div className="text">Menu</div>
            </div>
            <div className="menuBtn btnOn" onClick={() => {this.setNavState(false)}}>
                <div className="text"><i className="fas fa-undo"></i></div>
            </div>
            <NavBtns className="navBtns" />
        </div>
        );

    }
}
 
export default Navigation;