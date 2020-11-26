import './App.css'
import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Login from './Components/Login';
import { useStateValue } from './Components/StateProvider';
function App() {
  const [{user},dispatch]=useStateValue();
  return (
    // BEM Naming Convention
    <div className="app">
      {!user ? (
        <Login/>
        
      ) : (
          <div className="app__body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route path='/'>
                  <Chat />
                </Route>

              </Switch>
            </Router>
          </div>


        )}
    </div>
  )
}

export default App;
