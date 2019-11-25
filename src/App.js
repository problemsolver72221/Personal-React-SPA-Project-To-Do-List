import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ToDoPage from "./pages/ToDoPage/ToDoPage";
import "./App.css";

class App extends Component {
  // state = {  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/app" component={ToDoPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
