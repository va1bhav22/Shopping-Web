import React from 'react'
import SearchBar from './SearchBar'
import { headphones, MAIN_LOGO } from 'assets/home'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import NavHeader from './NavHeader'
import ResponsiveNav from './ResponsiveNav'
import Link from 'next/link'
import PersonIcon from '@mui/icons-material/Person'
import { useRouter } from 'next/router'
import { useAuth } from 'hooks'

import styles from '../../styles/core/Marquee.module.css'
import {
  AccountCircle,
  Contacts,
  DriveFileMove,
  Home,
  Info,
  Inventory,
  Notifications,
  PowerSettingsNew,
} from '@mui/icons-material'
import useSWRAPI from 'hooks/useSWRAPI'

export type NAVLIST_TYPE = {
  _id: string
  nav: string
  path: string
  icon: JSX.Element
}

const navListArr: NAVLIST_TYPE[] = [
  {
    _id: '1',
    nav: 'Home',
    path: '/',
    icon: <Home className="!text-sm" />,
  },
  {
    _id: '2',
    nav: 'Products',
    path: '/products',
    icon: <Inventory className="!text-sm" />,
  },
  {
    _id: '3',
    nav: 'About Us',
    path: '/about',
    icon: <Info className="!text-sm" />,
  },
  {
    _id: '4',
    nav: 'Contact Us',
    path: '/contact',
    icon: <Contacts className="!text-sm" />,
  },
]
const myAccountArr = [
  {
    name: 'My Profile',
    icon: <AccountCircle className="!text-base !text-theme" />,
    path: '/my-account/profile',
  },
  {
    name: 'My Orders',
    icon: <DriveFileMove className="!text-base !text-theme" />,
    path: '/my-account/my-order',
  },

  {
    name: 'Notifications',
    icon: <Notifications className="!text-base !text-theme" />,
    path: '/my-account/notifications',
  },
  {
    name: 'Logout',
    icon: <PowerSettingsNew className="!text-base !text-theme" />,
    path: '',
  },
]

const Header = () => {
  const { user, logOut } = useAuth()
  const router = useRouter()
  const { data, isValidating, mutate } = useSWRAPI('get-latest-sale')
  const Marquee = data?.data?.data
  const currentDate = new Date()
  const endSaleDate = new Date(Marquee?.endSale)

  const isSaleExpired = endSaleDate < currentDate
  return (
    <>
      <section className="bg-white">
        <section className="hidden w-full border-b lg:block">
          <div className="main-container flex w-full justify-between py-4">
            <div className="w-full text-sm tracking-wider">
              <p>Welcome to Prizen!</p>
            </div>
            <div className="flex w-full justify-end">
              <Link legacyBehavior href="/wishlist">
                <span className="flex cursor-pointer items-center gap-2 border-r border-theme px-4 text-xs transition-all duration-300 ease-in-out hover:text-theme">
                  <FavoriteBorderIcon className="!text-sm" />
                  My Wishlist
                </span>
              </Link>
              {user?._id ? (
                <div className="group relative">
                  {/* <Link legacyBehavior href="/my-account/profile"> */}
                  <span
                    className="flex cursor-pointer items-center gap-1 px-4 !text-xs transition-all duration-300 ease-in-out hover:text-theme"
                    onClick={() => router.push('/my-account/profile')}
                  >
                    <PersonIcon className="!text-sm" />
                    My Account
                  </span>
                  {/* </Link> */}
                  <div className="absolute top-0 left-0 z-[10000] hidden bg-white shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] group-hover:block">
                    {myAccountArr.map((curElm, index) => (
                      <span
                        key={index}
                        className={`flex cursor-pointer items-center gap-2 p-4 text-sm tracking-wide transition-all duration-300 ease-in-out hover:text-theme ${
                          index !== myAccountArr.length - 1 &&
                          'border-b border-gray-200'
                        }`}
                        onClick={
                          index === myAccountArr.length - 1
                            ? logOut
                            : () => {
                                router.push(curElm.path)
                              }
                        }
                      >
                        {curElm.icon}
                        {curElm.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <Link legacyBehavior href="/signin">
                    <span className="cursor-pointer border-r border-theme px-4 !text-xs transition-all duration-300 ease-in-out hover:text-theme">
                      Sign In
                    </span>
                  </Link>
                  <Link legacyBehavior href="/signup">
                    <span className="cursor-pointer pl-4 !text-xs transition-all duration-300 ease-in-out hover:text-theme">
                      Sign Up
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
        <>
          {!isSaleExpired && (
            <div
              className={`${styles.flash} flex h-10 items-center bg-theme text-white`}
            >
              <div className={`${styles.flash__inner}`}>
                <span className=" ">
                  📢 👉💥
                  {Marquee?.name?.replace('-', '  ') ||
                    'Special Offers Coming Soon'}
                  📢 📣 🎉
                </span>
              </div>
            </div>
          )}
        </>
        <section className="main-container hidden items-center justify-between py-2 lg:flex">
          <div className="w-1/4">
            <Link legacyBehavior href="/">
              <img
                src={MAIN_LOGO.src}
                alt="logo"
                className="w-1/2 cursor-pointer"
              />
            </Link>
          </div>

          <div className="w-1/2">
            <SearchBar />
          </div>

          <div className="flex w-1/4 items-center justify-end gap-3">
            <img src={headphones.src} alt="headphones" className="h-8 w-8" />

            <a
              href="tel:+91 9373054469 "
              className="cursor-pointer transition-all duration-300 ease-in-out hover:text-theme"
            >
              +91 9373054469
            </a>
          </div>
        </section>
      </section>
      <NavHeader arr={navListArr} />
      <ResponsiveNav arr={navListArr} logoutClick={logOut} />
    </>
  )
}

export default Header
