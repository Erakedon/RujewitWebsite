import React from 'react';
import { ReactComponent as NavBtns } from './navWings.svg';
import { Component } from 'react';
// import { Redirect } from 'react-router';
// import BrowserRouter 

class Navigation extends Component {

    state = {
        navOn: false
    };

    wingsReferences = [];
    menuContent = {
        displayName: [
            "Strona Główna",
            "Drużynnicy",
            "Wyprawy",
            "Kontakt"
        ],
        url: [
            "/",
            "teammates",
            "travels",
            "contact"
        ]
    };

    componentDidMount() {
        this.wingsReferences = document.querySelectorAll("#wing");

        this.wingsReferences.forEach((w,i) => {
            w.querySelector("text").innerHTML = this.menuContent.displayName[i];
            w.querySelector("text").onclick = () => {this.redirectTo(this.menuContent.url[i])}; 
            console.log(w.querySelector("text").onClick);
        });
        console.log(this.wingsReferences);

    }

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

    redirectTo(url) {
        console.log("redirection");
        this.props.headerPropsRef.history.push(url);
        // this.props.historyRef.push("/kupa");
    }

    render() {
        return (

        <div className={this.isNavActive()}>
            <div className="menuBtn btnOff" onClick={() => {this.setNavState(true)}}>
                <div className="text">menu</div>
            </div>
            <div className="menuBtn btnOn" onClick={() => {this.setNavState(false)}}>
                <div className="text"><i className="fas fa-undo-alt"></i></div>
            </div>
            <NavBtns className="navBtns" />
        </div>
        );

    }
}
 
export default Navigation;
