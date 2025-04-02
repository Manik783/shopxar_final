import React from 'react';

const steps = [
  {
    title: 'Upload Files',
    description: 'Simply upload your 3D files or product photos. We support all major 3D and image formats.',
    image: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&w=400',
  },
  {
    title: 'Configure & Design',
    description: 'Customize materials, lighting, and environments to match your brand identity.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=400',
  },
  {
    title: 'Integrate',
    description: 'Seamlessly embed your 3D products into your website with our simple integration.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400',
  },
  {
    title: 'Track & Optimize',
    description: 'Monitor engagement and optimize your 3D assets based on analytics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400',
  },
];

export default function Journey() {
  return (
    <section className="bg-[#181819] py-20">
      <div className="text-center">
        <h2 className="text-[#fff4e2] text-6xl justify-center font-bold mb-4">
          Simple & Easy <span className="text-[#677870]">Journey</span>
        </h2>
        <p className="text-[#fff4e2]/60 text-center text-2xl font-medium mb-16">
          Get started with our straightforward process
        </p>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="absolute left-1/2 h-full w-0.5 bg-[#677870]/20"></div>
          
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-12">
                    <div className="bg-[#1e1e1f] rounded-2xl overflow-hidden shadow-lg hover:shadow-[#677870]/10 transition-shadow duration-300">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full aspect-video object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-[#677870] border-4 border-[#181819] shadow-[0_0_0_2px_#677870/20]"></div>
                  </div>
                  
                  <div className="w-1/2 px-12">
                    <h3 className="text-2xl font-bold text-[#fff4e2] mb-3">{step.title}</h3>
                    <p className="text-[#fff4e2]/70 text-lg">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}