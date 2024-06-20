'use client'

import { useSession } from 'next-auth/react'

export const User = () => {
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <div>Loading...</div>
  }
  
  if (status === "authenticated") {
    console.log('Client Session', session)
    return <pre>{JSON.stringify(session, null, 2)}</pre>
  }

  return <div>User is not authenticated</div>
}
