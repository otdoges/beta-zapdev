"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  CreditCard, 
  Download, 
  Activity,
  Gift,
  Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { authClient } from "@/lib/auth-client"
import { useSession } from "@/lib/auth-client"
import { useRouter } from 'next/navigation'

interface CustomerState {
  subscriptions: any[]
  orders: any[]
  benefits: any[]
  meters: any[]
}

export function CustomerPortal() {
  const [customerState, setCustomerState] = useState<CustomerState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const { data: session } = useSession()

  useEffect(() => {
    loadCustomerData()
  }, [session])

  const loadCustomerData = async () => {
    if (!session?.user) return

    try {
      setIsLoading(true)
      setError("")

      // Mock data for now since Polar might not be configured yet
      setCustomerState({
        subscriptions: [],
        orders: [],
        benefits: [],
        meters: []
      })
    } catch (err) {
      console.error("Failed to load customer data:", err)
      setError("Failed to load customer data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleManageSubscriptions = async () => {
    try {
      await authClient.customer.portal()
    } catch (err) {
      console.error("Failed to open customer portal:", err)
      setError("Failed to open subscription portal. Please try again.")
    }
  }

  if (!session?.user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">Please sign in to view your subscription details.</p>


const router = useRouter()

        <Button onClick={() => router.push("/auth")}>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-white/10 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-white/10 rounded-xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Subscriptions</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <CreditCard className="w-8 h-8 text-violet-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Orders</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <Download className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Benefits</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <Gift className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/10">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Your Subscriptions</h3>
            <Button onClick={handleManageSubscriptions} className="bg-violet-600 hover:bg-violet-700">
              <Settings className="w-4 h-4 mr-2" />
              Manage Subscriptions
            </Button>
          </div>

          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-12 text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">No Active Subscriptions</h4>
              <p className="text-gray-400 mb-6">
                Upgrade to a paid plan to unlock premium features and capabilities.
              </p>
              <Button onClick={() => window.location.href = "/pricing"} className="bg-violet-600 hover:bg-violet-700">
                View Pricing Plans
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Order History</h3>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-12 text-center">
              <Download className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">No Orders Yet</h4>
              <p className="text-gray-400">Your purchase history will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Your Benefits</h3>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-12 text-center">
              <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">No Benefits</h4>
              <p className="text-gray-400">Subscribe to a plan to unlock benefits and features.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Usage & Meters</h3>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-12 text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">No Usage Tracking</h4>
              <p className="text-gray-400">Usage meters will appear here when available.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 