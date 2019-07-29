import React from "react";
import NavBar from "./NavBar";
import ItemList from "./ItemList";
import "./App.css";



function App() {
  return (
      <div className="itemls-app">
          <header className="itemls-header">
              <NavBar />
          </header>
          <main className="itemls-main">
              <ItemList />
          </main>
      </div>
  );
}

export default App;