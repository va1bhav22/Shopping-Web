import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { TextField } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import useAuthFetch from 'hooks/useAuthFetch'
import useSWRAPI from 'hooks/useSWRAPI'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { AppliedCouponType } from 'types/checkout'
import CouponType from 'types/coupon'

export default ({
  ActiveCouponData,
}: {
  ActiveCouponData?: AppliedCouponType
}) => {
  const { data, isValidating } = useSWRAPI('coupons/active', {
    revalidateOnFocus: false,
  })

  const { mutate } = useAuthFetch()
  const { query, push } = useRouter()
  const [voucherValue, setVoucherValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  if (isValidating) return <div>Loading...</div>
  if (!data) return <div>No Coupon Present</div>
  const AllCouponData: CouponType[] = data?.data?.data
  console.log(voucherValue)
  const handleVoucherClicked = async (voucherCode: string) => {
    try {
      const voucherData = await mutate({
        method: 'GET',
        path: `coupon/${voucherCode}`,
      })

      if (voucherData?.error) throw new Error(voucherData?.error)
      push(
        `/checkout?${
          query.type?.toString()?.toUpperCase() === 'PRODUCT'
            ? `type=PRODUCT`
            : 'type=CART'
        }${query?.productId ? `&productId=${query?.productId}` : ''}${
          query?.quantity ? `&quantity=${query?.quantity}` : ''
        }&couponId=${voucherData?.data?._id}
        `
      )
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.message,
      })
    }
  }

  return (
    <>
      {ActiveCouponData && (
        <div className="flex items-start justify-between gap-2 text-gray-500">
          <span className="flex items-center justify-start gap-2 text-gray-500">
            <p>Apply Coupon</p>
            <p className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </p>
          </span>
          <span className="flex flex-col items-end">
            <p className="pb-2 text-sm font-semibold tracking-wide text-green-600">
              {/* {CouponData ? couponName : 'No Coupon Applied'} */}
              {ActiveCouponData ? ActiveCouponData?.coupon : null}
            </p>
            <p>- ₹{ActiveCouponData?.benefitAmount || 0}</p>
          </span>
        </div>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div className="h-full w-full">
          {ActiveCouponData?.coupon ? (
            <button
              className="text-red-600"
              onClick={() =>
                push(
                  `/checkout?${
                    query.type?.toString()?.toUpperCase() === 'PRODUCT'
                      ? `type=PRODUCT`
                      : 'type=CART'
                  }${query?.productId ? `&productId=${query?.productId}` : ''}${
                    query?.quantity ? `&quantity=${query?.quantity}` : ''
                  }
        `
                )
              }
            >
              Remove
            </button>
          ) : (
            <div className="flex justify-between gap-2 rounded border border-gray-200 p-2">
              <TextField
                fullWidth
                type="text"
                name="coupon"
                id="outlined-basic"
                placeholder="Enter Voucher Code"
                variant="outlined"
                value={voucherValue}
                onChange={(e: any) => setVoucherValue(e?.target?.value)}
                InputProps={{
                  classes: {
                    root: ' ',
                    notchedOutline: 'coupon-select-outline',
                    input: 'coupon-select-input',
                  },
                }}
              />
              <button
                className="text-emerald-500"
                onClick={() => {
                  handleVoucherClicked(voucherValue)
                }}
              >
                Apply
              </button>
            </div>
          )}

          {AllCouponData ? (
            <>
              <h1 className="py-4 text-lg tracking-wide">Available Coupons</h1>
              <div className="flex max-h-80 flex-col gap-2 overflow-y-auto rounded-xl">
                {AllCouponData?.map((coupons) => (
                  <CouponCard coupon={coupons} key={coupons?._id} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </Collapse>
    </>
  )
}

const CouponCard = ({ coupon }: { coupon: CouponType }) => {
  const { query, push } = useRouter()
  return (
    <div className="rounded-xl border border-gray-200 p-4" key={coupon._id}>
      <h1 className="tracking-wide">
        {coupon?.description}
        <span className="text-sm text-gray-700">{`(First Time Order Only)`}</span>
        .
      </h1>
      <div className="flex items-center justify-between pt-4">
        {/* <button className="font-semibold text-green-600">View Details</button> */}
        <span className="border border-dashed border-theme bg-gray-100 px-3 py-2">
          {coupon.code}
        </span>
        <span className="flex flex-row items-center justify-center gap-2">
          <button
            className="new-btn relative overflow-hidden rounded border border-green-600 px-6 py-3 text-sm font-semibold text-green-600"
            onClick={() =>
              push(
                `/checkout?${
                  query.type?.toString()?.toUpperCase() === 'PRODUCT'
                    ? `type=PRODUCT`
                    : 'type=CART'
                }${query?.productId ? `&productId=${query?.productId}` : ''}${
                  query?.quantity ? `&quantity=${query?.quantity}` : ''
                }&couponId=${coupon?._id}
                `
              )
            }
          >
            Apply
          </button>
          {query?.couponId === coupon?._id && (
            <button
              className="new-btn relative overflow-hidden rounded border border-red-600 px-6 py-3 text-sm font-semibold text-red-600"
              onClick={() =>
                push(
                  `/checkout?${
                    query.type?.toString()?.toUpperCase() === 'PRODUCT'
                      ? `type=PRODUCT`
                      : 'type=CART'
                  }${query?.productId ? `&productId=${query?.productId}` : ''}${
                    query?.quantity ? `&quantity=${query?.quantity}` : ''
                  }
                `
                )
              }
            >
              Remove
            </button>
          )}
        </span>
      </div>
    </div>
  )
}
