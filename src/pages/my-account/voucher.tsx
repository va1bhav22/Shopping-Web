import { ContentCopy, DoneAll, Info } from '@mui/icons-material'
import { Dialog, Slide, Tooltip } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { empty_notification } from 'assets/home'
import CommonBanner from 'components/CommonBanner'
import useSWRAPI from 'hooks/useSWRAPI'
import { PrivateRoute, PublicLayout } from 'layouts'
import MyAccountNavLayout from 'layouts/myAccountNavbar'
import moment from 'moment'
import React, { useState, forwardRef, ReactElement, Ref } from 'react'
import Skeleton from 'react-loading-skeleton'
import VoucherCardType from 'types/voucher'

// TODO: Dialog Transition property

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

const Voucher = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="Vouchers | Prizen">
        <CommonBanner title="Vouchers" />
        <MyAccountNavLayout>
          <AllVouchers />
        </MyAccountNavLayout>
      </PublicLayout>
    </PrivateRoute>
  )
}
const AllVouchers = () => {
  const [limit, setLimit] = useState<number>(2)
  const [chunk, setChunk] = useState<number>(0)
  const { data, isValidating, mutate } = useSWRAPI(`coupons/vouchers`, {
    revalidateOnFocus: true,
  })
  console.log(data)
  if (isValidating)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-white p-10 text-center">
        {Array(10)
          .fill(0)
          ?.map((_, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-start gap-4 rounded-md"
            >
              <Skeleton height={15} width={300} />
            </div>
          ))}
      </div>
    )
  if (!data?.data?.data?.data?.length && !chunk) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 bg-white p-10 text-center">
        <img src={empty_notification.src} alt="coupons" />
        <h1 className="mt-4 mb-2 text-lg font-semibold tracking-wide">
          All caught up!
        </h1>
        <p className="text-sm text-slate-800">There are no vouchers for you.</p>
      </div>
    )
  }
  return (
    <>
      <article className="h-full w-full flex-col items-center gap-4 rounded-lg bg-white p-6">
        <h1 className="pb-4 text-lg font-semibold tracking-wider text-theme">
          All Vouchers:
        </h1>
        <section className="flex flex-col gap-2">
          <aside className="mb-2 flex items-center justify-between gap-2 border-b px-2 pb-2 font-semibold text-slate-800">
            <p className="w-[70%]">Coupon Code</p>
            <p className="w-[30%]">Status</p>
          </aside>
          {data?.data?.data?.data?.map((voucher: VoucherCardType) => (
            <VoucherCard voucher={voucher} key={voucher?._id} />
          ))}
        </section>
      </article>
    </>
  )
}

const VoucherCard = ({ voucher }: { voucher: VoucherCardType }) => {
  const [isCopied, setIsCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const startDate = moment(voucher?.startDate)
  const endDate = moment(voucher?.endDate)
  return (
    <>
      <aside className="flex items-center justify-between gap-2 rounded-md px-2 py-4 text-sm font-medium text-slate-800 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="flex w-[70%] items-center gap-4">
          <p className="tracking-wide">{voucher?.code}</p>
          <p
            className="cursor-pointer text-blue-600"
            onClick={() => setIsOpen(true)}
          >
            <Info className="!text-base" />
          </p>
          {isCopied ? (
            <p className="text-green-600">
              <DoneAll fontSize="small" />{' '}
              <span className="text-sm">Copied!</span>
            </p>
          ) : (
            <p className="cursor-pointer text-slate-500">
              <Tooltip
                title="Copy to Clipboard"
                placement="top-start"
                followCursor
              >
                <ContentCopy
                  fontSize="small"
                  onClick={() => {
                    navigator.clipboard.writeText(voucher?.code)
                    setIsCopied(true)
                  }}
                />
              </Tooltip>
            </p>
          )}
        </div>
        {moment(endDate).isBefore(new Date()) || voucher?.isUsed ? (
          <p className="w-[30%] text-red-600">Expired</p>
        ) : (
          <p className="w-[30%]">
            Valid till:
            <span className="text-green-600"> {endDate?.format('ll')}</span>
          </p>
        )}
      </aside>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth="sm"
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <article className="flex w-full flex-col items-center justify-center gap-4 p-10">
          <h1 className="text-2xl font-semibold text-theme">Voucher Info</h1>
          <div className="flex flex-col gap-1 text-center font-semibold">
            <p className="text-center text-lg">{voucher?.code}</p>
            <p className="font-medium">
              Use the above code to get ₹{voucher?.discount} off on minimum
              order above ₹{voucher?.minOrderAmount} in your next purchase.
            </p>
            <p className="">
              Active Date:{' '}
              <span className="font-normal"> {startDate?.format('ll')}</span>
            </p>
            <p className="">
              Expiry Date:{' '}
              <span className="font-normal"> {endDate?.format('ll')}</span>
            </p>
          </div>
        </article>
      </Dialog>
    </>
  )
}

export default Voucher
