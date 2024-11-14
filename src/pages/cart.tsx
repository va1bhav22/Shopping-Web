import { MainCartSection } from 'components/cart'
import CommonBanner from 'components/CommonBanner'
import { PrivateRoute, PublicLayout } from 'layouts'

const Cart = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="Cart | Prizen">
        <CommonBanner title="My Cart" />
        <MainCartSection />
      </PublicLayout>
    </PrivateRoute>
  )
}

export default Cart
