import * as React from 'react'
import { useState } from 'react'
import router from 'next/router'
import { login } from '../../libraries/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    await login({ email, password })

    router.replace('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email-input">Email</label>
      <input
        type="email"
        id="email-input"
        name="email-input"
        onChange={e => setEmail(e.currentTarget.value)}
        value={email}
      />
      <label htmlFor="password-input">Password</label>
      <input
        type="password"
        id="password-input"
        name="password-input"
        onChange={e => setPassword(e.currentTarget.value)}
        value={password}
      />
      <button type="submit">Log in</button>
    </form>
  )
}

export default Login
