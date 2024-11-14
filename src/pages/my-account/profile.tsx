import CommonBanner from 'components/CommonBanner'
import { AccountDetails } from 'components/my-account'
import { PrivateRoute, PublicLayout } from 'layouts'
import MyAccountNavLayout from 'layouts/myAccountNavbar'

const Profile = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="My Account | Prizen">
        <CommonBanner title="My Account" />
        <MyAccountNavLayout>
          <AccountDetails />
        </MyAccountNavLayout>
      </PublicLayout>
    </PrivateRoute>
  )
}

export default Profile
