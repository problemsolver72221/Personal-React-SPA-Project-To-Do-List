import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ToDoPage from "./pages/ToDoPage/ToDoPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/app" component={ToDoPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    );
  }
}

export default App;
