import { empty_cart } from 'assets/home'
import { AddNewAddress } from 'components/checkout'
import CommonBanner from 'components/CommonBanner'
import { SavedAddresses } from 'components/my-account'
import useSWRAPI from 'hooks/useSWRAPI'
import { PrivateRoute, PublicLayout } from 'layouts'
import MyAccountNavLayout from 'layouts/myAccountNavbar'
import Skeleton from 'react-loading-skeleton'
import AddressType from 'types/address'

const Reviews = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="Manage Addresses | Prizen">
        <CommonBanner title="My Addresses" />
        <MyAccountNavLayout>
          <AllAddresses />
        </MyAccountNavLayout>
      </PublicLayout>
    </PrivateRoute>
  )
}

const AllAddresses = () => {
  const { data, isValidating, mutate } = useSWRAPI('address/all/my-addresses')
  if (isValidating) return <SkeletonSection />
  if (!data)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img
          src={empty_cart.src}
          alt="empty category"
          className="h-auto w-1/2"
        />
        <h1 className="text-black">Address Not Added</h1>
      </div>
    )
  return (
    <div className="h-full bg-white p-4">
      <div className="mb-8 border border-gray-300 p-4 ">
        <AddNewAddress reload={() => mutate()} />
      </div>
      {data?.data?.data?.map((address: AddressType) => (
        <SavedAddresses
          address={address}
          key={address?._id}
          reload={() => mutate()}
          isDataLoading={isValidating}
        />
      ))}
    </div>
  )
}

const SkeletonSection = () => {
  return (
    <div className="h-full bg-white p-4">
      <div className="mb-8 flex flex-row items-center gap-2 border border-gray-300 p-4">
        <Skeleton height={30} width={30} />
        <Skeleton height={20} width={130} />
      </div>
      {Array(3)
        .fill(0)
        ?.map((_, index) => (
          <section key={index} className="w-full border border-gray-300 p-4">
            <div className="flex w-full justify-between">
              <div className="flex flex-row items-center gap-2 ">
                <Skeleton height={20} width={40} />
                <Skeleton height={20} width={40} />
              </div>
            </div>
            <Skeleton count={3} height={15} />
          </section>
        ))}
    </div>
  )
}

export default Reviews
