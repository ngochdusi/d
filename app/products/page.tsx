"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import { ShoppingCart, Package } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

type ProductInfo = {
  name: string
  stock: number
  price: number
}

export default function ProductsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [quantity, setQuantity] = useState("1")
  const [promotion, setPromotion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null)

  useEffect(() => {
    fetchProductInfo()
  }, [])

  const fetchProductInfo = async () => {
    try {
      const response = await fetch("/api/getStock")
      const data = await response.json()
      if (data.success) {
        setProductInfo({
          name: data.name,
          stock: Number.parseInt(data.stock),
          price: Number.parseFloat(data.price) * 1.3, // Increase price by 30%
        })
      } else {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: data.description || "Không thể lấy thông tin sản phẩm",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lấy thông tin sản phẩm",
      })
    }
  }

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng đăng nhập để mua hàng",
      })
      router.push("/login")
      return
    }

    const quantityNum = Number.parseInt(quantity)
    if (isNaN(quantityNum) || quantityNum <= 0) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng nhập số lượng hợp lệ",
      })
      return
    }

    if (!productInfo) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không có thông tin sản phẩm",
      })
      return
    }

    const totalCost = quantityNum * productInfo.price
    if (user.balance < totalCost) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Số dư không đủ để thực hiện giao dịch",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/buyProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: quantityNum,
          promotion: promotion || undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Mua hàng thành công",
          description: `Đơn hàng #${data.order_id} đã được tạo`,
        })
        router.push(`/orders/${data.order_id}`)
      } else {
        toast({
          variant: "destructive",
          title: "Mua hàng thất bại",
          description: data.description || "Có lỗi xảy ra khi mua hàng",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Có lỗi xảy ra khi mua hàng. Vui lòng thử lại sau.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mua sản phẩm</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" /> Sản phẩm
              </CardTitle>
              <CardDescription>Sản phẩm chất lượng cao</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-4">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Sản phẩm"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {productInfo ? (
                <>
                  <h3 className="text-xl font-semibold">{productInfo.name}</h3>
                  <p className="text-gray-600 mt-2">
                    Sản phẩm chất lượng cao với nhiều tính năng hữu ích. Phù hợp với mọi nhu cầu sử dụng.
                  </p>
                  <div className="mt-4 text-lg font-semibold">
                    Giá: {productInfo.price.toLocaleString()} đ / sản phẩm
                  </div>
                  <div className="mt-2 text-sm text-gray-600">Còn lại: {productInfo.stock} sản phẩm</div>
                </>
              ) : (
                <p>Đang tải thông tin sản phẩm...</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" /> Đặt hàng
              </CardTitle>
              <CardDescription>Nhập thông tin để mua sản phẩm</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePurchase} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Số lượng</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    placeholder="Nhập số lượng"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="promotion">Mã khuyến mãi (nếu có)</Label>
                  <Input
                    id="promotion"
                    placeholder="Nhập mã khuyến mãi"
                    value={promotion}
                    onChange={(e) => setPromotion(e.target.value)}
                  />
                </div>

                {productInfo && (
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span>Đơn giá:</span>
                      <span>{productInfo.price.toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Số lượng:</span>
                      <span>{Number.parseInt(quantity) || 0}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Tổng tiền:</span>
                      <span>{((Number.parseInt(quantity) || 0) * productInfo.price).toLocaleString()} đ</span>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading || !user}>
                  {isLoading ? "Đang xử lý..." : user ? "Mua ngay" : "Đăng nhập để mua"}
                </Button>

                {!user && (
                  <p className="text-sm text-center text-gray-600">
                    Vui lòng{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                      đăng nhập
                    </a>{" "}
                    để mua hàng
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

