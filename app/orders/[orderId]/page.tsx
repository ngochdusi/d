"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import { ArrowLeft, Package, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

type OrderDetail = {
  success: boolean
  data?: {
    product: string
  }[]
  description?: string
}

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const orderId = params.orderId as string

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await fetch(`/api/getOrder/${orderId}`)
        const data = await response.json()
        setOrderDetail(data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Có lỗi xảy ra khi tải thông tin đơn hàng",
        })
        router.push("/orders")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderDetail()
  }, [orderId, router, toast])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/orders">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Chi tiết đơn hàng #{orderId}</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : orderDetail ? (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="mr-2 h-5 w-5" /> Thông tin đơn hàng
                  </div>
                  <Badge
                    variant="outline"
                    className={orderDetail.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {orderDetail.success ? "Thành công" : "Đang xử lý"}
                  </Badge>
                </CardTitle>
                <CardDescription>Mã đơn hàng: {orderId}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Danh sách sản phẩm</h3>
                    {orderDetail.success && orderDetail.data ? (
                      <div className="space-y-4">
                        {orderDetail.data.map((product, index) => (
                          <div key={index} className="border rounded-md p-4">
                            <div className="flex items-start">
                              <div className="bg-blue-100 p-2 rounded-md mr-4">
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{product.product}</h4>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500">{orderDetail.description || "Không có thông tin sản phẩm."}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Không tìm thấy đơn hàng</CardTitle>
              <CardDescription>Không thể tìm thấy thông tin đơn hàng bạn yêu cầu.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/orders">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại danh sách đơn hàng
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

