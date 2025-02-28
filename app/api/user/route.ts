import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const username = cookieStore.get("user")?.value

    if (!username) {
      return NextResponse.json({ success: false, description: "Không tìm thấy phiên đăng nhập" }, { status: 401 })
    }

    // In a real app, you would fetch user data from your backend
    // For now, we'll simulate a response
    return NextResponse.json({
      success: true,
      username,
      balance: 100000, // Example balance
      isAdmin: false,
    })
  } catch (error) {
    return NextResponse.json({ success: false, description: "Lỗi khi lấy thông tin người dùng" }, { status: 500 })
  }
}

