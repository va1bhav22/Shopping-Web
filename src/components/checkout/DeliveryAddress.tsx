import CheckIcon from '@mui/icons-material/Check'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Collapse } from '@mui/material'
import Radio from '@mui/material/Radio'
import { SavedAddresses } from 'components/my-account'
import useSWRAPI from 'hooks/useSWRAPI'
import React from 'react'
import orderSummeryStore from 'store/orderSummery'
import AddressType from 'types/address'
import AddNewAddress from './AddNewAddress'

const DeliveryAddress = ({
  handleDeliveryAddress,
  isDeliveryCollapse,
  setIsDeliveryCollapse,
}: {
  handleDeliveryAddress: (addressId?: string) => void
  isDeliveryCollapse?: boolean
  setIsDeliveryCollapse?: (value: boolean) => void
}) => {
  const { data, isValidating, mutate } = useSWRAPI('address/all/my-addresses', {
    revalidateOnFocus: false,
  })
  const [selectedValue, setSelectedValue] = React.useState('a')
  const { setAddressId, setIsOrderSummaryOpen } = orderSummeryStore()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }
  if (isValidating) return <div>Loading...</div>
  return (
    <section className="w-full">
      <div className={`flex justify-between bg-white px-8 py-4`}>
        <span className="flex items-center gap-2">
          <p className="font-semibold uppercase text-gray-600">
            Delivery Address
          </p>
          <CheckIcon
            className={`text-theme ${isDeliveryCollapse ? 'block' : 'hidden'}`}
          />
        </span>
        <span>
          <ExpandMoreIcon
            className={`${
              isDeliveryCollapse ? 'block cursor-pointer' : 'hidden'
            }`}
            onClick={() => {
              setIsDeliveryCollapse &&
                setIsDeliveryCollapse(!isDeliveryCollapse)
            }}
          />
        </span>
      </div>
      <Collapse in={!isDeliveryCollapse} timeout="auto" unmountOnExit>
        <div className="bg-white px-8 py-4">
          {/* <h1 className="border-b border-gray-200 pb-2 font-semibold uppercase text-gray-600">
            Delivery Address
          </h1> */}
          {data?.data?.data?.map((address: AddressType) => (
            <div
              className="flex w-full gap-4 border-b border-gray-300 py-4"
              key={address?._id}
            >
              <div>
                <Radio
                  checked={selectedValue === address?._id}
                  onChange={handleChange}
                  value={address?._id}
                  name="radio-buttons"
                  inputProps={{ 'aria-label': address?._id }}
                  className="!p-0"
                />
              </div>
              <div className="flex w-full flex-col gap-3">
                <SavedAddresses
                  address={address}
                  isDataLoading={isValidating}
                  reload={() => mutate()}
                />
                {selectedValue === address?._id && (
                  <button
                    className="discount-card relative w-fit overflow-hidden rounded bg-theme px-8 py-4 text-sm uppercase tracking-wider text-white"
                    onClick={() => {
                      handleDeliveryAddress(address?._id)
                      setAddressId(selectedValue)
                      setIsOrderSummaryOpen(true)
                    }}
                  >
                    Deliver Here
                  </button>
                )}
              </div>
              {/* <div className="flex w-full items-start justify-between">
                <div className="flex flex-col gap-3">
                  <h1 className="flex flex-col text-sm tracking-wider md:flex-row md:items-center">
                    {address?.name}
                    <span className="mx-2 w-fit rounded bg-gray-100 px-2 py-1 text-xs text-gray-400">
                      {address?.type}
                    </span>{' '}
                    <span>
                      +{address?.countryCode}-{address?.phoneNumber}
                    </span>{' '}
                  </h1>
                  <p className="text-sm tracking-wider text-gray-500">
                    {address?.landmark}, {address?.street}, {address?.city},{' '}
                    {address?.state}, {address?.country},
                    <span className="font-semibold"> {address?.zip}</span>
                  </p>
                  {selectedValue === 'a' && (
                    <button
                      className="discount-card relative w-fit overflow-hidden rounded bg-theme px-8 py-4 text-sm uppercase tracking-wider text-white"
                      onClick={handleDeliveryAddress}
                    >
                      Deliver Here
                    </button>
                  )}
                </div>
                <div>
                  {selectedValue === 'a' && (
                    <button className="w-fit text-theme hover:text-blue-500">
                      EDIT
                    </button>
                  )}
                </div>
              </div> */}
            </div>
          ))}
        </div>
        <div className="mt-8 bg-white px-8 py-4">
          <AddNewAddress reload={() => mutate()} />
        </div>
      </Collapse>
    </section>
  )
}

export default DeliveryAddress
