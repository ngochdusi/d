"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import { useAuth } from "@/hooks/use-auth"

type User = {
  id: string
  username: string
  balance: number
}

type Order = {
  id: string
  userId: string
  status: string
  total: number
}

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user?.username !== "matbkharu") {
      router.push("/")
      return
    }

    fetchData()
  }, [user, router])

  const fetchData = async () => {
    try {
      const [usersResponse, ordersResponse] = await Promise.all([fetch("/api/admin/users"), fetch("/api/admin/orders")])

      const usersData = await usersResponse.json()
      const ordersData = await ordersResponse.json()

      if (usersData.success) {
        setUsers(usersData.users)
      }

      if (ordersData.success) {
        setOrders(ordersData.orders)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể tải dữ liệu quản trị",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Đang tải...</div>
  }

  if (user?.username !== "matbkharu") {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Trang quản trị</h1>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý người dùng</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tên đăng nhập</TableHead>
                    <TableHead>Số dư</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.balance.toLocaleString()} đ</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Chỉnh sửa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quản lý đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>ID người dùng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>{order.total.toLocaleString()} đ</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

