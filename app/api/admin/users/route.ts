import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const username = cookieStore.get("user")?.value

    if (username !== "matbkharu") {
      return NextResponse.json({ success: false, description: "Unauthorized" }, { status: 401 })
    }

    // Trong thực tế, bạn sẽ truy vấn cơ sở dữ liệu để lấy danh sách người dùng
    const users = [
      { id: "1", username: "user1", balance: 100000 },
      { id: "2", username: "user2", balance: 200000 },
      { id: "3", username: "user3", balance: 300000 },
    ]

    return NextResponse.json({ success: true, users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ success: false, description: "Internal server error" }, { status: 500 })
  }
}

