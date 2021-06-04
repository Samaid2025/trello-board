import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import logo from './logo.svg';
import Board from './features/boards';
import Header from './features/header';
import BoardDetails from './features/boardDetails';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/board">
            <BoardDetails />
          </Route>
          <Route path="/">
            <Board />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
