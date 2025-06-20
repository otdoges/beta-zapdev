"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Zap, BarChart3, ShoppingCart, Star } from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  category: string
  code: string
  featured: boolean
}

const templates: Template[] = [
  {
    id: 'hero-modern',
    name: 'Modern Hero Section',
    description: 'Clean hero section with gradient background',
    category: 'Landing Page',
    featured: true,
    code: `<section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
  <div class="absolute inset-0 bg-black/20"></div>
  <div class="relative z-10 text-center max-w-4xl mx-auto px-6">
    <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
      Build Amazing <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Experiences</span>
    </h1>
    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Create stunning web applications with modern design patterns and cutting-edge technology.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition-transform">
        Get Started
      </button>
      <button class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors">
        Learn More
      </button>
    </div>
  </div>
</section>`
  }
]

interface TemplateGalleryProps {
  onTemplateSelect: (template: Template) => void
  className?: string
}

export default function TemplateGallery({ onTemplateSelect, className }: TemplateGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className={`h-full bg-gray-900 text-white flex flex-col ${className}`}>
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Template Gallery</h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-colors group cursor-pointer"
              onClick={() => onTemplateSelect(template)}
            >
              <div className="aspect-video bg-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-gray-500" />
                </div>
                
                {template.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                <span className="text-xs text-gray-400">{template.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 