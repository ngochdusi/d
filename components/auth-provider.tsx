"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  username: string
  balance: number
  isAdmin: boolean
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => void
  updateBalance: (newBalance: number) => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateBalance: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Fetch user data after successful login
        const userResponse = await fetch("/api/user")
        const userData = await userResponse.json()

        if (userData.success) {
          const newUser = {
            username,
            balance: userData.balance,
            isAdmin: userData.isAdmin || false,
          }
          setUser(newUser)
          localStorage.setItem("user", JSON.stringify(newUser))
          toast({
            title: "Đăng nhập thành công",
            description: "Chào mừng bạn quay trở lại!",
          })
          router.push("/dashboard")
        }
      } else {
        toast({
          variant: "destructive",
          title: "Đăng nhập thất bại",
          description: data.description || "Vui lòng kiểm tra lại thông tin đăng nhập",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.",
      })
    }
  }

  const register = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Đăng ký thành công",
          description: "Vui lòng đăng nhập để tiếp tục.",
        })
        router.push("/login")
      } else {
        toast({
          variant: "destructive",
          title: "Đăng ký thất bại",
          description: data.description || "Vui lòng thử lại với thông tin khác",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.",
      })
    }
  }

  const logout = () => {
    fetch("/api/logout", { method: "POST" })
      .then(() => {
        setUser(null)
        localStorage.removeItem("user")
        router.push("/")
        toast({
          title: "Đăng xuất thành công",
          description: "Hẹn gặp lại bạn!",
        })
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Có lỗi xảy ra khi đăng xuất.",
        })
      })
  }

  const updateBalance = (newBalance: number) => {
    if (user) {
      const updatedUser = { ...user, balance: newBalance }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateBalance }}>{children}</AuthContext.Provider>
  )
}

