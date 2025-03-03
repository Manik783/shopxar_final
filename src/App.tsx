import React from 'react';
import Navbar from './components/Navbar';
import ARExperience from './components/ARExperience';
import Hero from './components/Hero';
import Compatibility from './components/Compatibility';
import LiveExamples from './components/LiveExamples';
import Journey from './components/Journey';
import Partners from './components/Partners';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';

function App() {
  return (
    <div className="min-h-screen site-gradient">
      <Navbar />
      <ARExperience />
      <Hero />
      <Compatibility />
      <LiveExamples />
      <Journey />
      <Partners />
      <FAQ />
      <CallToAction />
    </div>
  );
}

export default App;