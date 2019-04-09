//node_module
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faTimes,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";

//container&components
import { Login, ClassesList, Class, Exam } from "containers";
//stylesheet
import "./App.css";

library.add(faBars, faTimes, faAngleLeft, faAngleRight);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/classeslist" component={ClassesList} />
          <Route exact path="/class" component={Class} />
          <Route exact path="/exam" component={Exam} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;