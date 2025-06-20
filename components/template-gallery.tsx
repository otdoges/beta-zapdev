"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Eye, 
  Copy, 
  Download,
  Heart,
  Star,
  Zap,
  Smartphone,
  Monitor,
  ShoppingCart,
  Users,
  BarChart3,
  Calendar,
  Mail,
  FileText,
  Camera,
  Music,
  Gamepad2,
  Briefcase
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Template {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  preview: string
  code: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  popularity: number
  featured: boolean
  responsive: boolean
  icon: React.ReactNode
}

interface TemplateGalleryProps {
  onTemplateSelect: (template: Template) => void
  className?: string
}

const templates: Template[] = [
  {
    id: 'hero-modern',
    name: 'Modern Hero Section',
    description: 'Clean hero section with gradient background and call-to-action',
    category: 'Landing Page',
    tags: ['hero', 'gradient', 'modern', 'responsive'],
    difficulty: 'Beginner',
    popularity: 95,
    featured: true,
    responsive: true,
    icon: <Zap className="w-4 h-4" />,
    preview: '/api/placeholder/400/240',
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
  },
  {
    id: 'dashboard-analytics',
    name: 'Analytics Dashboard',
    description: 'Complete dashboard with sidebar, charts, and statistics cards',
    category: 'Dashboard',
    tags: ['dashboard', 'analytics', 'charts', 'sidebar'],
    difficulty: 'Intermediate',
    popularity: 88,
    featured: true,
    responsive: true,
    icon: <BarChart3 className="w-4 h-4" />,
    preview: '/api/placeholder/400/240',
    code: `<div class="min-h-screen bg-gray-100 flex">
  <!-- Sidebar -->
  <div class="w-64 bg-white shadow-lg">
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-800">Dashboard</h2>
    </div>
    <nav class="mt-6">
      <a href="#" class="block px-6 py-3 text-gray-700 bg-purple-50 border-r-4 border-purple-500">Analytics</a>
      <a href="#" class="block px-6 py-3 text-gray-600 hover:bg-gray-50">Users</a>
      <a href="#" class="block px-6 py-3 text-gray-600 hover:bg-gray-50">Sales</a>
      <a href="#" class="block px-6 py-3 text-gray-600 hover:bg-gray-50">Settings</a>
    </nav>
  </div>
  
  <!-- Main Content -->
  <div class="flex-1 p-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Analytics Overview</h1>
    
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Total Users</p>
            <p class="text-3xl font-bold text-gray-800">12,345</p>
          </div>
          <div class="bg-blue-100 p-3 rounded-full">
            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center">
          <span class="text-green-500 text-sm font-medium">+12%</span>
          <span class="text-gray-600 text-sm ml-2">from last month</span>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Revenue</p>
            <p class="text-3xl font-bold text-gray-800">$45,678</p>
          </div>
          <div class="bg-green-100 p-3 rounded-full">
            <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center">
          <span class="text-green-500 text-sm font-medium">+8%</span>
          <span class="text-gray-600 text-sm ml-2">from last month</span>
        </div>
      </div>
    </div>
    
    <!-- Chart Area -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-xl font-bold text-gray-800 mb-4">Monthly Growth</h3>
      <div class="h-64 bg-gray-50 rounded flex items-center justify-center">
        <p class="text-gray-500">Chart visualization would go here</p>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'ecommerce-product',
    name: 'Product Showcase',
    description: 'E-commerce product page with image gallery and details',
    category: 'E-commerce',
    tags: ['product', 'ecommerce', 'gallery', 'shopping'],
    difficulty: 'Intermediate',
    popularity: 82,
    featured: false,
    responsive: true,
    icon: <ShoppingCart className="w-4 h-4" />,
    preview: '/api/placeholder/400/240',
    code: `<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-6xl mx-auto px-6">
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <!-- Image Gallery -->
        <div class="p-8">
          <div class="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
            <img src="/api/placeholder/500/500" alt="Product" class="w-full h-full object-cover">
          </div>
          <div class="grid grid-cols-4 gap-3">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-purple-500">
              <img src="/api/placeholder/100/100" alt="Thumbnail" class="w-full h-full object-cover">
            </div>
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img src="/api/placeholder/100/100" alt="Thumbnail" class="w-full h-full object-cover">
            </div>
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img src="/api/placeholder/100/100" alt="Thumbnail" class="w-full h-full object-cover">
            </div>
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img src="/api/placeholder/100/100" alt="Thumbnail" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
        
        <!-- Product Details -->
        <div class="p-8">
          <div class="mb-4">
            <span class="text-purple-600 text-sm font-medium">Premium Collection</span>
            <h1 class="text-3xl font-bold text-gray-900 mt-2">Wireless Headphones</h1>
          </div>
          
          <div class="flex items-center gap-4 mb-6">
            <div class="flex text-yellow-400">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            </div>
            <span class="text-gray-600">4.8 (124 reviews)</span>
          </div>
          
          <div class="mb-6">
            <div class="flex items-center gap-3">
              <span class="text-3xl font-bold text-gray-900">$299</span>
              <span class="text-xl text-gray-500 line-through">$399</span>
              <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">25% OFF</span>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="font-semibold text-gray-900 mb-3">Color</h3>
            <div class="flex gap-3">
              <button class="w-8 h-8 bg-black rounded-full border-2 border-gray-900"></button>
              <button class="w-8 h-8 bg-white rounded-full border-2 border-gray-300"></button>
              <button class="w-8 h-8 bg-blue-500 rounded-full border-2 border-transparent"></button>
            </div>
          </div>
          
          <div class="flex gap-4 mb-8">
            <button class="flex-1 bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
              Add to Cart
            </button>
            <button class="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>
          
          <div class="text-gray-600 text-sm">
            <p>✓ Free shipping on orders over $100</p>
            <p>✓ 30-day money-back guarantee</p>
            <p>✓ 2-year warranty included</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'portfolio-personal',
    name: 'Personal Portfolio',
    description: 'Clean portfolio layout for developers and designers',
    category: 'Portfolio',
    tags: ['portfolio', 'personal', 'developer', 'showcase'],
    difficulty: 'Beginner',
    popularity: 76,
    featured: false,
    responsive: true,
    icon: <Briefcase className="w-4 h-4" />,
    preview: '/api/placeholder/400/240',
    code: `<div class="min-h-screen bg-white">
  <!-- Header -->
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">John Doe</h1>
        <nav class="hidden md:flex space-x-8">
          <a href="#about" class="text-gray-600 hover:text-gray-900">About</a>
          <a href="#projects" class="text-gray-600 hover:text-gray-900">Projects</a>
          <a href="#skills" class="text-gray-600 hover:text-gray-900">Skills</a>
          <a href="#contact" class="text-gray-600 hover:text-gray-900">Contact</a>
        </nav>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-5xl font-bold text-gray-900 mb-6">
            Full-Stack <span class="text-purple-600">Developer</span>
          </h2>
          <p class="text-xl text-gray-600 mb-8">
            I create beautiful, functional web applications using modern technologies. 
            Passionate about clean code and exceptional user experiences.
          </p>
          <div class="flex gap-4">
            <button class="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              View My Work
            </button>
            <button class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Download CV
            </button>
          </div>
        </div>
        <div class="relative">
          <div class="w-80 h-80 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto"></div>
          <img src="/api/placeholder/300/300" alt="Profile" class="absolute inset-0 w-80 h-80 object-cover rounded-full mx-auto">
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <h3 class="text-3xl font-bold text-center text-gray-900 mb-12">Featured Projects</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img src="/api/placeholder/400/200" alt="Project" class="w-full h-48 object-cover">
          <div class="p-6">
            <h4 class="text-xl font-semibold text-gray-900 mb-2">E-commerce Platform</h4>
            <p class="text-gray-600 mb-4">Modern online store with React and Node.js</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">React</span>
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Node.js</span>
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">MongoDB</span>
            </div>
            <a href="#" class="text-purple-600 font-semibold hover:text-purple-700">View Project →</a>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img src="/api/placeholder/400/200" alt="Project" class="w-full h-48 object-cover">
          <div class="p-6">
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Task Management App</h4>
            <p class="text-gray-600 mb-4">Collaborative project management tool</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Vue.js</span>
              <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Laravel</span>
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">MySQL</span>
            </div>
            <a href="#" class="text-purple-600 font-semibold hover:text-purple-700">View Project →</a>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img src="/api/placeholder/400/200" alt="Project" class="w-full h-48 object-cover">
          <div class="p-6">
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Weather Dashboard</h4>
            <p class="text-gray-600 mb-4">Real-time weather tracking application</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">React</span>
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Express</span>
              <span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">API</span>
            </div>
            <a href="#" class="text-purple-600 font-semibold hover:text-purple-700">View Project →</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>`
  },
  {
    id: 'mobile-app-landing',
    name: 'Mobile App Landing',
    description: 'App landing page with features and download buttons',
    category: 'Landing Page',
    tags: ['mobile', 'app', 'landing', 'download'],
    difficulty: 'Intermediate',
    popularity: 71,
    featured: false,
    responsive: true,
    icon: <Smartphone className="w-4 h-4" />,
    preview: '/api/placeholder/400/240',
    code: `<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  <!-- Header -->
  <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
          <h1 class="text-xl font-bold text-gray-900">AppName</h1>
        </div>
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-gray-600 hover:text-gray-900">Features</a>
          <a href="#pricing" class="text-gray-600 hover:text-gray-900">Pricing</a>
          <a href="#contact" class="text-gray-600 hover:text-gray-900">Contact</a>
          <button class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Download
          </button>
        </nav>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-5xl font-bold text-gray-900 mb-6">
            The App That <span class="text-blue-600">Changes Everything</span>
          </h2>
          <p class="text-xl text-gray-600 mb-8">
            Experience the future of productivity with our revolutionary mobile application. 
            Designed for modern professionals who demand excellence.
          </p>
          
          <!-- Download Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <a href="#" class="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              <div class="text-left">
                <div class="text-xs">Download on the</div>
                <div class="font-semibold">App Store</div>
              </div>
            </a>
            
            <a href="#" class="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div class="text-left">
                <div class="text-xs">Get it on</div>
                <div class="font-semibold">Google Play</div>
              </div>
            </a>
          </div>
          
          <!-- Stats -->
          <div class="flex gap-8">
            <div>
              <div class="text-2xl font-bold text-gray-900">1M+</div>
              <div class="text-gray-600">Downloads</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-900">4.8</div>
              <div class="text-gray-600">Rating</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-900">50K+</div>
              <div class="text-gray-600">Reviews</div>
            </div>
          </div>
        </div>
        
        <!-- Phone Mockup -->
        <div class="relative">
          <div class="relative mx-auto w-80 h-96 bg-gray-900 rounded-3xl p-2">
            <div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl overflow-hidden">
              <img src="/api/placeholder/300/400" alt="App Screenshot" class="w-full h-full object-cover">
            </div>
          </div>
          <!-- Floating elements -->
          <div class="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <span class="text-xl">⭐</span>
          </div>
          <div class="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
            <span class="text-lg">✓</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-20 bg-white">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16">
        <h3 class="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h3>
        <p class="text-xl text-gray-600">Everything you need to boost your productivity</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h4 class="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h4>
          <p class="text-gray-600">Optimized performance for instant responses and smooth interactions.</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h4 class="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h4>
          <p class="text-gray-600">End-to-end encryption keeps your data safe and private.</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h4 class="text-xl font-semibold text-gray-900 mb-2">User Friendly</h4>
          <p class="text-gray-600">Intuitive design that makes complex tasks simple and enjoyable.</p>
        </div>
      </div>
    </div>
  </section>
</div>`
  }
]

export default function TemplateGallery({ onTemplateSelect, className }: TemplateGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(templates.map(t => t.category))]
    return cats
  }, [])

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'All' || template.difficulty === selectedDifficulty
      const matchesFeatured = !showFeaturedOnly || template.featured

      return matchesSearch && matchesCategory && matchesDifficulty && matchesFeatured
    }).sort((a, b) => b.popularity - a.popularity)
  }, [searchTerm, selectedCategory, selectedDifficulty, showFeaturedOnly])

  return (
    <div className={cn("h-full bg-gray-900 text-white flex flex-col", className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Template Gallery</h2>
        
        {/* Search */}
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

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              showFeaturedOnly
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
            )}
          >
            <Star className="w-4 h-4 inline mr-1" />
            Featured
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-colors group cursor-pointer"
                onClick={() => onTemplateSelect(template)}
              >
                {/* Preview Image */}
                <div className="aspect-video bg-gray-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-gray-500">{template.icon}</div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Preview functionality
                        }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(template.code)
                        }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {template.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Popularity Score */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {template.popularity}%
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {template.name}
                    </h3>
                    {template.responsive && (
                      <div className="bg-green-500/10 text-green-400 p-1 rounded">
                        <Monitor className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {template.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{template.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{template.category}</span>
                      <span className="text-gray-600">•</span>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        template.difficulty === 'Beginner' && "bg-green-500/10 text-green-400",
                        template.difficulty === 'Intermediate' && "bg-yellow-500/10 text-yellow-400",
                        template.difficulty === 'Advanced' && "bg-red-500/10 text-red-400"
                      )}>
                        {template.difficulty}
                      </span>
                    </div>
                    <button className="text-purple-400 hover:text-purple-300 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No templates found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
} 