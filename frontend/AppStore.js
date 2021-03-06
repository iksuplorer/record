import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from './common/api'

export const AppState = createContext('')
export const AppAction = createContext(() => {})

export default function AppStore({ children }) {
  const [user, setUser] = useState(null)
  const [isFetch, setFetch] = useState(true)

  useEffect(() => {
    if (isFetch)
      axios
        .post(`${baseURL}/me`, {}, { withCredentials: true })
        .then((value) => {
          setUser(value.data)
        })
        .catch((e) => {
          console.log('unauthorized')
        })
        .finally(() => setFetch(false))
  }, [isFetch, setFetch])

  return (
    <AppState.Provider value={user}>
      <AppAction.Provider value={setFetch}>{children}</AppAction.Provider>
    </AppState.Provider>
  )
}
