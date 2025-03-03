import React from 'react';
import { ShoppingBag, Code, Box } from 'lucide-react';

const Compatibility = () => {
  const platforms = [
    { name: 'Shopify', icon: ShoppingBag },
    { name: 'Wix', icon: Code },
    { name: 'WooCommerce', icon: ShoppingBag },
    { name: 'Framer', icon: Box },
    { name: 'Webflow', icon: Code },
    { name: 'Magento', icon: ShoppingBag },
  ];

  return (
    <section className="py-6 md:py-8 site-gradient compatibility-section">
      <div className="gradient-container">
        <h2 className="text-center text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-4 md:mb-6">
          Compatible with
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-10">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <div 
                key={index} 
                className="flex items-center gap-1.5 md:gap-2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <Icon size={20} className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base font-medium">{platform.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Compatibility;