import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 site-gradient">
      <div className="max-w-3xl mx-auto px-4 bg-[#1a1a24]/50 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Ready to See the Difference?</h2>
        <p className="text-gray-300 text-center mb-8">
          Book a live 30-minute demonstration where we help you get started with 3D Visualization.
          Let's bring your products to life together!
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-[#4CAF50] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-[#45a049] transition-colors">
            <Calendar size={20} />
            Book a Demo Meeting
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-white hover:text-[#0a0a0f] transition-colors">
            Get Started Now
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;