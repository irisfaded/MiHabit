'use client'
import React, { useActionState, useState } from 'react'
import { signup } from '@/lib/actions/signup'

const initialState = {
  success: false,
  message: ''
}

function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, initialState)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  return (
    <form action={formAction}>
      <label>
        {' '}
        Your Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
      </label>
      <label>
        {' '}
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
      </label>
      <button type="submit"> Sign up </button>
      <p> {state?.message} </p>
    </form>
  )
}

export default SignupForm
