import { create } from 'zustand'

const useStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user-blog-codewave')) || {},
    showModal : false,

    setUser: (user) => set((state) => ({ user: user})),
    setShowModal: () => set((state) => ({ showModal: !state.showModal})),
  }))

  export default useStore;