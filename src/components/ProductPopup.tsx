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
    <div className="fixed inset-0 z-50 bg-[#3d3938]/75">
      <div className="bg-[#fff4e2] w-screen h-screen flex overflow-hidden">
        <div className="flex h-full w-full">
          {/* Left side - 3D Configurator */}
          <div className="w-2/3 h-full border-r border-[#3d3938]/10">
            <ProductConfigurator />
          </div>

          {/* Right side - Configuration Panel */}
          <div className="w-1/3 h-full flex flex-col bg-[#fff4e2]">
            {/* Header */}
            <div className="p-8 border-b border-[#3d3938]/10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-[#3d3938]">{product.title}</h2>
                  <p className="text-[#3d3938]/80 mt-2 text-lg">{product.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#3d3938]/60 hover:text-[#3d3938] transition-colors p-2"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#3d3938]/10">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-5 text-center font-medium text-lg transition-colors
                    ${activeTab === tab 
                      ? 'text-[#3d3938] border-b-2 border-[#3d3938]' 
                      : 'text-[#3d3938]/60 hover:text-[#3d3938]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Configuration Content */}
            <div className="flex-1 p-8">
              {activeTab === 'Size' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[#3d3938]">Size</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Small', 'Medium', 'Large', 'Extra Large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`p-6 rounded-xl border  text-left transition-all text-lg
                          ${selectedSize === size
                            ? 'border-[#3d3938] bg-[#3d3938] text-[#fff4e2]'
                            : 'border-[#3d3938] text-[#3d3938] hover:border-[#3d3938]/40 hover:bg-[#3d3938] hover:text-[#fff4e2]'
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
                  <h3 className="text-xl font-semibold text-[#3d3938]">Wood Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Pine', 'Oak', 'Maple', 'Walnut'].map((wood) => (
                      <button
                        key={wood}
                        onClick={() => setSelectedWood(wood)}
                        className={`p-6 rounded-xl border text-left transition-all text-lg
                          ${selectedWood === wood
                            ? 'border-[#3d3938] bg-[#3d3938] text-[#fff4e2]'
                            : 'border-[#3d3938] text-[#3d3938] hover:border-[#3d3938]/40 hover:bg-[#3d3938] hover:text-[#fff4e2]'
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
                  <h3 className="text-xl font-semibold text-[#3d3938]">Frame Color</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Black', 'Silver', 'Bronze', 'White'].map((frame) => (
                      <button
                        key={frame}
                        onClick={() => setSelectedFrame(frame)}
                        className={`p-6 rounded-xl border text-left transition-all text-lg
                          ${selectedFrame === frame
                            ? 'border-[#3d3938] bg-[#3d3938] text-[#fff4e2]'
                            : 'border-[#3d3938] text-[#3d3938] hover:border-[#3d3938]/40 hover:bg-[#3d3938] hover:text-[#fff4e2]'
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
                  <h3 className="text-xl font-semibold text-[#3d3938]">Your Configuration</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center py-4 border-b border-[#3d3938]/10">
                      <span className="text-lg text-[#3d3938]/80">Size</span>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-medium text-[#3d3938]">{selectedSize}</span>
                        <button 
                          onClick={() => setActiveTab('Size')}
                          className="p-1.5 rounded-md hover:bg-[#3d3938]/10 transition-colors"
                          title="Edit Size"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-[#3d3938]/10">
                      <span className="text-lg text-[#3d3938]/80">Wood</span>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-medium text-[#3d3938]">{selectedWood}</span>
                        <button 
                          onClick={() => setActiveTab('Wood')}
                          className="p-1.5 rounded-md hover:bg-[#3d3938]/10 transition-colors"
                          title="Edit Wood Type"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-[#3d3938]/10">
                      <span className="text-lg text-[#3d3938]/80">Frame</span>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-medium text-[#3d3938]">{selectedFrame}</span>
                        <button 
                          onClick={() => setActiveTab('Frame')}
                          className="p-1.5 rounded-md hover:bg-[#3d3938]/10 transition-colors"
                          title="Edit Frame Color"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-4">
                      <span className="text-lg text-[#3d3938]/80">Total</span>
                      <span className="text-2xl font-bold text-[#3d3938]">{product.price}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="p-8 border-t border-[#3d3938]/10">
              <div className="flex gap-4">
                <button className="flex-1 bg-[#3d3938] text-[#fff4e2] hover:bg-[#3d3938]/90 py-4 px-8 rounded-xl font-medium text-lg transition-colors">
                  Add to Cart
                </button>
                <button className="flex-1 border-2 border-[#3d3938] text-[#3d3938] py-4 px-8 rounded-xl font-medium text-lg hover:bg-[#3d3938] hover:text-[#fff4e2] transition-colors">
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