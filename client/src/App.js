import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx"
import LandingPage from './components/LandingPage/LandingPage';
import {NotFound} from './components/NotFound/NotFound';
import Detail from './components/Detail/Detail';
import CreateVideoGame from "./components/CreateVideoGame/CreateVideoGame.jsx";

function App() {
  return (
      <div className="App">

        
          <Route exact path="/" component={LandingPage} />
          <Route  path="/home" component= {Home} />
          <Route  path="/videogames/:id" component={Detail} />
          <Route  path="/create" component={CreateVideoGame} />
          {/* <Route path="/*" component={NotFound}/> */}
          <h1>Henry Videogames</h1>
      
      </div>
    
  );
}

export default App;
