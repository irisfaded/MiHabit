'use server'
import { pool } from '@/lib/db/db_connection'
import { z } from 'zod'
import { sql } from 'slonik'
import { auth } from '@/lib/auth/firebase-auth'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { FirebaseError } from 'firebase/app'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'

const UserCredentialSchema = z.object({
  // letters, numbers, some symbols, min 3 max 30
  email: z.string().trim().email('Invalid email format'),
  password: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9_!\.\-?]{8,50}$/, { message: 'Password does not match requirements' })
})

export const login = async (prevState: any, formData: FormData) => {
  // validate with zod
  const userObject = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }
  try {
    UserCredentialSchema.parse(userObject)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues)
      return { success: false, message: error.issues[0].message } // returns first error in array
    }
  }

  // login with firebase
  let firebaseUid = null
  try {
    const userCredential = await signInWithEmailAndPassword(auth, userObject.email, userObject.password)
    firebaseUid = userCredential.user.uid
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code
      console.log(error.message)
      // list of possible errors
      switch (errorCode) {
        case 'auth/email-already-in-use':
          return { success: false, message: 'This email is already registered' }
        case 'auth/invalid-email':
          return { success: false, message: 'Invalid email address' }
      }
    }
    return { success: false, message: 'Login failed!' }
  }
  // get user postgres id based on fb id
  const id = await pool.maybeOneFirst(sql.type(z.number())` SELECT id FROM users WHERE firebase_uid=${firebaseUid}`)
  if (!id) return { success: false, message: 'User not found.' }

  // create access and refresh tokens for the user
  let accessToken = jwt.sign(
    {
      userId: id
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '30s' }
  )

  let refreshToken = jwt.sign(
    {
      userId: id,
      type: 'refresh'
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '7d' }
  )

  

  return redirect('/')
}
