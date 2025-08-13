"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Script from "next/script";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * SEO-optimized breadcrumb component with structured data
 */
export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  // Generate BreadcrumbList structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://calcnest.com",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        ...(item.href && { item: `https://calcnest.com${item.href}` }),
      })),
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Visual Breadcrumb */}
      <nav
        className={`${className}`}
        aria-label="Breadcrumb"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol className="flex items-center space-x-2 text-sm">
          {/* Home Link */}
          <li itemScope itemType="https://schema.org/ListItem">
            <Link
              href="/"
              className="flex items-center text-gray-500 hover:text-purple-600 transition-colors duration-200"
              itemProp="item"
            >
              <Home className="w-4 h-4 mr-1" />
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>

          {/* Breadcrumb Items */}
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              ) : (
                <span
                  className="text-gray-900 font-medium"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.name}
                </span>
              )}
              <meta itemProp="position" content={(index + 2).toString()} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
