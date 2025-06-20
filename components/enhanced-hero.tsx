"use client"

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { 
  Sparkles, 
  Code, 
  Zap, 
  Brain, 
  Layout, 
  Palette, 
  Rocket,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react'

interface EnhancedHeroProps {
  onGetStarted?: () => void
  onWatchDemo?: () => void
}

export default function EnhancedHero({ onGetStarted, onWatchDemo }: EnhancedHeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const backgroundX = useTransform(mouseX, [0, 1000], [0, -50])
  const backgroundY = useTransform(mouseY, [0, 1000], [0, -50])

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const features = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "AI-Powered Development",
      description: "Generate complete web applications with intelligent AI assistance"
    },
    {
      icon: <Layout className="w-5 h-5" />,
      title: "Template Gallery",
      description: "Choose from hundreds of professionally designed templates"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Live Preview",
      description: "See your changes instantly with real-time preview"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast",
      description: "Build and deploy in minutes, not hours"
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0D0D10] via-[#1A0B2E] to-[#16213E]">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
          x: backgroundX,
          y: backgroundY
        }}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+Cjwvc3ZnPgo=')] opacity-20" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-purple-500 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-32 w-3 h-3 bg-blue-500 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute bottom-32 left-40 w-5 h-5 bg-pink-500 rounded-full"
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.7, 0.2]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wide uppercase">AI-Powered Development</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Build </span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Amazing
                </span>
                <br />
                <span className="text-white">Web Apps</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                Transform your ideas into stunning web applications with our AI-powered development platform. 
                No coding experience required.
              </p>
            </motion.div>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-3"
            >
              {features.slice(0, 2).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400">
                    {feature.icon}
                  </div>
                  <div>
                    <span className="font-medium text-white">{feature.title}</span>
                    <span className="text-gray-400 ml-2">— {feature.description}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={onGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Building
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              
              <motion.button
                onClick={onWatchDemo}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </span>
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-[#0D0D10]"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">10,000+ developers</span>
              </div>
              
              <div className="flex items-center gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-400 ml-2">4.9/5 rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            {/* Mock Interface */}
            <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="text-sm text-gray-400">ZapDev Studio</div>
              </div>

              {/* Chat Interface Mock */}
              <div className="space-y-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-800 rounded-2xl px-4 py-3 max-w-xs">
                    <p className="text-sm text-gray-300">
                      I'll help you create a modern landing page with hero section and features.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="flex gap-3 justify-end"
                >
                  <div className="bg-purple-600 rounded-2xl px-4 py-3 max-w-xs">
                    <p className="text-sm text-white">
                      Create a landing page for a SaaS product
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gray-700 rounded-full" />
                </motion.div>
              </div>

              {/* Code Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 }}
                className="bg-gray-950 rounded-lg p-4 font-mono text-xs"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Generated Code</span>
                </div>
                <div className="space-y-2 text-gray-400">
                  <div><span className="text-blue-400">&lt;section</span> <span className="text-purple-400">className</span>=<span className="text-green-400">"hero"</span><span className="text-blue-400">&gt;</span></div>
                  <div className="pl-4"><span className="text-blue-400">&lt;h1</span> <span className="text-purple-400">className</span>=<span className="text-green-400">"title"</span><span className="text-blue-400">&gt;</span></div>
                  <div className="pl-8">Build Amazing Apps</div>
                  <div className="pl-4"><span className="text-blue-400">&lt;/h1&gt;</span></div>
                  <div className="pl-4">...</div>
                  <div><span className="text-blue-400">&lt;/section&gt;</span></div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-green-500 text-white p-2 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, type: "spring" }}
              >
                <CheckCircle className="w-4 h-4" />
              </motion.div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
} 