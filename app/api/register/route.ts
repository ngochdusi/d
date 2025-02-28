import { NextResponse } from "next/server"

const ADMIN_USERNAME = "matbkharu"
const ADMIN_PASSWORD = "admin123" // Trong thực tế, hãy sử dụng một mật khẩu mạnh hơn và lưu trữ an toàn

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || username.length < 3) {
      return NextResponse.json(
        {
          success: false,
          description: "Tên đăng nhập phải có ít nhất 3 ký tự",
        },
        { status: 400 },
      )
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          description: "Mật khẩu phải có ít nhất 6 ký tự",
        },
        { status: 400 },
      )
    }

    // Kiểm tra xem tài khoản đã tồn tại chưa (giả lập)
    if (username === ADMIN_USERNAME) {
      return NextResponse.json(
        {
          success: false,
          description: "Tên đăng nhập đã tồn tại",
        },
        { status: 400 },
      )
    }

    // Trong thực tế, bạn sẽ lưu thông tin người dùng vào cơ sở dữ liệu ở đây

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      {
        success: false,
        description: "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.",
      },
      { status: 500 },
    )
  }
}

