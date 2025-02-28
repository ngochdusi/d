import { NextResponse } from "next/server"

const KIOSK_TOKEN = "3C0R626E5YYAF6SR4NOL"
const USER_TOKEN = "YMPTLG2TKYPDEQ5TBAABF1VAAAI2ZLTNYN8Z"

export async function GET() {
  try {
    const response = await fetch(`https://taphoammo.net/api/getStock?kioskToken=${KIOSK_TOKEN}&userToken=${USER_TOKEN}`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false, description: "Lỗi khi lấy thông tin sản phẩm" }, { status: 500 })
  }
}

