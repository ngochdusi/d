"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import { Package, ChevronRight, Clock, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

type Order = {
  orderId: string
  status: string
}

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Redirect if not logged in
  if (!user) {
    router.push("/login")
    return null
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orderHistory")
        const data = await response.json()

        if (data.success) {
          setOrders(data.orders)
        } else {
          toast({
            variant: "destructive",
            title: "Lỗi",
            description: data.description || "Không thể tải lịch sử đơn hàng",
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Có lỗi xảy ra khi tải lịch sử đơn hàng",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [toast])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Lịch sử đơn hàng</h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : orders.length > 0 ? (
          <div className="grid gap-4">
            {orders.map((order) => (
              <Card key={order.orderId} className="overflow-hidden">
                <CardContent className="p-0">
                  <Link href={`/orders/${order.orderId}`}>
                    <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Đơn hàng #{order.orderId}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Trạng thái: </span>
                            <Badge variant="outline" className={`ml-2 ${getStatusColor(order.status)}`}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Chưa có đơn hàng</CardTitle>
              <CardDescription>
                Bạn chưa có đơn hàng nào. Hãy mua sản phẩm để xem lịch sử đơn hàng tại đây.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/products">
                <Button>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Mua sản phẩm
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

