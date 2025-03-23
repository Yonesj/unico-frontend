import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function useClientSideRedirect(source, destination) {
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === source) {
      router.push(destination)
    }
  }, [router, source, destination])
}
