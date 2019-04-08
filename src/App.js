//node_module
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
//container&components
import { Login, ClassesList, Class, Exam } from "containers";
import store from "./store";
//stylesheet
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/classeslist" component={ClassesList} />
            <Route exact path="/class" component={Class} />
            <Route exact path="/exam" component={Exam} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
