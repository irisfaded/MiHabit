'use server'

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

interface refreshStatus {
  userId: number
  type: string
  iat: number
  exp: number
}

export const proxy = async (req: NextRequest) => {
  console.log('middleware')
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value as string
  const refreshToken = cookieStore.get('refresh')?.value as string

  console.log('old token: ' + accessToken)

  let refreshStatus: refreshStatus
  try {
    refreshStatus = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as refreshStatus
  } catch (error: any) {
    // delete from storage
    const response = NextResponse.redirect(new URL('/login', req.url))
    response.cookies.delete('access')
    response.cookies.delete('refresh')
    console.log('refresh token error')
    console.log(error)
    return response
    // delete from database
  }

  console.log(refreshStatus)

  // decoding and verifying access token
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)
  } catch (error: any) {
    console.log(error)
    switch (error.name) {
      // if the token is malformed or has an invalid signature
      case 'JsonWebTokenError':
        const response = NextResponse.redirect(new URL('/login', req.url))
        response.cookies.delete('access')
        response.cookies.delete('refresh')
        console.log('access token error malformed')
        console.log(error)
        return response
      // if the token is expired
      case 'TokenExpiredError':
        console.log('token expired error')
        // checking if refreshSt
        if (refreshStatus.userId != null) {
          // creating new access token
          let accessToken = jwt.sign(
            {
              userId: refreshStatus.userId
            },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '30s' }
          )
          // setting new access token cookie
          const response = NextResponse.next()

          response.cookies.delete('access')
          response.cookies.set({
            name: 'access',
            value: accessToken,
            httpOnly: true,
            sameSite: 'lax',
            domain: '',
            path: '/'
          })
          console.log('new token: ' + accessToken)
          console.log('successful token refresh')
          return response
        }
    }
  }
  console.log('passed')
  return NextResponse.next()
}

export const config = {
  matcher: '/'
}
