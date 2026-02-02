"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = ({ faqs = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!faqs.length) return null;

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="mt-20 max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={faq._id || index}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>

              {/* Answer */}
              {isOpen && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
