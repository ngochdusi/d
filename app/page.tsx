import { Button } from "@/components/ui/button"
import { ShoppingCart, Package, History, ArrowRight } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">ducngoc.tokyo</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Mua sắm trực tuyến nhanh chóng, tiện lợi và an toàn
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Mua ngay <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Tại sao chọn chúng tôi?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mx-auto bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mua sắm dễ dàng</h3>
                <p className="text-gray-600">Quy trình mua hàng đơn giản, nhanh chóng chỉ với vài bước đơn giản.</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mx-auto bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sản phẩm chất lượng</h3>
                <p className="text-gray-600">Cam kết cung cấp sản phẩm chất lượng cao với giá cả hợp lý.</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mx-auto bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <History className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Theo dõi đơn hàng</h3>
                <p className="text-gray-600">Dễ dàng theo dõi lịch sử đơn hàng và trạng thái giao hàng.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Bắt đầu mua sắm ngay hôm nay</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Đăng ký tài khoản để bắt đầu trải nghiệm mua sắm tuyệt vời cùng chúng tôi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary">
                  Đăng ký
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ducngoc.tokyo</h3>
              <p className="text-gray-400">Mua sắm trực tuyến nhanh chóng, tiện lợi và an toàn.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
              <p className="text-gray-400">Email: support@ducngoc.tokyo</p>
              <p className="text-gray-400">Điện thoại: 0123 456 789</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Chính sách</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Điều khoản sử dụng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Chính sách đổi trả
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© 2024 ducngoc.tokyo. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

