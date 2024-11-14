import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge } from '@mui/material'
import useStore from 'app/useStore'
import { useAuth } from 'hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CategoryList from './CategoryList'
import { log } from 'console'
import { NAVLIST_TYPE } from './Header'
import { ICONS } from 'assets'
import { useState } from 'react'
import SellerForm from './SellerForm'

type Props = {
  arr: NAVLIST_TYPE[]
}

const NavHeader = ({ arr }: Props) => {
  const cartItems = useStore((state) => state.cartItems)
  const { user } = useAuth()
  const router = useRouter()
  const handleCartClick = () => {
    router.push('/cart')
  }

  const [showForm, setShowForm] = useState(false)

  const openForm = () => {
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
  }

  return (
    <section className="sticky -top-1 z-50 hidden bg-theme text-white shadow lg:block">
      <section className="main-container flex justify-between">
        <CategoryList />

        {arr.map((curElm) => (
          <Link legacyBehavior href={curElm?.path || '/'} key={curElm?._id}>
            <p className="flex cursor-pointer items-center gap-2 py-6 text-sm">
              {curElm.icon}

              {curElm.nav}
            </p>
          </Link>
        ))}
        <div onClick={openForm}>
          <p className="flex cursor-pointer items-center gap-2 py-6 text-sm">
            <ICONS.Seller />
            Become A Seller
          </p>
        </div>
        <div
          className="flex cursor-pointer items-center gap-2 bg-theme_light p-4 text-sm text-white"
          onClick={handleCartClick}
        >
          <Badge
            badgeContent={cartItems.length}
            color="warning"
            className="!relative"
          >
            <ShoppingCartIcon color="action" className="!text-white" />
            {user?.cartCount ? (
              <p className="absolute top-[-50%] right-[-50%] flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                {user?.cartCount && user?.cartCount > 9
                  ? '9+'
                  : user?.cartCount}
              </p>
            ) : null}
          </Badge>
        </div>
      </section>
      {showForm && <SellerForm open={showForm} onClose={closeForm} />}
    </section>
  )
}

export default NavHeader
