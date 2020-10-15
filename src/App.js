import React from 'react';
import { Route, Switch } from "react-router";

import './App.css';

import { TabsComponent } from './views/tabs';
import { BaseMapComponent } from './views/mapaBase';
import { OherMaps } from './views/otherMaps';

function App() {
  
  return (
    <div className="App">
      <h1>Mini-tutorial de ArcGIS JS - ReactJS</h1>
      <Switch>
        <Route exact path="/" component={TabsComponent} />
        <Route path="/baseMap" component={BaseMapComponent} />
        <Route path="/other" component={OherMaps} />
      </Switch>
    </div>
  );
}

export default App;
