'use client'

import React, { useActionState, useState } from 'react'
import { login } from '@/lib/actions/login'

const initialState = {
  message: '',
  success: false
}


function loginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState)
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  return (
    <form action=''>
      <label>
        {' '}
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
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
    </form>
  )
}

export default loginForm
