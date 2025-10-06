'use client'

import { useSearchParams } from 'next/navigation'

export function LoginErrorDisplay() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  if (!error) return null

  let errorMessage = "An unknown error occurred.";
  if (error === 'CredentialsSignin') {
    errorMessage = "Invalid username or password. Please try again.";
  }

  return (
    <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
      {errorMessage}
    </div>
  )
}