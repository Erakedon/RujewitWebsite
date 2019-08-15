import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Team from "./pages/Team/Team";
import Header from "./shared/Header/Header";
import Travels from './pages/Travels/Travels';
import "./style.css";
import Contact from './pages/Contact/Contact';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" component={Header} />
          <Route path="/team" exact component={Team} />
          <Route path="/travels" component={Travels} />
          <Route path="/contact" component={Contact} />
          <Route path="/" exact component={MainPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
