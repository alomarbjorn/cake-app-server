import React from "react";
import { Router } from "@reach/router";
import NavBar from "./NavBar";
import ItemList from "./ItemList";
import Cart from "./Cart";
import Administrator from "./Administrator";
import NotFound from "./NotFound";
import "./App.css";



function App() {
  return (
      <div className="itemls-app">
          <header className="itemls-header">
              <NavBar />
          </header>
          <main className="itemls-main">
              <Router>
                  <ItemList path="/" />
                  <Cart path="/Cart" />
                  <Administrator path="/Administrator" />
                  <NotFound default />
              </Router>
          </main>
      </div>
  );
}

export default App;