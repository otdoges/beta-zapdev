"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Layout, 
  Code, 
  Zap, 
  Target, 
  Sparkles,
  BarChart3,
  Eye,
  Layers,
  Palette
} from 'lucide-react'

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI Assistant Panel",
    description: "Get intelligent suggestions, code analysis, and interactive tutorials as you build.",
    color: "from-purple-500 to-violet-500",
    delay: 0.1
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Template Gallery", 
    description: "Choose from hundreds of professionally designed templates for any project type.",
    color: "from-blue-500 to-cyan-500",
    delay: 0.2
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Live Code Preview",
    description: "See your changes instantly with real-time preview and integrated Monaco editor.",
    color: "from-green-500 to-emerald-500",
    delay: 0.3
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Performance",
    description: "Optimized for speed with smart caching and instant hot reload capabilities.",
    color: "from-yellow-500 to-orange-500",
    delay: 0.4
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Smart Suggestions",
    description: "Context-aware AI recommendations for accessibility, performance, and best practices.",
    color: "from-pink-500 to-rose-500",
    delay: 0.5
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description: "Track your development progress with detailed analytics and usage statistics.",
    color: "from-indigo-500 to-purple-500",
    delay: 0.6
  }
]

export default function EnhancedFeatures() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0D0D10] to-[#1A0B2E]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-purple-400 mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide uppercase">Powerful Features</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Build Faster
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI-powered platform combines intelligent assistance with modern development tools 
            to help you create stunning web applications in minutes, not hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative h-full p-8 bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {React.cloneElement(feature.icon, { className: "w-6 h-6 text-white" })}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-purple-400 mb-4">
              <Eye className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide uppercase">Ready to Experience</span>
            </div>
            <h3 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              The Future of
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Web Development
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building amazing web applications 
              with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-purple-500/25 transition-shadow"
              >
                Start Building Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                View Live Demo
              </motion.button>
            </div>

            {/* Feature icons */}
            <div className="flex items-center justify-center gap-6 mt-12 opacity-60">
              <Layers className="w-6 h-6 text-purple-400" />
              <Palette className="w-6 h-6 text-pink-400" />
              <Code className="w-6 h-6 text-blue-400" />
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <Brain className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 