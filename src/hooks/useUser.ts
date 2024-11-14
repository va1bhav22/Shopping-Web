import { User } from 'types'
import create from 'zustand'

type AuthState = {
  user1?: Partial<User>
  setUser1: (user1: Partial<User>) => void
}
const useUser = create<AuthState>((set) => ({
  user1: {
    displayName: 'Anonymous',
  },
  setUser1: async (user: Partial<User>) => {
    set((state) => ({
      ...state,
      user1: {
        ...state.user1,
        ...user,
      },
    }))
    // saveToLocalStorage("user", JSON.stringify(user));
  },
}))

export default useUser
