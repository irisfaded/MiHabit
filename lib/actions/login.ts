'use server'
import { pool } from '@/lib/db/db_connection'
import { z } from 'zod'
import { sql } from 'slonik'
import { auth } from '@/lib/auth/firebase-auth'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { FirebaseError } from 'firebase/app'

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
  try {
    const userCredential = await signInWithEmailAndPassword(auth, userObject.email, userObject.password)
    console.log(userCredential.user)
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code
      console.log(error.message)
      // list of possible errors
      //   switch (errorCode) {
      //     case 'auth/email-already-in-use':
      //       return { success: false, message: 'This email is already registered' }
      //     case 'auth/invalid-email':
      //       return { success: false, message: 'Invalid email address' }
    }
    return { success: false, message: 'Login failed!' }
  }

  return { success: true, message: 'Successful login!' }
}
