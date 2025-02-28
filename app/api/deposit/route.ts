import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const username = cookieStore.get("user")?.value

    if (!username) {
      return NextResponse.json({ success: false, description: "Vui lòng đăng nhập" }, { status: 401 })
    }

    const { amount } = await request.json()

    const response = await fetch("http://localhost:3000/api/deposit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `user=${username}`,
      },
      body: JSON.stringify({ amount }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false, description: "Lỗi khi nạp tiền" }, { status: 500 })
  }
}

