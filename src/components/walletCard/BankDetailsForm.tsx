import { Dialog } from '@mui/material'
import { ICONS } from 'assets'
import { useState } from 'react'
type WalletBankDetailsProps = {
  open: boolean
  close: () => void
}
const BankDetailsForm = ({ open, close }: WalletBankDetailsProps) => {
  const [bankName, setBankName] = useState('')

  const [acNumber, setAcNumber] = useState('')
  const [ifscCode, setIfscCode] = useState('')
  const [holderName, setHoldername] = useState('')
  const [longitude, setlongitude] = useState('')
  const [latitude, setlatitude] = useState('')
  const [postalPin, setpostalPin] = useState('')

  const handleSubmit = (event: any) => {
    event.preventDefault()

    // const storedata = {
    //   bankName: bankName,
    //   acNumber: acNumber,
    //   ifscCode: ifscCode,
    //   holderName: holderName,
    //   longitude: longitude,
    //   latitude: latitude,
    //   postalPin: postalPin,
    // }
    // console.log('Form Data:', storedata)
  }
  return (
    <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
      <div className="relative rounded px-2 py-6 shadow">
        <span
          className="absolute top-4 right-4 text-xl text-red-600 "
          onClick={close}
        >
          <ICONS.Close />
        </span>

        <div className="flex w-full justify-center md:justify-end ">
          <div className="ml-5 w-full md:ml-0 md:w-4/5">
            <h1 className="text-[17px] font-semibold text-slate-700 md:text-[1.6rem]">
              ADD YOUR BANK
            </h1>
            <form action="" onSubmit={handleSubmit} className="">
              <div>
                <label
                  className="text-[14px] font-semibold tracking-wider"
                  htmlFor=""
                >
                  BANK NAME
                </label>
                <div className="flex h-10 w-3/4 items-center justify-between border border-gray-600 p-1">
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className=" w-[9rem] border-none pl-3 outline-none md:w-[18rem]"
                  />
                  <ICONS.Bank className="text-2xl" />
                </div>
              </div>
              <div className="mt-2">
                <label
                  className="text-[14px] font-semibold tracking-wider"
                  htmlFor=""
                >
                  ACCOUNT NUMBER
                </label>
                <div className="flex h-10 w-3/4 items-center justify-between border border-gray-600 p-1">
                  <input
                    type="text"
                    value={acNumber}
                    inputMode="numeric"
                    onChange={(e) => setAcNumber(e.target.value)}
                    className=" w-[9rem] border-none pl-3 outline-none md:w-[18rem]"
                  />
                  <ICONS.AccountNo className="text-2xl" />
                </div>
              </div>
              <div className="mt-2">
                <label
                  className="text-[14px] font-semibold tracking-wider"
                  htmlFor=""
                >
                  IFSC CODE
                </label>
                <div>
                  <input
                    type="text"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    className="h-[40px] w-3/4 border border-gray-600 pl-4 outline-none"
                  />
                </div>
              </div>

              <div className="mt-2">
                <label
                  className="text-[14px] font-semibold tracking-wider"
                  htmlFor=""
                >
                  BANK HOLDER NAME
                </label>
                <div>
                  <input
                    type="text"
                    value={holderName}
                    onChange={(e) => setHoldername(e.target.value)}
                    className="h-[40px] w-3/4 border border-gray-600 pl-4 outline-none"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label
                  className="text-[14px] font-semibold tracking-wider"
                  htmlFor=""
                >
                  LONGITUDE
                </label>
                <div>
                  <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setlongitude(e.target.value)}
                    className="h-[40px] w-3/4 border border-gray-600 pl-4 outline-none"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label
                  className="text-[14px] font-semibold tracking-wider"
                  htmlFor=""
                >
                  LATITUDE
                </label>
                <div>
                  <input
                    type="text"
                    value={latitude}
                    onChange={(e) => setlatitude(e.target.value)}
                    className="h-[40px] w-3/4 border border-gray-600 pl-4 outline-none"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label
                  className="text-[14px] font-semibold tracking-wider"
                  htmlFor=""
                >
                  POSTAL PIN
                </label>
                <div>
                  <input
                    type="text"
                    value={postalPin}
                    onChange={(e) => setpostalPin(e.target.value)}
                    className="h-[40px] w-3/4 border border-gray-600 pl-4 outline-none"
                  />
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="rounded-md bg-slate-700 py-2 px-4 font-medium tracking-widest text-white"
                >
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default BankDetailsForm
