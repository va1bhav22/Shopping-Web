import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const CartStore = (set: any) => ({
  //--------
  //TODO: Cart
  //--------
  carts: [],
  //--------
  //TODO: ADD_TO_CART
  //--------
  addToCart: (product: any) => {
    set((state: { carts: any }) => ({
      carts: [product, ...state.carts],
    }))
  },
  //--------
  //TODO: REMOVE_FROM_CART
  //--------
  removeFromCart: (productId: any) => {
    set((state: any) => ({
      carts: state.carts.filter(
        (curElm: { id: any }) => curElm.id !== productId
      ),
    }))
  },
  //--------
  //TODO: Wishlist
  //--------
  wishlist: [],
  //--------
  //TODO: ADD_TO_WISHLIST
  //--------
  addToWishlist: (product: any) => {
    set((state: { wishlist: any }) => ({
      wishlist: [product, ...state.wishlist],
    }))
  },
  //--------
  //TODO: REMOVE_FROM_WISHLIST
  //--------
  removeFromWishlist: (productId: any) => {
    set((state: any) => ({
      wishlist: state.wishlist.filter((curElm: any) => curElm.id !== productId),
    }))
  },
})

const useCartStore = create(
  devtools(
    persist(CartStore, {
      name: 'carts',
    })
  )
)

export default useCartStore
