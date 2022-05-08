import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.pathname.includes('/api' || '/auth' || '_')) {
    console.log("hi1")
    //return NextResponse.next()
  }

  const url = new URL(req.nextUrl.href)

  url.pathname = '/api/launched'
  await fetch(url.href).then(async (res) => {
    const data = await res.text()
    if (data === "{}") {
      console.log("hi")
      return NextResponse.rewrite('/_unlaunched')
    } else {
      return NextResponse.next()
    }
  }).catch((err) => {
    console.log(err)
  })
}