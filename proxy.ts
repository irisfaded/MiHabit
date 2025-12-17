'use server'

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'

export const proxy = async (req: NextRequest) => {
  console.log('middleware')
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value as string
  const refreshToken = cookieStore.get('refresh')?.value as string

  console.log(accessToken)

  // decoding and verifying refresh token
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
  } catch (error: any) {
    console.log(error)
    switch(error.name) {
        // if the token is malformed or has an invalid signature
        case 'JsonWebTokenError':
            cookieStore.delete('access')
            cookieStore.delete('refresh')
            return redirect('/login')
        // if the token is expired
        case 'TokenExpiredError':
            
    }
  }

  // decoding and verifying access token
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)
  } catch (error: any) {
    console.log(error)
    switch(error.name) {
        // if the token is malformed or has an invalid signature
        case 'JsonWebTokenError':
            cookieStore.delete('access')
            cookieStore.delete('refresh')
            return redirect('/login')
        // if the token is expired
        case 'TokenExpiredError':

    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/'
}
