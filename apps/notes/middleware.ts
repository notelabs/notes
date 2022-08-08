import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.includes('/api' || '/auth' || '_')) {
    return NextResponse.next()
  }

  const url = new URL(req.nextUrl.href)
  url.pathname = '/api/launched'

  async function launched () {
    let result
    await fetch(url.href).then(async (res) => {
      const data = await res.text()
      if (data === "{}") {
        result = false
      } else {
        result = true
      }
    }).catch((err) => {
      console.log(err)
      result = true
    })

    return result
  }

  if (!await launched()) {
    url.pathname = '/_unlaunched'
    return NextResponse.rewrite(url.href)
  }

  return NextResponse.next()
}