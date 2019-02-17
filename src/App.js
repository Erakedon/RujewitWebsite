import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Team from "./pages/Team/Team";
import Header from "./shared/Header/Header";
import "./style.css";

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header />
          <Switch>
            <Route path="/team" component={Team} />
            <Route path="/" component={MainPage} />
          </Switch>
        </div>
    );
  }
}

export default App;
