import { NextResponse } from "next/server"

const USER_TOKEN = "YMPTLG2TKYPDEQ5TBAABF1VAAAI2ZLTNYN8Z"

export async function GET(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params

    const response = await fetch(`https://taphoammo.net/api/getProducts?orderId=${orderId}&userToken=${USER_TOKEN}`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false, description: "Lỗi khi lấy thông tin đơn hàng" }, { status: 500 })
  }
}

