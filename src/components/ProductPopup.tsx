import React from 'react';
import { X } from 'lucide-react';
import ProductConfigurator from './ProductConfigurator';

interface ProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    title: string;
    description: string;
    price: string;
    modelSrc: string;
    iosSrc: string;
  };
}

const ProductPopup: React.FC<ProductPopupProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-7xl bg-[#1a1a24] rounded-lg border border-gray-800 shadow-xl overflow-hidden my-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 text-white hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Left side - 3D Configurator */}
            <div className="w-full md:w-1/2">
              <ProductConfigurator />
            </div>

            {/* Right side - Product Details */}
            <div className="w-full md:w-1/2 p-6 site-gradient md:p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{product.title}</h2>
              <p className="text-gray-200 mb-6">{product.description}</p>
              <div className="text-2xl font-bold text-white mb-6">{product.price}</div>
              
              <div className="space-y-4">
                <button className="w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-600 transition-colors">
                  Add to Cart
                </button>
                <button className="w-full bg-white text-black border-2 font-semibold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup; 