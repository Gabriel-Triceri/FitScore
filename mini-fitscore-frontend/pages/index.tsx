import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
   
    router.push('/dashboard')
  }, [router])

 
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Roboto, sans-serif'
    }}>
      <p>Redirecionando para o dashboard...</p>
    </div>
  )
}