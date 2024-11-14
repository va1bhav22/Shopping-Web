import CloseIcon from '@mui/icons-material/Close'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge, IconButton } from '@mui/material'
import useStore from 'app/useStore'
import { MAIN_LOGO } from 'assets/home'
import { useAuth } from 'hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import RespCatList from './RespCatList'
import ResponsiveMyAccount from './ResponsiveMyAccount'

const ResponsiveNav = ({ arr, logoutClick }: any) => {
  const [showNav, setShowNav] = React.useState(false)
  const { cartItems } = useStore((state) => state)
  const router = useRouter()
  const { user } = useAuth()
  const handleCartClick = () => {
    router.push('/cart')
  }

  const handleClose = (e: any) => {
    e.target.dataset.closesidebar && setShowNav(!showNav)
  }

  return (
    <section className="sticky top-0 z-[999] block bg-white lg:hidden">
      <section className="main-container relative flex h-[4.5rem] items-center justify-between py-2 shadow">
        <div className="h-full w-full">
          <Link legacyBehavior href="/">
            <img src={MAIN_LOGO.src} alt="logo" className=" h-full w-auto" />
          </Link>
        </div>
        <div className="flex w-full justify-end gap-4">
          <IconButton onClick={handleCartClick}>
            <Badge
              badgeContent={cartItems?.length}
              color="warning"
              className="!relative"
            >
              <ShoppingCartIcon color="action" className="!text-theme" />
              {user?.cartCount ? (
                <p className="absolute top-[-50%] right-[-50%] flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-sm text-white">
                  {user?.cartCount && user?.cartCount >= 9
                    ? '9+'
                    : user?.cartCount}
                </p>
              ) : null}
            </Badge>
          </IconButton>
          <IconButton onClick={() => setShowNav(!showNav)} className="z-20">
            {showNav ? (
              <CloseIcon className="text-red-700" />
            ) : (
              <MenuIcon className="text-theme" />
            )}
          </IconButton>
        </div>

        <section
          id="nav-menu"
          data-closesidebar
          className={`absolute top-0 left-0 z-10 flex h-screen w-screen bg-black/20 transition-all duration-500 ease-in-out md:-left-[1.7rem] ${
            showNav ? 'translate-x-0' : '-translate-x-full'
          } `}
          onClick={handleClose}
        >
          <div className="z-20 w-[65vw] overflow-y-auto bg-white py-4 px-3">
            <div className="flex w-full justify-center pt-2 pb-4">
              <Link legacyBehavior href="/">
                <img src={MAIN_LOGO.src} alt="logo" className="w-1/2" />
              </Link>
            </div>
            {/* <div className="flex w-full items-center rounded-[30px] border border-theme bg-white">
              <InputBase
                sx={{
                  ml: 2,
                  mr: 2,
                  flex: 1,
                }}
                placeholder="Search Products..."
                inputProps={{ 'aria-label': 'Search Products...' }}
              />
              <IconButton
                type="submit"
                sx={{ p: '4px' }}
                aria-label="search"
                className="m-[2px] bg-theme text-white"
              >
                <SearchIcon />
              </IconButton>
            </div> */}
            <div>
              <RespCatList />
              {arr.map((curElm: any, index: number) => (
                <Link legacyBehavior href={`${curElm?.path}`} key={index}>
                  <span className="flex items-center gap-2 border-b py-2">
                    <p className="!text-base text-theme">{curElm.icon}</p>
                    {curElm.nav}
                  </span>
                </Link>
              ))}
              <Link legacyBehavior href="wishlist">
                <span className="flex items-center gap-2 border-b py-2">
                  <p className="!text-base text-theme">
                    <FavoriteIcon className="!text-sm" />
                  </p>
                  My Wishlist
                </span>
              </Link>
              {user?._id ? (
                <div className="">
                  <ResponsiveMyAccount logoutClick={logoutClick} />
                </div>
              ) : (
                <>
                  <Link legacyBehavior href="/signin">
                    <span className="flex items-center gap-2 border-b py-2">
                      <p className="!text-base text-theme">
                        {' '}
                        <LogoutIcon className="!text-sm" />
                      </p>
                      Sign In
                    </span>
                  </Link>
                  <Link legacyBehavior href="/signup">
                    <span className="flex items-center gap-2 border-b py-2">
                      <p className="!text-base text-theme">
                        <LoginIcon className="!text-sm" />
                      </p>
                      Sign Up
                    </span>
                  </Link>
                </>
              )}

              {/* <Link legacyBehavior  href="/signin">
                <span className="flex items-center gap-2 border-b py-2">
                  <p className="!text-base text-theme">
                    {' '}
                    <LogoutIcon className="!text-sm" />
                  </p>
                  Sign In
                </span>
              </Link>
              <Link legacyBehavior  href="/signup">
                <span className="flex items-center gap-2 border-b py-2">
                  <p className="!text-base text-theme">
                    <LoginIcon className="!text-sm" />
                  </p>
                  Sign Up
                </span>
              </Link> */}
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}

export default ResponsiveNav
