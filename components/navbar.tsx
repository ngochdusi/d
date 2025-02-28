"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-blue-600">
            ducngoc.tokyo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Trang chủ
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">
              Sản phẩm
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Tài khoản
                </Link>
                <Link href="/orders" className="text-gray-700 hover:text-blue-600">
                  Đơn hàng
                </Link>
              </>
            ) : null}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">
                  Số dư: <span className="font-semibold">{user.balance?.toLocaleString()} đ</span>
                </span>
                <Button variant="outline" onClick={logout}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Đăng nhập</Button>
                </Link>
                <Link href="/register">
                  <Button>Đăng ký</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              href="/products"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Sản phẩm
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tài khoản
                </Link>
                <Link
                  href="/orders"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đơn hàng
                </Link>
                <div className="pt-2 border-t">
                  <div className="py-2 text-gray-700">
                    Số dư: <span className="font-semibold">{user.balance?.toLocaleString()} đ</span>
                  </div>
                  <Button variant="outline" onClick={logout} className="w-full">
                    Đăng xuất
                  </Button>
                </div>
              </>
            ) : (
              <div className="pt-2 border-t flex flex-col space-y-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Đăng ký</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

