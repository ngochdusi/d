import { NextResponse } from "next/server"

const KIOSK_TOKEN = "3C0R626E5YYAF6SR4NOL"
const USER_TOKEN = "YMPTLG2TKYPDEQ5TBAABF1VAAAI2ZLTNYN8Z"

export async function POST(request: Request) {
  try {
    const { quantity, promotion } = await request.json()

    let url = `https://taphoammo.net/api/buyProducts?kioskToken=${KIOSK_TOKEN}&userToken=${USER_TOKEN}&quantity=${quantity}`
    if (promotion) {
      url += `&promotion=${promotion}`
    }

    const response = await fetch(url)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false, description: "Lỗi khi mua hàng" }, { status: 500 })
  }
}

