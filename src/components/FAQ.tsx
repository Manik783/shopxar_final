import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Do I need any technical knowledge to integrate 3D AR in my website?',
    answer: 'No, our platform is designed to be user-friendly and requires no technical expertise. We provide simple embed codes and integration guides for all major e-commerce platforms.',
  },
  {
    question: 'I don\'t have a website. Can I still utilize 3D and AR visualizations for my products?',
    answer: 'Yes! We provide hosted solutions and shareable links that you can use across various platforms and social media.',
  },
  {
    question: 'How much time does it take?',
    answer: 'Most products can be transformed into 3D visualizations within 24-48 hours. Complex products might take longer depending on the detail required.',
  },
  {
    question: 'How are I charged?',
    answer: 'We offer flexible pricing plans based on your needs. You can choose from monthly subscriptions or pay-per-model options. Contact us for custom enterprise solutions.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-16 bg-[#0a0a0f]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Frequently Asked Questions</h2>
        <p className="text-gray-300 mb-12 text-center">Everything you need to know about our service</p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border-b border-gray-700 last:border-0"
            >
              <button
                className="w-full py-4 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="pb-4">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}