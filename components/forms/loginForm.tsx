'use client'
import React, { useActionState, useState } from 'react'
import { login } from '@/lib/actions/login'

const initialState = {
  message: ''
}

function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  return (
    <form action={formAction}>
      <label>
        {' '}
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
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
      <button type="submit"> Log in</button>
      <p> {state?.message as string} </p>
    </form>
  )
}

export default LoginForm
