"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import { Wallet, CreditCard, ShoppingBag, History } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, updateBalance } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [depositAmount, setDepositAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if not logged in
  if (!user) {
    router.push("/login")
    return null
  }

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()

    const amount = Number.parseInt(depositAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng nhập số tiền hợp lệ",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      })

      const data = await response.json()

      if (data.success) {
        updateBalance(data.balance)
        setDepositAmount("")
        toast({
          title: "Nạp tiền thành công",
          description: `Đã nạp ${amount.toLocaleString()} đ vào tài khoản`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Nạp tiền thất bại",
          description: data.description || "Có lỗi xảy ra khi nạp tiền",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Có lỗi xảy ra khi nạp tiền. Vui lòng thử lại sau.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tài khoản của tôi</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="mr-2 h-5 w-5" /> Thông tin tài khoản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tên đăng nhập</Label>
                <div className="font-medium mt-1">{user.username}</div>
              </div>
              <div>
                <Label>Số dư tài khoản</Label>
                <div className="font-medium text-xl mt-1">{user.balance?.toLocaleString()} đ</div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Link href="/products" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Mua hàng
                  </Button>
                </Link>
                <Link href="/orders" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <History className="mr-2 h-4 w-4" /> Lịch sử đơn hàng
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" /> Nạp tiền
              </CardTitle>
              <CardDescription>Nạp tiền vào tài khoản để mua sản phẩm</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDeposit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Số tiền</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Nhập số tiền cần nạp"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Đang xử lý..." : "Nạp tiền"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

