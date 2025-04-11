import React from "react";
import Hero from "./components/Hero";
import ParkisonDetect from "./components/ParkinsonDetect";
import "./App.css";

const App = () => {
  return (
    <div className='w-full h-full'>
      <Hero />
      <ParkisonDetect />
    </div>
  );
};

export default App;
