"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Sparkles, Zap, Crown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useSession } from "@/lib/auth-client"

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individuals getting started",
    price: "Free",
    period: "forever",
    slug: null,
    icon: <Zap className="w-6 h-6" />,
    features: [
      "5 AI generations per day",
      "Basic templates",
      "Community support",
      "Web preview",
      "Basic exports"
    ],
    highlighted: false,
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    description: "For professionals and growing teams",
    price: "$19",
    period: "month",
    slug: "pro-monthly",
    icon: <Sparkles className="w-6 h-6" />,
    features: [
      "Unlimited AI generations",
      "Premium templates",
      "Priority support",
      "Advanced AI models",
      "Full export capabilities",
      "Team collaboration",
      "Custom branding",
      "Usage analytics"
    ],
    highlighted: true,
    buttonText: "Start Pro Trial",
    buttonVariant: "default" as const,
  },
  {
    name: "Pro Yearly",
    description: "Save 20% with annual billing",
    price: "$199",
    period: "year",
    slug: "pro-yearly",
    originalPrice: "$228",
    icon: <Crown className="w-6 h-6" />,
    features: [
      "Everything in Pro",
      "20% annual savings",
      "2 months free",
      "Dedicated support",
      "Early feature access",
      "Custom integrations",
      "Advanced analytics",
      "Priority feature requests"
    ],
    highlighted: false,
    buttonText: "Save 20%",
    buttonVariant: "outline" as const,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    period: "contact us",
    slug: "enterprise",
    icon: <Users className="w-6 h-6" />,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Custom AI models",
      "On-premise deployment",
      "SLA guarantees",
      "Custom integrations",
      "Dedicated account manager",
      "Training sessions"
    ],
    highlighted: false,
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
  }
]

export function PricingPlans() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const { data: session } = useSession()

  const handleSubscribe = async (plan: typeof pricingPlans[0]) => {
    if (!plan.slug) {
      // Free plan or contact sales
      if (plan.name === "Enterprise") {
        window.open("mailto:sales@zapdev.ai?subject=Enterprise Plan Inquiry", "_blank")
      }
      return
    }

    if (!session?.user) {
      // Redirect to auth if not logged in
      window.location.href = "/auth"
      return
    }

    setIsLoading(plan.slug)

    try {
      // Use the Polar checkout through BetterAuth
      await authClient.checkout({
        slug: plan.slug,
      })
    } catch (error) {
      console.error("Checkout failed:", error)
      setIsLoading(null)
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Start building amazing applications with AI. Upgrade anytime as your needs grow.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${
                plan.highlighted
                  ? "bg-gradient-to-b from-violet-600/20 to-purple-600/20 border-violet-500/50"
                  : "bg-white/10 border-white/20"
              } backdrop-blur-xl border rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                  plan.highlighted ? "bg-violet-500" : "bg-white/10"
                }`}>
                  <div className="text-white">{plan.icon}</div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  {plan.originalPrice && (
                    <div className="text-gray-500 line-through text-lg">{plan.originalPrice}</div>
                  )}
                  <div className="text-4xl font-bold text-white">
                    {plan.price}
                    {plan.period !== "contact us" && plan.period !== "forever" && (
                      <span className="text-lg text-gray-400">/{plan.period}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleSubscribe(plan)}
                disabled={isLoading === plan.slug}
                variant={plan.buttonVariant}
                className={`w-full py-3 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                    : plan.buttonVariant === "outline"
                    ? "border-white/20 text-white hover:bg-white/10"
                    : ""
                }`}
              >
                {isLoading === plan.slug ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  plan.buttonText
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>✓ Secure payment with Polar</span>
            <span>✓ Instant access</span>
            <span>✓ No setup fees</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 