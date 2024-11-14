import { CheckoutSection } from 'components/checkout'
import CommonBanner from 'components/CommonBanner'
import { PrivateRoute, PublicLayout } from 'layouts'

const Checkout = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="Checkout | Prizen">
        <CommonBanner title="Checkout" />
        <CheckoutSection />
      </PublicLayout>
    </PrivateRoute>
  )
}

export default Checkout
