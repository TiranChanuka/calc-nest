"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQ[];
  className?: string;
  searchable?: boolean;
}

/**
 * AEO-optimized FAQ component for better search engine understanding
 */
export default function FAQSection({
  title = "Frequently Asked Questions",
  faqs,
  className = "",
  searchable = true,
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = searchable
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqs;

  return (
    <section
      className={`py-12 ${className}`}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our health calculators
          </p>
        </div>

        {searchable && (
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-10 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                aria-label="Search FAQ"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                aria-expanded={openItems.has(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <h3
                  className="text-lg font-semibold text-gray-900 pr-4"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.has(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>

              {openItems.has(index) && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-6 pb-4"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <div
                    className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                    itemProp="text"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              No questions found matching &ldquo;{searchTerm}&rdquo;
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        <div className="mt-8 p-6 bg-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-purple-700 mb-4">
            Our health calculators are designed to provide accurate estimates,
            but they should not replace professional medical advice.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Contact Support
            </a>
            <a
              href="/disclaimer"
              className="inline-flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200"
            >
              Medical Disclaimer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
