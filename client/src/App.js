import React from "react";
import "./App.css";
import Buylist from "./components/buylist/Buylist";
import Foodplanner from "./components/foodplanner/Foodplanner";

function App() {
  return (
    <div className="container">
      <div id="updateContainer"></div>
      <Foodplanner />
      <Buylist />
    </div>
  );
}

export default App;
