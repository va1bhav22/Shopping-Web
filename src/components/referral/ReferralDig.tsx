import { Dialog } from '@mui/material'
import { ICONS, giftBox, info, refAnimateBox } from 'assets'
import { useState } from 'react'
import useSWRAPI from 'hooks/useSWRAPI'
import { object } from 'yup'
type referralDigProps = {
  open: boolean
  onClose: () => void
}
const ReferralDig = ({ open, onClose }: referralDigProps) => {
  const { data, isValidating } = useSWRAPI('config')
  const RefData = data?.data?.data

  const handleRefSubmit = (e: any) => {}
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="relative rounded  bg-[#fff6ee] p-8 shadow">
        <div className="absolute right-3 top-3">
          <button className="text-xl text-red-600  " onClick={onClose}>
            <ICONS.Close />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:gap-0">
          <div className=" ">
            <div className=" ">
              <img
                src={refAnimateBox.src}
                className="h-44"
                alt="refAnimateBox"
              />
            </div>
          </div>

          <div className=" w-[90%] rounded-lg  bg-white p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
            <div>
              <div className="mt-3 flex">
                <img src={info.src} className="h-7" alt="" />
                <p className="mt-[3px] font-sans text-sm ">
                  Looking to maximize your bonus money? Look no further! Buy and
                  using referral code, you can unlock exclusive discounts and
                  benefits. Don't miss out on this incredible opportunity to
                  shop smarter and get more for your money. Grab your chance now
                  and start buying referral code. Happy shopping!
                </p>
              </div>
              <hr className="mt-5 border-[1.7px] border-dashed border-gray-400 pl-3 pr-3" />
              <div className="mt-3 flex flex-col items-center justify-center">
                <p className="font-sans text-gray-500  ">Buy Referral Code</p>
                <p className="font-sans text-xl font-semibold text-sky-400">
                  Entry Fee <span> Rs {RefData?.price} </span>
                </p>
                <button
                  className=" mt-4 rounded-md bg-theme px-5 py-2 text-sm  text-white"
                  type="submit"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ReferralDig
