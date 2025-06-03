import Hero from "./components/Hero";
import ParkisonDetect from "./components/ParkinsonDetect";
import "./App.css";
import ChatBot from "./components/ChatBot";

const App = () => {
  return (
    <div className='w-full h-full bg-black'>
      <Hero />
      <ParkisonDetect />
    </div>
  );
};

export default App;
