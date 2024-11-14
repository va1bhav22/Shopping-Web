import { b_1, b_2, b_3, b_4, b_5, b_6, b_8 } from 'assets/business'
import {
  ayush_1,
  ayush_2,
  gourmet_2,
  pure_honey,
  personal_1,
  personal_2,
  sweet_1,
  sweet_2,
  chawanprash,
  mahua,
  jamun,
  ayush_6,
  home_care_1,
} from 'assets/home'
import {
  CartItemType,
  CategoryType,
  CouponType,
  MyOrderType,
  ProductType,
} from 'types'
import create from 'zustand'

type ProductStoreType = {
  //   count: number
  //   setCount: (quantity: number) => void
  products: ProductType[]
  category: CategoryType[]
  cartItems: CartItemType[]
  wishlistItems: ProductType[]
  orderItems: CartItemType[]
  // myCounter: number[]
  couponItems: CouponType[]
  myOrders: MyOrderType[]
  addToCart: (cartItem: CartItemType) => void
  addToOrderItem: (orderItem: CartItemType) => void
  addToOrderItemFromCart: () => void
  removeFromCart: (productId?: number) => void
  removeFromOrderItem: (productId?: number) => void
  incrementQuantity: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  addToWishlist: (wishlistItem: ProductType) => void
  removeFromWishlist: (productId: number) => void
}

const useStore = create<ProductStoreType>((set) => ({
  // count: 1,
  // setCount: (quantity) => set({ count: quantity }),
  products: [
    {
      id: 1,
      name: 'Pure Wildforest Honey',
      description:
        'made with pure wildforest honey (from the heart of chhattishgarh)',
      img: pure_honey.src,
      quantity: 1,
      weightAvailability: [
        {
          weight: '250gm',
          currentPrice: 199,
          inStock: true,
          discount: 10,
        },
        {
          weight: '500gm',
          currentPrice: 299,
          inStock: false,
          discount: 15,
        },
        {
          weight: '1kg',
          currentPrice: 399,
          inStock: true,
          discount: 25,
        },
      ],
      ratings: 5,
      category: 'ayush products',
      isNew: false,
      b2bImg: b_4.src,
      b2bQuantity: '20 Kg',
    },
    {
      id: 2,
      name: 'Jyotishmati Oil',
      description:
        'made from pure cold pressed Coconut oil (from the heart of chhattishgarh)',
      img: ayush_2.src,
      quantity: 1,
      weightAvailability: [
        {
          weight: '100ml',
          currentPrice: 199,
          inStock: true,
          discount: 10,
        },
        {
          weight: '250ml',
          currentPrice: 299,
          inStock: false,
          discount: 15,
        },
        {
          weight: '500ml',
          currentPrice: 399,
          inStock: true,
          discount: 25,
        },
      ],
      ratings: 5,
      category: 'ayush products',
      isNew: true,
      b2bImg: b_5.src,
      b2bQuantity: '10 L',
    },

    {
      id: 3,
      name: 'Ragi Cookies',
      description: 'made with pure ragi (from the heart of chhattishgarh)',
      img: gourmet_2.src,
      quantity: 1,
      weightAvailability: [
        {
          weight: '100gm',
          currentPrice: 99,
          inStock: true,
          discount: 10,
        },
        {
          weight: '200gm',
          currentPrice: 299,
          inStock: false,
          discount: 15,
        },
        {
          weight: '350gm',
          currentPrice: 399,
          inStock: true,
          discount: 25,
        },
      ],
      ratings: 5,
      category: 'gourmet foods',
      isNew: true,
      b2bImg: b_8.src,
      b2bQuantity: '10 Kg',
    },
    {
      id: 4,
      name: 'Chyawanprash',
      description:
        'made with jungle harvest amla, honey and other ingredients (from the heart of chhattishgarh)',
      img: chawanprash.src,
      quantity: 1,
      weightAvailability: [
        {
          weight: '250gm',
          currentPrice: 199,
          inStock: true,
          discount: 10,
        },
        {
          weight: '500gm',
          currentPrice: 299,
          inStock: false,
          discount: 15,
        },
        {
          weight: '1kg',
          currentPrice: 399,
          inStock: true,
          discount: 25,
        },
      ],
      ratings: 5,
      category: 'gourmet foods',
      isNew: false,
      b2bImg: b_1.src,
      b2bQuantity: '20 Kg',
    },

    {
      id: 5,
      name: 'Aloe Vera Soap',
      description:
        'made with jungle harvest aloe vera (from the heart of chhattishgarh)',
      img: personal_2.src,
      quantity: 1,
      weightAvailability: [
        {
          weight: '25gm',
          currentPrice: 199,
          inStock: true,
          discount: 10,
        },
        {
          weight: '50gm',
          currentPrice: 299,
          inStock: false,
          discount: 15,
        },
        {
          weight: '75gm',
          currentPrice: 399,
          inStock: true,
          discount: 25,
        },
      ],
      ratings: 4,
      category: 'personal care',
      isNew: false,
      b2bImg: b_6.src,
      b2bQuantity: '10 Kg',
    },
    {
      id: 6,
      name: 'Aloe Vera Bodywash',
      description:
        'made with jungle harvest aloe vera (from the heart of chhattishgarh)',
      img: personal_1.src,
      quantity: 1,
      weightAvailability: [
        {
          weight: '100ml',
          currentPrice: 199,
          inStock: true,
          discount: 10,
        },
        {
          weight: '250ml',
          currentPrice: 299,
          inStock: false,
          discount: 15,
        },
        {
          weight: '500ml',
          currentPrice: 399,
          inStock: true,
          discount: 25,
        },
      ],
      ratings: 4,
      category: 'personal care',
      isNew: true,
      b2bImg: b_6.src,
      b2bQuantity: '10 L',
    },
    {
      id: 7,
      name: 'Mahua Laddu',
      description:
        'made with jungle harvest Mahua  (from the heart of chhattishgarh)',
      img: ayush_1.src,
      quantity: 1,
      weightAvailability: [
        {
          weight: '250gm',
          currentPrice: 199,
          inStock: true,
          discount: 10,
        },
        {
          weight: '500gm',
          currentPrice: 299,
          inStock: false,
          discount: 15,
        },
        {
          weight: '1kg',
          currentPrice: 399,
          inStock: true,
          discount: 25,
        },
      ],
      ratings: 4,
      category: 'home care',
      isNew: false,
      b2bImg: b_3.src,
      b2bQuantity: '20 Kg',
    },
    {
      id: 8,
      name: 'Mahua cookies',
      description:
        'made with jungle harvest Mahua  (from the heart of chhattishgarh)',
      img: mahua.src,
      quantity: 1,
      weightAvailability: [
        {
          weight: '100gm',
          currentPrice: 199,
          inStock: true,
          discount: 10,
        },
        {
          weight: '250gm',
          currentPrice: 299,
          inStock: false,
          discount: 15,
        },
        {
          weight: '500gm',
          currentPrice: 399,
          inStock: true,
          discount: 25,
        },
      ],
      ratings: 4,
      category: 'home care',
      isNew: false,
      b2bImg: b_3.src,
      b2bQuantity: '20 Kg',
    },
    {
      id: 9,
      name: 'Amla murabba',
      description:
        'made with jungle harvest Amla  (from the heart of chhattishgarh)',
      img: sweet_2.src,
      quantity: 1,
      weightAvailability: [
        {
          weight: '250gm',
          currentPrice: 199,
          inStock: true,
          discount: 10,
        },
        {
          weight: '250gm',
          currentPrice: 299,
          inStock: false,
          discount: 15,
        },
        {
          weight: '1kg',
          currentPrice: 399,
          inStock: true,
          discount: 25,
        },
      ],
      ratings: 4,
      category: 'sweets',
      isNew: false,
      b2bImg: b_5.src,
      b2bQuantity: '30 Kg',
    },
    {
      id: 10,
      name: 'Jamun Juice',
      description:
        'made with jungle harvest Jamun  (from the heart of chhattishgarh)',
      img: jamun.src,
      quantity: 1,
      weightAvailability: [
        {
          weight: '100ml',
          currentPrice: 199,
          inStock: true,
          discount: 10,
        },
        {
          weight: '250ml',
          currentPrice: 299,
          inStock: false,
          discount: 15,
        },
        {
          weight: '500ml',
          currentPrice: 399,
          inStock: true,
          discount: 25,
        },
      ],
      ratings: 4,
      category: 'sweets',
      isNew: true,
      b2bImg: b_2.src,
      b2bQuantity: '30 L',
    },
  ],
  category: [
    {
      id: 1,
      categoryName: 'Ayush Product',
      img: ayush_6.src,
    },
    {
      id: 2,
      categoryName: 'Gourmet Food',
      img: chawanprash.src,
    },
    {
      id: 3,
      categoryName: 'Personal Care',
      img: personal_2.src,
    },
    {
      id: 4,
      categoryName: 'Home Care',
      img: home_care_1.src,
    },
    {
      id: 5,
      categoryName: 'Sweets',
      img: sweet_1.src,
    },
  ],
  myOrders: [
    {
      product: {
        id: 1,
        name: 'Pure Wildforest Honey',
        description:
          'made with pure wildforest honey (from the heart of chhattishgarh)',
        img: pure_honey.src,
        quantity: 1,
        weightAvailability: [
          {
            weight: '250gm',
            currentPrice: 199,
            inStock: true,
            discount: 10,
          },
          {
            weight: '500gm',
            currentPrice: 299,
            inStock: false,
            discount: 15,
          },
          {
            weight: '1kg',
            currentPrice: 399,
            inStock: true,
            discount: 25,
          },
        ],
        // weight: '',
      },
      status: 'In-Transit',
      expectedDate: 'Mon, 4 July 2022',
    },
    {
      product: {
        id: 2,
        name: 'Jyotishmati Oil',
        description:
          'made from pure cold pressed Coconut oil (from the heart of chhattishgarh)',
        img: ayush_2.src,
        quantity: 1,
        weightAvailability: [
          {
            weight: '100ml',
            currentPrice: 199,
            inStock: true,
            discount: 10,
          },
          {
            weight: '250ml',
            currentPrice: 299,
            inStock: false,
            discount: 15,
          },
          {
            weight: '500ml',
            currentPrice: 399,
            inStock: true,
            discount: 25,
          },
        ],
        // weight: '',
      },
      status: 'Delivered',
      expectedDate: 'Sat, 14 May 2022',
    },
    {
      product: {
        id: 3,
        name: 'Ragi Cookies',
        description: 'made with pure ragi (from the heart of chhattishgarh)',
        img: gourmet_2.src,
        quantity: 1,
        weightAvailability: [
          {
            weight: '100gm',
            currentPrice: 99,
            inStock: true,
            discount: 10,
          },
          {
            weight: '200gm',
            currentPrice: 299,
            inStock: false,
            discount: 15,
          },
          {
            weight: '350gm',
            currentPrice: 399,
            inStock: true,
            discount: 25,
          },
        ],
      },
      status: 'Delivered',
      expectedDate: 'Fri, 22 April 2022',
    },
  ],
  couponItems: [
    {
      id: 1,
      name: 'FIRST30',
      description:
        'Use code FIRST30 to get 30% OFF on orders above Rs.500(First Time Order Only).',
      discount: 30,
      expiryDate: 'Fri, 22 june 2022',
      terms: [
        'First Time Order Only',
        'Applicable For Minimum Amount of purchase 1000',
      ],
    },
    {
      id: 2,
      name: 'SAVE25',
      description: 'Use code SAVE25 to get 25% OFF on orders above Rs.500.',
      discount: 25,
      expiryDate: 'Fri, 30 july 2022',
      terms: [
        'First Time Order Only',
        'Applicable For Minimum Amount of purchase 1000',
      ],
    },
  ],

  //--------
  //TODO: CART_ITEM
  //--------
  cartItems: [],

  //TODO: ADD_TO_ORDERITEMS
  orderItems: [],
  //--------
  //TODO: ADD_TO_CART
  //--------
  addToCart: (cartItem) => {
    set((state) => ({
      cartItems: [...state.cartItems, cartItem],
      // orderItems: [...state.orderItems, cartItem],
    }))
  },
  //--------
  //TODO: REMOVE_FROM_CART
  //--------
  removeFromCart: (productId) => {
    set((state) => ({
      cartItems: state.cartItems.filter(
        (cartItem) => cartItem.product.id !== productId
      ),
      // orderItems: state.orderItems.filter(
      //   (cartItem) => cartItem.product.id !== productId
      // ),
    }))
  },

  //TODO: ADD_TO_ORDERITEM
  //--------
  addToOrderItem: (orderItem) => {
    set((state) => ({
      orderItems: [orderItem],
      // cartItems: [...state.cartItems, orderItem],
    }))
  },
  //----------
  //TODO: AAD_TO_ORDERITEM_FROM_CART
  //---------
  addToOrderItemFromCart: () => {
    set((state) => ({
      orderItems: [...state.cartItems],
      // orderItems: [...state.cartItems, ...state.orderItems],
    }))
  },

  //TODO: REMOVE_FROM_ORDERITEM
  removeFromOrderItem: (productId) => {
    set((state) => ({
      orderItems: state.orderItems.filter(
        (cartItem) => cartItem.product.id !== productId
      ),
    }))
  },

  //--------
  //---------
  //TODO: INCREMENT_QUANTITY
  //---------
  incrementQuantity: (productID) => {
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) => {
        if (cartItem.product.id === productID)
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        return cartItem
      }),
      orderItems: state.orderItems.map((orderItem) => {
        if (orderItem.product.id === productID)
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          }
        return orderItem
      }),

      // myCounter: state.myCounter + 1,
    }))
  },

  //---------
  //TODO: UPDATE_QUANTITY ( BOTH INCR & DECR )
  //---------
  updateQuantity: (productID, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) => {
        if (cartItem.product.id === productID)
          return {
            ...cartItem,
            quantity: quantity,
          }
        return cartItem
      }),
      orderItems: state.orderItems.map((orderItem) => {
        if (orderItem.product.id === productID)
          return {
            ...orderItem,
            quantity: quantity,
          }
        return orderItem
      }),
    }))
  },

  //---------
  //TODO: Wishlist
  //--------
  wishlistItems: [],
  //--------

  //TODO: ADD_TO_WISHLIST
  //--------
  addToWishlist: (wishlistItem) => {
    set((state) => ({
      wishlistItems: [wishlistItem, ...state.wishlistItems],
    }))
  },

  //TODO: REMOVE_FROM_WISHLIST
  //--------
  removeFromWishlist: (productId) => {
    set((state) => ({
      wishlistItems: state.wishlistItems.filter(
        (product) => product.id !== productId
      ),
    }))
  },
}))

export default useStore
