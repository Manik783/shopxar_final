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
    question: 'How am I charged?',
    answer: 'We offer flexible pricing plans based on your needs. You can choose from monthly subscriptions or pay-per-model options. Contact us for custom enterprise solutions.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#181819] py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#fff4e2] text-5xl font-bold mb-4">
            Frequently Asked <span className="text-[#677870]">Questions</span>
          </h2>
          <p className="text-[#fff4e2]/60 text-xl font-medium">
            Everything you need to know about our service
          </p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-[#1e1e1f] rounded-2xl overflow-hidden transition-all duration-300
                hover:bg-[#242425] hover:shadow-lg hover:shadow-[#677870]/5"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-[#fff4e2] group-hover:text-[#677870] transition-colors">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#677870]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#fff4e2]/60 group-hover:text-[#677870] transition-colors" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-[#fff4e2]/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}