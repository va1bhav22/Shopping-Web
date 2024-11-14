import {
  Add,
  BrandingWatermark,
  Business,
  CardGiftcard,
  Category,
  Celebration,
  ConnectWithoutContact,
  Dashboard,
  FeedOutlined,
  Help,
  Home,
  Inventory,
  Key,
  LocalShipping,
  ManageAccounts,
  MonetizationOn,
  Money,
  Newspaper,
  Notifications,
  Pending,
  People,
  Report,
  RequestPage,
  Reviews,
  Settings,
  ShoppingCart,
  SupervisedUserCircle,
  Support,
  SystemSecurityUpdateGood,
  SystemUpdate,
} from '@mui/icons-material'
import useAuth from './useAuth'

export default () => {
  const { user } = useAuth()
  if (user?.role === 'ADMIN')
    return [
      {
        key: '1',
        title: 'Dashboard',
        icon: <Dashboard />,
        route: '/admin/dashboard',
      },

      // {
      //   key: '4',
      //   title: 'Customers',
      //   icon: <People />,
      //   route: '/admin/customers',
      // },
      {
        key: '4',
        title: 'Users',
        icon: <SupervisedUserCircle />,
        submenus: [
          {
            key: '8-1',
            title: 'Customers',
            icon: <People />,
            route: '/admin/customers',
          },
          // {
          //   key: '8-2',
          //   title: 'B2B Kyc',
          //   icon: <Pending />,
          //   route: '/admin/customers/upgrade-requests',
          // },
        ],
      },
      // {
      //   key: '8',
      //   title: 'Stores',
      //   icon: <LocalShipping />,
      //   submenus: [
      //     {
      //       key: '1',
      //       title: 'Hub',
      //       icon: <Home />,
      //       route: '/admin/hub',
      //     },
      //     {
      //       key: '8-1',
      //       title: 'Manage Stores',
      //       icon: <ShoppingCart />,
      //       route: '/admin/stores',
      //     },
      //     {
      //       key: '8-2',
      //       title: 'Store Manager',
      //       icon: <ManageAccounts />,
      //       route: '/admin/stores/store-manager',
      //     },
      //   ],
      // },
      {
        key: '9',
        title: 'Products',
        icon: <ConnectWithoutContact />,
        submenus: [
          {
            key: '2.2',
            title: 'Add Product',
            icon: <Add />,
            route: '/admin/b2c-products/add',
          },
          {
            key: '2.3',
            title: 'Manage Products',
            icon: <Inventory />,
            route: '/admin/b2c-products/manage',
          },
        ],
      },
      // {
      //   key: '2',
      //   title: 'B2B Products',
      //   icon: <Business />,
      //   submenus: [
      //     {
      //       key: '2.2',
      //       title: 'Add Product',
      //       icon: <Add />,
      //       route: '/admin/b2b-products/add',
      //     },
      //     {
      //       key: '2.3',
      //       title: 'Manage Products',
      //       icon: <Inventory />,
      //       route: '/admin/b2b-products/manage',
      //     },
      //   ],
      // },
      {
        key: '3',
        title: 'Categories',
        icon: <Category />,
        route: '/admin/categories',
      },
      // {
      //   key: '4',
      //   title: 'Users',
      //   icon: <Group />,
      //   submenus: [
      //     {
      //       key: '4.2',
      //       title: 'View Users',
      //       icon: <Group />,
      //       route: '/admin/users',
      //     },
      //   ],
      // },

      {
        key: '5',
        title: 'Orders',
        icon: <LocalShipping />,
        submenus: [
          {
            key: '5.1',
            title: 'Manage Orders',
            icon: <ConnectWithoutContact />,
            route: '/admin/orders/b2c-orders',
          },
          // {
          //   key: '5.2',
          //   title: 'B2B Orders',
          //   icon: <Business />,
          //   route: '/admin/orders/b2b-orders',
          // },
          // {
          //   key: '5.3',
          //   title: 'Requested Orders',
          //   icon: <RequestPage />,
          //   route: '/admin/orders/requested-orders',
          // },
        ],
      },
      {
        key: '11',
        title: 'Coupons',
        icon: <CardGiftcard />,
        route: '/admin/coupons',
      },
      {
        key: '11',
        title: 'Offers',
        icon: <Celebration />,
        route: '/admin/vouchers',
      },
      {
        key: '10',
        title: 'Reports',
        icon: <Report />,
        route: '/admin/reports',

        // submenus: [
        //   {
        //     key: '10.1',
        //     title: 'B2C Reports',
        //     icon: <ConnectWithoutContact />,
        //     route: '/admin/b2c-reports',
        //   },
        //   {
        //     key: '10.2',
        //     title: 'B2B Reports',
        //     icon: <Business />,

        //     route: '/admin/b2b-reports',
        //   },
        // ],
      },
      // {
      //   key: '14',
      //   title: 'Total Revenue',
      //   icon:<Money/>,
      //   route: '/admin/revenue',
      // },
      {
        key: '12',
        title: 'Reviews',
        icon: <Reviews />,
        route: '/admin/reviews',
      },

      {
        key: '7',
        title: 'Support',
        icon: <Support />,
        route: '/admin/support',
      },
      // {
      //   key: '15',
      //   title: 'Enquiry',
      //   icon: <Help />,
      //   route: '/admin/enquiry',
      // },
      // {
      //   key: '17',
      //   title: 'Manage News',
      //   icon: <Newspaper />,
      //   route: '/admin/news',
      // },
      // {
      //   key: '18',
      //   title: 'Manage Blogs',
      //   icon: <FeedOutlined />,
      //   route: '/admin/blogs',
      // },
      {
        key: '18',
        title: 'Manage Banner',
        icon: <BrandingWatermark />,
        route: '/admin/banners',
      },

      {
        key: '16',
        title: 'Config',
        icon: <SystemSecurityUpdateGood />,
        submenus: [
          {
            key: '16.1',
            route: '/admin/config/app-config',
            title: 'App Config',
            icon: <SystemUpdate />,
          },
          {
            key: '16.2',
            route: '/admin/config/set-gst',
            title: 'GST Config',
            icon: <MonetizationOn />,
          },
          {
            key: '16.3',
            route: '/admin/config/delivery-config',
            title: 'Delivery Charge',
            icon: <Money />,
          },
        ],
      },
      {
        key: '13',
        title: 'Notifications',
        icon: <Notifications />,
        route: '/admin/notifications',
      },
      {
        key: '6',
        title: 'Settings',
        icon: <Settings />,
        submenus: [
          {
            key: '6.1',
            route: '/admin/change-password',
            title: 'Change Password',
            icon: <Key />,
          },
          // {
          //   key: '6.2',
          //   route: '/admin/update-email',
          //   title: 'Update Email',
          //   icon: <EmailOutlined />,
          // },
        ],
      },
    ]
  if (user?.role === 'SELLER')
    return [
      {
        key: '1',
        title: 'Dashboard',
        icon: <Dashboard />,
        route: '/admin/manager/dashboard',
      },
      {
        key: '4',
        title: 'Customers',
        icon: <People />,
        route: '/admin/manager/customers',
      },
      {
        key: '9',
        title: 'B2C Products',
        icon: <ConnectWithoutContact />,
        submenus: [
          {
            key: '2.2',
            title: 'Add Product',
            icon: <Add />,
            route: '/admin/b2c-products/add',
          },
          {
            key: '2.3',
            title: 'Manage Products',
            icon: <Inventory />,
            route: '/admin/b2c-products/manage',
          },
        ],
      },
      {
        key: '2',
        title: 'B2B Products',
        icon: <Business />,
        submenus: [
          {
            key: '2.2',
            title: 'Add Product',
            icon: <Add />,
            route: '/admin/b2b-products/add',
          },
          {
            key: '2.3',
            title: 'Manage Products',
            icon: <Inventory />,
            route: '/admin/b2b-products/manage',
          },
        ],
      },
      {
        key: '3',
        title: 'Categories',
        icon: <Category />,
        route: '/admin/manager/categories',
      },
      // {
      //   key: '4',
      //   title: 'Users',
      //   icon: <Group />,
      //   submenus: [
      //     {
      //       key: '4.2',
      //       title: 'View Users',
      //       icon: <Group />,
      //       route: '/admin/users',
      //     },
      //   ],
      // },

      {
        key: '5',
        title: 'Orders',
        icon: <LocalShipping />,
        submenus: [
          {
            key: '5.1',
            title: 'B2C Orders',
            icon: <ConnectWithoutContact />,
            route: '/admin/orders/b2c-orders',
          },
          {
            key: '5.2',
            title: 'B2B Orders',
            icon: <Business />,
            route: '/admin/orders/b2b-orders',
          },
          {
            key: '5.3',
            title: 'Requested Orders',
            icon: <RequestPage />,
            route: '/admin/orders/requested-orders',
          },
        ],
      },
      // {
      //   key: '11',
      //   title: 'Coupons',
      //   icon: <CardGiftcard />,
      //   route: '/admin/coupons',
      // },
      {
        key: '10',
        title: 'Reports',
        icon: <Report />,
        route: '/admin/reports',

        // submenus: [
        //   {
        //     key: '10.1',
        //     title: 'B2C Reports',
        //     icon: <ConnectWithoutContact />,
        //     route: '/admin/b2c-reports',
        //   },
        //   {
        //     key: '10.2',
        //     title: 'B2B Reports',
        //     icon: <Business />,

        //     route: '/admin/b2b-reports',
        //   },
        // ],
      },
      // {
      //   key: '14',
      //   title: 'Total Revenue',
      //   icon:<Money/>,
      //   route: '/admin/revenue',
      // },
      {
        key: '12',
        title: 'Reviews',
        icon: <Reviews />,
        route: '/admin/manager/reviews',
      },
      {
        key: '12',
        title: 'Support',
        icon: <Support />,
        route: '/admin/manager/support',
      },
      {
        key: '13',
        title: 'Notifications',
        icon: <Notifications />,
        route: '/admin/notifications',
      },
      {
        key: '6',
        title: 'Settings',
        icon: <Settings />,
        submenus: [
          {
            key: '6.1',
            route: '/admin/change-password',
            title: 'Change Password',
            icon: <Key />,
          },
          // {
          //   key: '6.2',
          //   route: '/admin/update-email',
          //   title: 'Update Email',
          //   icon: <EmailOutlined />,
          // },
        ],
      },
    ]
  return []
}
