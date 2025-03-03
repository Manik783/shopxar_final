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
    <div className="py-16 bg-[#121218]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Backed & Supported by</h2>
        <p className="text-gray-300 mb-12 text-center">Trusted by industry leaders worldwide</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="flex items-center justify-center bg-[#1a1a24] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="max-h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}