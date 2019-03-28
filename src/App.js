//node_module
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
//container&components
import { Login, ClassesList, Class, Exam } from 'container';
//stylesheet
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={ Login }/>
          <Route exact path="/classeslist" component={ ClassesList }/>
          <Route exact path="/class" component={ Class }/>
          <Route exact path="/exam" component={ Exam } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;