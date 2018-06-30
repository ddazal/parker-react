import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Network from './components/network';

class App extends Component {
  render() {
    return(
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/network" component={Network}/>
      </Switch>
    )
  }
}

export default App;
