import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-b from-[#fff4e2] to-[#f5e6d3]">
      <div className="container">
        <h2 className="text-[#3d3938] text-3xl font-bold mb-4 text-center">
          Ready to See the Difference?
        </h2>
        <p className="text-[#3d3938]/80 text-center mb-8">
          Book a live 30-minute demonstration where we help you get started with 3D Visualization.
          Let's bring your products to life together!
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-[#3d3938] text-[#fff4e2] hover:bg-[#3d3938]/90 px-6 py-3 rounded-lg font-medium flex items-center gap-2">
            <Calendar size={20} />
            Book a Demo Meeting
          </button>
          <button className="border-2 border-[#3d3938] text-[#3d3938] px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-[#3d3938] hover:text-[#fff4e2] transition-colors">
            Get Started Now
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;