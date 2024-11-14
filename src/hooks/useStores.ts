import { BASE_URL } from 'api'
import { useIsMounted } from 'hooks'
import { useEffect, useState } from 'react'

const useStores = () => {
  const [stores, setStores] = useState(null as any)
  const [realtime, setRealtime] = useState(false)
  const isMounted = useIsMounted()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/store/all/stores`, {
          method: 'GET',
          // body: JSON.stringify({ ...values }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('CGHAccessToken')}`,
          },
        })
        const arr = await response.json()
        console.log(arr)
        // const sortArr = arr?.data?.sort(
        //   (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        // );
        isMounted.current && setStores(arr?.data?.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [isMounted, realtime])
  return {
    stores,
    setRealtime,
  }
}

export default useStores
