import create from 'zustand'

type ActionsState = {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const useActions = create<ActionsState>((set) => ({
  loading: false,
  setLoading: (loading) => set((state) => ({ ...state, loading })),
}))

export default useActions
