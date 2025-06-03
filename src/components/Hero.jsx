import React from "react";
import { waveImage } from "../assets/constants";

export default function Hero() {
  return (
    <div className='min-h-screen h-full w-full bg-black text-white'>
      {/* Navbar */}
      <header className='flex items-center justify-between px-6 py-4'>
        <h1 className='text-xl font-semibold text-blue-200'>NEURO-SPEAK</h1>
        {/* <nav className='space-x-6 hidden md:flex'>
          <a href='#' className='hover:text-gray-300'>
            Home
          </a>
          <a href='#' className='hover:text-gray-300'>
            About
          </a>
          <a href='#' className='hover:text-gray-300'>
            Future
          </a>
          <a href='#' className='hover:text-gray-300'>
            Roadmap
          </a>
        </nav> */}
        <div className='flex space-x-4'>
          <i className='fa-brands fa-github'></i>
          <i className='fa-brands fa-discord'></i>
          <i className='fa-brands fa-x-twitter'></i>
        </div>
      </header>
      {/* Hero Section */}
      <section className='text-center px-6 py-24 h-full'>
        <h2 className='text-4xl md:text-6xl font-bold'>
          <span className='bg-gradient-to-r from-pink-500 via-purple-400 to-blue-400 bg-clip-text text-transparent'>
            Detect Parkinson’s Through Your Voice Parameters.
          </span>
          <br />
          <span className='text-white'>
            Detect Early Signs of Parkinson’s Through Your Voice Data.
          </span>
        </h2>
        <p className='mt-6 text-gray-400 max-w-xl mx-auto'>
          Our AI-powered tool analyzes subtle variations in your voice to help
          identify early indicators of Parkinson’s disease — quickly,
          non-invasively, and with just a few seconds of speech.
        </p>
        {/* <div className='mt-8 flex justify-center space-x-4'>
          <button className='px-6 py-3 bg-blue-600 rounded-md hover:bg-blue-700 z-50'>
            Get started
          </button>
          <button className='px-6 py-3 bg-gradient-to-r from-purple-200 via-gray-300 to-purple-300 rounded-md text-black z-50'>
            Ecosystems
          </button>
        </div> */}
        <div className='absolute bottom-0 left-0 w-full h-screen'>
          {" "}
          <img
            src={waveImage} // Replace with actual path to the wave image
            alt='Gradient Wave'
            className=' w-full h-full'
          />
        </div>
      </section>
    </div>
  );
}
