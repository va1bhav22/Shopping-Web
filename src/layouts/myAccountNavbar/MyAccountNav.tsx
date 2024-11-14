import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from 'hooks'
import {
  DriveFileMove,
  FolderShared,
  KeyboardArrowRight,
  ManageAccounts,
  PowerSettingsNew,
} from '@mui/icons-material'
import { ICONS } from 'assets'

const MyAccountNav = () => {
  const { user, setUser } = useAuth()
  // console.log('refferl======>', user)

  const router = useRouter()

  const HandleRefCopy = (ref: any) => {
    console.log(ref)
  }
  return (
    <section className="w-full">
      <div className="flex h-full flex-row flex-wrap items-center justify-center gap-2 bg-white p-4">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="h-full max-h-16 w-auto rounded-full"
        />
        <span>
          <p className="text-sm tracking-wide text-gray-500">Hello,</p>
          <p className="font-semibold tracking-wide">{user?.displayName}</p>
        </span>
        <span className="flex h-full flex-col items-start justify-center ">
          <p
            className={`rounded-full ${
              user?.status === 'PENDING' ? 'bg-yellow-300' : 'bg-green-300'
            } px-2 py-1 text-xs`}
          >
            {user?.status}
          </p>
        </span>

        <div className="flex items-center gap-2  md:ml-3 md:mb-3">
          <span className="rounded-md  bg-theme px-2 py-1 text-sm tracking-wider text-white">
            {user?.referralCode}
          </span>
          <span>
            <ICONS.Copy onClick={() => HandleRefCopy(user?.referralCode)} />
          </span>
        </div>
      </div>

      <div className="mt-4 bg-white">
        <Link href="/my-account/my-order">
          <div className="flex cursor-pointer items-center justify-between border-b border-gray-200 p-4">
            <span className="flex items-center gap-2">
              <DriveFileMove className="text-theme" />
              <p>MY ORDERS</p>
            </span>
            <KeyboardArrowRight className="text-gray-500" />
          </div>
        </Link>
        <div className="flex cursor-pointer flex-col border-b border-gray-200 p-4">
          <div className="flex items-center gap-4 ">
            <ManageAccounts className="text-theme" />
            <p>ACCOUNT SETTINGS</p>
          </div>
          <div className="text-sm tracking-wide text-gray-500">
            <Link href="/my-account/profile">
              <p className="py-2 px-10 hover:bg-gray-100"></p>
            </Link>
            <Link href="/my-account/addresses">
              Profile Information
              <p className="py-2 px-10 hover:bg-gray-100">Manage Addresses</p>
            </Link>
          </div>
        </div>
        <div className="flex cursor-pointer flex-col border-b border-gray-200 p-4">
          <div className="flex items-center gap-4 ">
            <FolderShared className="text-theme" />
            <p>MY STUFF</p>
          </div>
          <div className="text-sm tracking-wide text-gray-500">
            <Link href="/my-account/voucher">
              <p className="py-2 px-10 hover:bg-gray-100">My Vouchers</p>
            </Link>
            <Link href="/my-account/mywallet">
              <p className="py-2 px-10 hover:bg-gray-100">My Wallet</p>
            </Link>
            <Link href="/my-account/transitionHistory">
              <p className="py-2 px-10 hover:bg-gray-100">Transition History</p>
            </Link>
            <Link href="/my-account/myBooks">
              <p className="py-2 px-10 hover:bg-gray-100">My Books</p>
            </Link>
            <Link href="/my-account/myRewards">
              <p className="py-2 px-10 hover:bg-gray-100">My Rewards</p>
            </Link>
            <Link href="/wishlist">
              <p className="py-2 px-10 hover:bg-gray-100">My Wishlist</p>
            </Link>
            <Link href="/my-account/notifications">
              <p className="py-2 px-10 hover:bg-gray-100">Notifications</p>
            </Link>
            <Link href="/my-account/reviews">
              <p className="py-2 px-10 hover:bg-gray-100">
                My Reviews & Ratings
              </p>
            </Link>
            <Link href="/my-account/change-password">
              <p className="py-2 px-10 hover:bg-gray-100">Change Password</p>
            </Link>
          </div>
        </div>

        <div
          className="flex cursor-pointer items-center gap-2 p-4"
          onClick={() => {
            setUser({})
            router.push('/signin')
            localStorage.clear()
          }}
        >
          <PowerSettingsNew className="text-theme" />
          <p>Logout</p>
        </div>
      </div>
    </section>
  )
}

export default MyAccountNav
