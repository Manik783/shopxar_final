import React from 'react';

const partners = [
  { 
    name: 'Apple', 
    logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=150&h=50&q=80' 
  },
  { 
    name: 'Google', 
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=150&h=50&q=80' 
  },
  { 
    name: 'Amazon', 
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=150&h=50&q=80' 
  },
  { 
    name: 'Microsoft', 
    logo: 'https://images.unsplash.com/photo-1583339793403-3d9b001b6008?auto=format&fit=crop&w=150&h=50&q=80' 
  },
  { 
    name: 'Tesla', 
    logo: 'https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=150&h=50&q=80' 
  },
  { 
    name: 'Samsung', 
    logo: 'https://images.unsplash.com/photo-1662947995584-e2e162e12e5a?auto=format&fit=crop&w=150&h=50&q=80' 
  },
];

export default function Partners() {
  return (
    <section className="bg-[#181819] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#fff4e2] text-5xl font-bold mb-4">
            Backed & <span className="text-[#677870]">Supported</span> by
          </h2>
          <p className="text-[#fff4e2]/60 text-xl font-medium">
            Trusted by industry leaders worldwide
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="flex items-center justify-center bg-[#1e1e1f] p-8 rounded-2xl 
                hover:bg-[#242425] transition-all duration-300 group"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="max-h-12 object-contain grayscale opacity-50 
                  group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}