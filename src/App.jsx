import React from "react";
import Hero from "./components/Hero";
import Analysis from "./components/VoiceSentiment";
import "./App.css";

const App = () => {
  return (
    <div className='w-full h-full'>
      <Hero />
      <Analysis />
    </div>
  );
};

export default App;
