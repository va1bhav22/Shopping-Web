import MoreVertIcon from '@mui/icons-material/MoreVert'
import CircularProgress from '@mui/material/CircularProgress'
import { AddNewAddress } from 'components/checkout'
import useAuthFetch from 'hooks/useAuthFetch'
import React from 'react'
import AddressType from 'types/address'

const SavedAddresses = ({
  address,
  reload,
  isDataLoading,
}: {
  address: AddressType
  reload?: () => void
  isDataLoading?: boolean
}) => {
  const [editAddressOfId, setEditAddressOfId] = React.useState<string | null>(
    null
  )
  const { isLoading, mutate } = useAuthFetch()
  const handleDelete = async (addressId: string) => {
    await mutate({
      path: `address/${addressId}`,
      method: 'DELETE',
    })
    reload && reload()
  }
  const handleMakeDefault = async (addressId: string) => {
    await mutate({
      path: `address/${addressId}`,
      method: 'PUT',
      body: JSON.stringify({
        isDefault: true,
      }),
    })
    reload && reload()
  }
  return (
    <section className="w-full border border-gray-300 p-4">
      {editAddressOfId ? (
        <AddNewAddress
          reload={() => reload && reload()}
          title="Edit Address"
          addressId={editAddressOfId}
          onClose={() => setEditAddressOfId(null)}
        />
      ) : (
        <>
          <div className="flex w-full justify-between">
            <div className="flex flex-row items-center gap-2">
              <p className="w-fit rounded bg-gray-100 px-2 py-1 text-xs text-gray-400">
                {address?.type}
              </p>
              {address?.isDefault && (
                <p className="w-fit rounded bg-green-100 px-2 py-1 text-xs text-green-600">
                  Default
                </p>
              )}
            </div>
            <div className="group relative">
              {isLoading || isDataLoading ? (
                <CircularProgress size={16} />
              ) : (
                <>
                  <MoreVertIcon className="text-gray-500 hover:text-blue-500" />
                  <div className="absolute right-1 top-0 z-10 hidden flex-col items-start bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] group-hover:flex">
                    <p
                      className="w-full cursor-pointer py-2 px-4 text-sm tracking-wide text-gray-500 hover:text-blue-500"
                      onClick={() => setEditAddressOfId(address?._id)}
                    >
                      Edit
                    </p>
                    <p
                      className="w-full cursor-pointer py-2 px-4 text-sm tracking-wide text-gray-500 hover:text-red-500"
                      onClick={() => handleDelete(address?._id)}
                    >
                      Delete
                    </p>
                    <p
                      className="w-full cursor-pointer py-2 px-4 text-sm tracking-wide text-gray-500 hover:text-red-500"
                      onClick={() => handleMakeDefault(address?._id)}
                    >
                      Set Default
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2 pb-3 font-semibold md:flex-row md:items-center md:gap-8">
            <p>{address?.name}</p>
            <p className="text-sm">
              +{address?.countryCode} {address?.phoneNumber}
            </p>
            <p className="text-sm text-gray-700">{address?.email}</p>
          </div>
          <p className="text-sm font-light tracking-wider ">
            {address?.landmark}, {address?.street}, {address?.city},{' '}
            {address?.state}, {address?.country},
            <span className="font-semibold"> {address?.zip}</span>
          </p>
        </>
      )}
    </section>
  )
}

export default SavedAddresses
