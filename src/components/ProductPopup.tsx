import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('Size');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [selectedWood, setSelectedWood] = useState('Pine');
  const [selectedFrame, setSelectedFrame] = useState('Black');

  if (!isOpen) return null;

  const tabs = ['Size', 'Wood', 'Frame', 'Summary'];

  return (
    <div className="fixed inset-0 z-50 bg-[#1a1a24]">
      <div className="flex h-full">
        {/* Left side - 3D Configurator */}
        <div className="w-2/3 h-full border-r border-gray-800">
          <div className="h-full">
            <ProductConfigurator />
          </div>
        </div>

        {/* Right side - Configuration Panel */}
        <div className="w-1/3 h-full flex flex-col site-gradient from-[#1a1a24] to-[#121218]">
          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex justify-between  items-center">
              <h2 className="text-2xl font-bold text-white">{product.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-400 mt-2">{product.description}</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-center font-medium transition-colors
                  ${activeTab === tab 
                    ? 'text-white border-b-2 border-purple-600' 
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          
          {/* Configuration Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'Size' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Size</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Small', 'Medium', 'Large', 'Extra Large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-4 rounded-lg border text-left transition-all
                        ${selectedSize === size
                          ? 'border-purple-900 bg-purple-900/10 text-white'
                          : 'border-gray-700 text-gray-400 hover:border-gray-600'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Wood' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Wood Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Pine', 'Oak', 'Maple', 'Walnut'].map((wood) => (
                    <button
                      key={wood}
                      onClick={() => setSelectedWood(wood)}
                      className={`p-4 rounded-lg border text-left transition-all
                        ${selectedWood === wood
                          ? 'border-purple-600 bg-purple-600/10 text-white'
                          : 'border-gray-700 text-gray-400 hover:border-gray-600'
                        }`}
                    >
                      {wood}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Frame' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Frame Color</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Black', 'Silver', 'Bronze', 'White'].map((frame) => (
                    <button
                      key={frame}
                      onClick={() => setSelectedFrame(frame)}
                      className={`p-4 rounded-lg border text-left transition-all
                        ${selectedFrame === frame
                          ? 'border-purple-600 bg-purple-600/10 text-white'
                          : 'border-gray-700 text-gray-400 hover:border-gray-600'
                        }`}
                    >
                      {frame}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Summary' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Your Configuration</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400">Size</span>
                    <span className="text-white">{selectedSize}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400">Wood</span>
                    <span className="text-white">{selectedWood}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400">Frame</span>
                    <span className="text-white">{selectedFrame}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Total</span>
                    <span className="text-xl font-bold text-white">{product.price}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="p-6 border-t border-gray-800">
            <div className="flex gap-4">
              <button className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Add to Cart
              </button>
              <button className="flex-1 border border-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup; 