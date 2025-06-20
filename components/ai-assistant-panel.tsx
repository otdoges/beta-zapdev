"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  Lightbulb, 
  Code2, 
  Zap, 
  BookOpen, 
  Target,
  TrendingUp,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronRight,
  Brain,
  Rocket
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIAssistantPanelProps {
  currentCode: string
  chatHistory: any[]
  onSuggestionClick: (suggestion: string) => void
  className?: string
}

interface Suggestion {
  id: string
  type: 'optimization' | 'feature' | 'tutorial' | 'best-practice'
  icon: React.ReactNode
  title: string
  description: string
  action: string
  priority: 'high' | 'medium' | 'low'
  category: string
}

export default function AIAssistantPanel({ 
  currentCode, 
  chatHistory, 
  onSuggestionClick,
  className 
}: AIAssistantPanelProps) {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'analysis' | 'tutorials'>('suggestions')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [codeAnalysis, setCodeAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Generate contextual suggestions based on current code
  const generateSuggestions = useMemo(() => {
    const newSuggestions: Suggestion[] = []
    
    if (currentCode) {
      // Accessibility suggestions
      if (!currentCode.includes('alt=')) {
        newSuggestions.push({
          id: 'accessibility-alt',
          type: 'best-practice',
          icon: <Target className="w-4 h-4" />,
          title: 'Add Alt Text',
          description: 'Images should have descriptive alt text for accessibility',
          action: 'Add alt attributes to images',
          priority: 'high',
          category: 'Accessibility'
        })
      }

      // Performance suggestions
      if (currentCode.includes('<img') && !currentCode.includes('loading="lazy"')) {
        newSuggestions.push({
          id: 'performance-lazy',
          type: 'optimization',
          icon: <Zap className="w-4 h-4" />,
          title: 'Lazy Loading',
          description: 'Add lazy loading to improve page performance',
          action: 'Add loading="lazy" to images',
          priority: 'medium',
          category: 'Performance'
        })
      }

      // Responsive design suggestions
      if (!currentCode.includes('responsive') && !currentCode.includes('md:') && !currentCode.includes('sm:')) {
        newSuggestions.push({
          id: 'responsive-design',
          type: 'feature',
          icon: <TrendingUp className="w-4 h-4" />,
          title: 'Responsive Design',
          description: 'Make your design responsive for mobile devices',
          action: 'Add responsive Tailwind classes',
          priority: 'high',
          category: 'Design'
        })
      }

      // Interactive elements
      if (!currentCode.includes('hover:') && currentCode.includes('button')) {
        newSuggestions.push({
          id: 'interactive-hover',
          type: 'feature',
          icon: <Sparkles className="w-4 h-4" />,
          title: 'Interactive Effects',
          description: 'Add hover effects to improve user experience',
          action: 'Add hover states to buttons',
          priority: 'medium',
          category: 'UX'
        })
      }

      // SEO suggestions
      if (!currentCode.includes('<meta') && currentCode.includes('<html')) {
        newSuggestions.push({
          id: 'seo-meta',
          type: 'best-practice',
          icon: <Target className="w-4 h-4" />,
          title: 'SEO Meta Tags',
          description: 'Add meta tags for better search engine optimization',
          action: 'Add title and description meta tags',
          priority: 'medium',
          category: 'SEO'
        })
      }
    }

    // General suggestions if no code
    if (!currentCode.trim()) {
      newSuggestions.push(
        {
          id: 'start-landing',
          type: 'tutorial',
          icon: <Rocket className="w-4 h-4" />,
          title: 'Create Landing Page',
          description: 'Build a modern landing page with hero section',
          action: 'Create a beautiful landing page with hero, features, and CTA',
          priority: 'high',
          category: 'Getting Started'
        },
        {
          id: 'start-dashboard',
          type: 'tutorial',
          icon: <Brain className="w-4 h-4" />,
          title: 'Build Dashboard',
          description: 'Create an admin dashboard with charts and tables',
          action: 'Generate a modern dashboard interface',
          priority: 'medium',
          category: 'Getting Started'
        },
        {
          id: 'start-ecommerce',
          type: 'tutorial',
          icon: <Code2 className="w-4 h-4" />,
          title: 'E-commerce Page',
          description: 'Design a product page or shopping cart',
          action: 'Create an e-commerce product listing page',
          priority: 'medium',
          category: 'Getting Started'
        }
      )
    }

    return newSuggestions
  }, [currentCode])

  useEffect(() => {
    setSuggestions(generateSuggestions)
  }, [generateSuggestions])

  // Analyze code complexity and structure
  useEffect(() => {
    if (currentCode.trim()) {
      setIsAnalyzing(true)
      
      // Simple code analysis (could be enhanced with actual analysis)
      setTimeout(() => {
        const analysis = {
          lines: currentCode.split('\n').length,
          complexity: currentCode.includes('function') ? 'Medium' : 'Low',
          elements: (currentCode.match(/<[^>]+>/g) || []).length,
          classes: (currentCode.match(/class="[^"]*"/g) || []).length,
          accessibility: {
            score: currentCode.includes('alt=') ? 85 : 65,
            issues: !currentCode.includes('alt=') ? ['Missing alt attributes'] : []
          },
          performance: {
            score: currentCode.includes('loading="lazy"') ? 90 : 75,
            suggestions: !currentCode.includes('loading="lazy"') ? ['Add lazy loading'] : []
          }
        }
        
        setCodeAnalysis(analysis)
        setIsAnalyzing(false)
      }, 1000)
    }
  }, [currentCode])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/10'
      case 'medium': return 'text-yellow-400 bg-yellow-500/10'
      case 'low': return 'text-green-400 bg-green-500/10'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Zap className="w-3 h-3" />
      case 'feature': return <Sparkles className="w-3 h-3" />
      case 'tutorial': return <BookOpen className="w-3 h-3" />
      case 'best-practice': return <Target className="w-3 h-3" />
      default: return <Info className="w-3 h-3" />
    }
  }

  return (
    <div className={cn("h-full bg-gray-900/50 border-l border-gray-700", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-5 h-5 text-violet-400" />
          <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'suggestions', label: 'Suggestions', icon: <Lightbulb className="w-4 h-4" /> },
            { id: 'analysis', label: 'Analysis', icon: <Code2 className="w-4 h-4" /> },
            { id: 'tutorials', label: 'Tutorials', icon: <BookOpen className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'suggestions' && (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-violet-500/50 transition-colors cursor-pointer group"
                    onClick={() => onSuggestionClick(suggestion.action)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("p-2 rounded-lg", getPriorityColor(suggestion.priority))}>
                        {suggestion.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">
                            {suggestion.title}
                          </h4>
                          <span className={cn("px-2 py-1 text-xs rounded-full", getPriorityColor(suggestion.priority))}>
                            {suggestion.priority}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{suggestion.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-violet-400">{suggestion.category}</span>
                          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-violet-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No suggestions available</p>
                  <p className="text-xs text-gray-500 mt-1">Start coding to get AI-powered suggestions</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {isAnalyzing ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-3"></div>
                  <p className="text-gray-400">Analyzing your code...</p>
                </div>
              ) : codeAnalysis ? (
                <div className="space-y-4">
                  {/* Code Metrics */}
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-3">Code Metrics</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-400">Lines:</span>
                        <span className="text-white ml-2">{codeAnalysis.lines}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Elements:</span>
                        <span className="text-white ml-2">{codeAnalysis.elements}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Complexity:</span>
                        <span className="text-white ml-2">{codeAnalysis.complexity}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Classes:</span>
                        <span className="text-white ml-2">{codeAnalysis.classes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Accessibility Score */}
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-3">Accessibility</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${codeAnalysis.accessibility.score}%` }}
                        />
                      </div>
                      <span className="text-sm text-white">{codeAnalysis.accessibility.score}%</span>
                    </div>
                    {codeAnalysis.accessibility.issues.length > 0 && (
                      <div className="space-y-1">
                        {codeAnalysis.accessibility.issues.map((issue: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <AlertCircle className="w-3 h-3 text-yellow-400" />
                            <span className="text-gray-400">{issue}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Performance Score */}
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-3">Performance</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${codeAnalysis.performance.score}%` }}
                        />
                      </div>
                      <span className="text-sm text-white">{codeAnalysis.performance.score}%</span>
                    </div>
                    {codeAnalysis.performance.suggestions.length > 0 && (
                      <div className="space-y-1">
                        {codeAnalysis.performance.suggestions.map((suggestion: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <Info className="w-3 h-3 text-blue-400" />
                            <span className="text-gray-400">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Code2 className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No code to analyze</p>
                  <p className="text-xs text-gray-500 mt-1">Write some code to see detailed analysis</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'tutorials' && (
            <motion.div
              key="tutorials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {/* Quick Start Tutorials */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white">Quick Start</h4>
                {[
                  {
                    title: "Modern Landing Page",
                    description: "Create a stunning landing page with hero section, features, and testimonials",
                    difficulty: "Beginner",
                    time: "5 min",
                    action: "Create a modern landing page with hero section, feature cards, testimonials, and call-to-action buttons using Tailwind CSS"
                  },
                  {
                    title: "Dashboard Interface",
                    description: "Build a clean admin dashboard with sidebar navigation and data visualization",
                    difficulty: "Intermediate",
                    time: "10 min",
                    action: "Generate a complete dashboard interface with sidebar navigation, stats cards, charts, and data tables"
                  },
                  {
                    title: "E-commerce Product Page",
                    description: "Design a product showcase with image gallery, details, and purchase options",
                    difficulty: "Intermediate",
                    time: "8 min",
                    action: "Create an e-commerce product page with image carousel, product details, reviews, and add to cart functionality"
                  }
                ].map((tutorial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-violet-500/50 transition-colors cursor-pointer group"
                    onClick={() => onSuggestionClick(tutorial.action)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-violet-500/10 text-violet-400 rounded-lg">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors mb-1">
                          {tutorial.title}
                        </h5>
                        <p className="text-xs text-gray-400 mb-2">{tutorial.description}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-green-400">{tutorial.difficulty}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">{tutorial.time}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-violet-400 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 