import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()

    if (data.success) {
      // Set session cookie
      ;(await cookies()).set("user", username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false, description: "Lỗi khi đăng nhập" }, { status: 500 })
  }
}

