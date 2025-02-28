import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const username = cookieStore.get("user")?.value

    if (!username) {
      return NextResponse.json({ success: false, description: "Vui lòng đăng nhập" }, { status: 401 })
    }

    const response = await fetch("http://localhost:3000/api/orderHistory", {
      headers: {
        Cookie: `user=${username}`,
      },
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false, description: "Lỗi khi lấy lịch sử đơn hàng" }, { status: 500 })
  }
}

