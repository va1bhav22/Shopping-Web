import * as React from 'react'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import PersonIcon from '@mui/icons-material/Person'
import Link from 'next/link'
const myResponsiveAccountArr = [
  {
    name: 'Profile Information',
    path: '/my-account/profile',
  },
  {
    name: 'Manage Addresses',
    path: '/my-account/addresses',
  },
  {
    name: 'My Orders',
    path: '/my-account/my-order',
  },
  {
    name: 'My Wallet',
    path: '/my-account/mywallet',
  },
  {
    name: 'My Trasition History',
    path: '/my-account/transitionHistory',
  },
  {
    name: 'My Books',
    path: '/my-account/myBooks',
  },
  {
    name: 'My Rewards',
    path: '/my-account/myRewards',
  },

  {
    name: 'Notifications',
    path: '/my-account/notifications',
  },
  {
    name: 'My Reviews',
    path: '/my-account/reviews',
  },
]

export default function ResponsiveMyAccount({ logoutClick }: any) {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className="w-full">
      <div onClick={handleClick} className="flex items-center text-theme">
        <PersonIcon className="!text-base" />
        <p className="m-2">My Account</p>
        {open ? (
          <ExpandLess className="!text-base" />
        ) : (
          <ExpandMore className="!text-base" />
        )}
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="flex w-full flex-col items-center">
          {myResponsiveAccountArr.map((curElm: any, index: any) => (
            <Link legacyBehavior href={curElm?.path || '/'} key={index}>
              <p className="flex w-full border-b-2 p-3 text-sm">
                {curElm.name}
              </p>
            </Link>
          ))}
          <p
            className="flex w-full border-b-2 p-3 text-sm"
            onClick={logoutClick}
          >
            Log Out
          </p>
        </div>
      </Collapse>
    </div>
  )
}
