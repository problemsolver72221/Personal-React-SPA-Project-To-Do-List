import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ToDoPage from "./pages/ToDoPage/ToDoPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/app" component={ToDoPage} />
        <Route path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default App;
