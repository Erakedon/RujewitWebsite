import React, { Component } from "react";

class errorDisplay extends Component {

  closeView() {
    let newUrl = this.props.history.location.pathname;
    this.props.history.push("/" + newUrl.split("/")[1]);
  }

  render() {
    return (
      <div className="errorDisplay" onClick={() => {this.closeView()}} >
        <h1>Ups, jakiś wiking ukradł tę stronę</h1>
      </div>
    );
  }
}

export default errorDisplay;
