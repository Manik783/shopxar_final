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
    <div className="py-16 md:py-24 site-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple & Easy Journey</h2>
        <p className="text-gray-300 mb-12">Get started with our straightforward process</p>
        
        <div className="relative">
          <div className="absolute left-1/2 h-full w-0.5 bg-[#4CAF50]/20"></div>
          
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className="bg-[#1a1a24]/50 rounded-xl overflow-hidden shadow-md">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-[#4CAF50] border-4 border-[#121218] shadow"></div>
                  </div>
                  
                  <div className="w-1/2 px-8">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}