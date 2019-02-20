import React from 'react';
import { ReactComponent as NavBtns } from './navWings2.svg';
import { Component } from 'react';

class Navigation extends Component {

    state = {
        navOn: false
    };

     setNavState = (bool) => {
        // NavEl.classList.add("active");
        console.log("nav turned on",this.props.headerNotCollapsed);
        if(this.props.headerNotCollapsed) return;

        this.setState({navOn: bool});
    };

    isNavActive() {
        if(this.props.headerNotCollapsed) {
            return "Nav";
        }

        if(this.state.navOn) return "Nav active";
        return "Nav";
    }

    render() {
        return (
        <div className={this.isNavActive()}>
            <div className="menuBtn btnOff" onClick={() => {this.setNavState(true)}}>
                <div className="text">menu</div>
            </div>
            <div className="menuBtn btnOn" onClick={() => {this.setNavState(false)}}>
                <div className="text"><i class="fas fa-undo-alt"></i></div>
            </div>
            <NavBtns className="navBtns" />
        </div>
        );

    }
}
 
export default Navigation;
