import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
    </div>
  );
}

export default App;
