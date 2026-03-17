import {create} from 'zustand'
import {persist} from 'zustand/middleware'
export const useAuthStore = create()(
  persist(
    (set) => ({
       token: null,
       user: null,
     

      login: (token, user) =>
        set({
          token,
          user
        }),

      logout: () =>
        set({
          user: null,
          token: null
        }),
    }),
    {
      name: "auth-storage"
    }
  )
);
