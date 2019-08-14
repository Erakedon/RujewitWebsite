import React from 'react';
import { Component } from 'react';

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
            "team",
            "travels",
            "contact"
        ]
    };

    redirectTo(url) {
        this.props.headerPropsRef.history.push(url);
    }

    onNavBtnClick(url) {
        this.redirectTo(url);
        this.setState({navOn: false});
    }

    render() {
        return (
            <div className={this.state.navOn ? "Navigation" : "Navigation hidden"}>
                <div className="mainBtn" onClick={() => {this.setState({navOn: !this.state.navOn})}}>
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                </div>
                <div className="navBtnsContainer">
                    <div className="navBtn" onClick={() => this.onNavBtnClick("/")}>Strona główna</div>
                    <div className="navBtn" onClick={() => this.onNavBtnClick("team")}>Drużyna</div>
                    <div className="navBtn" onClick={() => this.onNavBtnClick("travels")}>Wyprawy</div>
                    <div className="navBtn" onClick={() => this.onNavBtnClick("contact")}>Kontakt</div>
                </div>
            </div>
        );
    }
}
 
export default Navigation;
