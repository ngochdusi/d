import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const username = cookieStore.get("user")?.value

    if (username !== "matbkharu") {
      return NextResponse.json({ success: false, description: "Unauthorized" }, { status: 401 })
    }

    // Trong thực tế, bạn sẽ truy vấn cơ sở dữ liệu để lấy danh sách đơn hàng
    const orders = [
      { id: "1", userId: "1", status: "Completed", total: 50000 },
      { id: "2", userId: "2", status: "Processing", total: 75000 },
      { id: "3", userId: "3", status: "Cancelled", total: 100000 },
    ]

    return NextResponse.json({ success: true, orders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ success: false, description: "Internal server error" }, { status: 500 })
  }
}

