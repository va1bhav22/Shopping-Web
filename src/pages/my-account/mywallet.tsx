import { Rupee, bankHistory, walletBg } from 'assets'
import CommonBanner from 'components/CommonBanner'
import BankDetailsForm from 'components/walletCard/BankDetailsForm'
// import WalletCard from 'components/walletCard/WalletCard'
import { useAuth } from 'hooks'
import useSWRAPI from 'hooks/useSWRAPI'
import moment from 'moment'
import { PrivateRoute, PublicLayout } from 'layouts'
import MyAccountNavLayout from 'layouts/myAccountNavbar'
import { useState } from 'react'
import TransactionHistoryPopUp from 'components/TransactionHistory/TransactionHistoryPopUp'
import { Console } from 'console'
const MyWallet = () => {
  // const { data, mutate } = useSWRAPI('wallet-balance')

  return (
    <PrivateRoute>
      <PublicLayout title="My Wallet | Prizen">
        <CommonBanner title="My Wallet" />
        <MyAccountNavLayout>
          <WalletStore />
        </MyAccountNavLayout>
      </PublicLayout>
    </PrivateRoute>
  )
}

const WalletStore = () => {
  const [showWalletCard, setShowWalletCard] = useState(false)

  const { user } = useAuth()

  const { data, isValidating, mutate } = useSWRAPI('wallet-balance')
  const walletData = data?.data?.data
  console.log('wallet===>', walletData)

  const cardOpenPopup = () => {
    setShowWalletCard(true)
  }
  const CardclosePopup = () => {
    setShowWalletCard(false)
  }

  const {
    data: TransctionData,
    isValidating: TracsIsValidating,
    mutate: transMutate,
  } = useSWRAPI('get-transaction')
  const TrancData = TransctionData?.data?.data?.data
  // console.log('tranceData===========>', TrancData)

  return (
    <div className=" h-full w-full bg-slate-50 p-5">
      <div className="grid grid-cols-1  justify-between gap-4 xl:grid-cols-3">
        <div className="flex  items-center  rounded-lg bg-white bg-gradient-to-br from-[#31c8d9]  to-[#e16fae] p-1 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className="w-[50%]">
            <img
              src="https://i.ibb.co/ZVGwTgw/3445606-518967-PIMI1-M-298-removebg-preview.png"
              className=""
              alt=""
            />
          </div>
          <div className="flex w-full  flex-col gap-5   pr-4">
            <p className="text-right text-xl font-semibold tracking-wider text-white">
              Bonus Amount
            </p>
            <p className="text-right tracking-wide text-white">
              <span className="text-xl">₹ </span>
              {walletData?.['BONUS-AMOUNT'] || 0}
            </p>
          </div>
        </div>
        <div className="flex items-center  rounded-lg bg-white bg-gradient-to-br from-[#31c8d9]  to-[#e16fae] p-1 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className="w-[50%]">
            <img src={Rupee.src} className="" alt="" />
          </div>
          <div className="flex w-full flex-col gap-5  pr-4">
            <p className="text-right text-xl font-semibold tracking-wider text-white">
              Referral Amount
            </p>
            <p className="text-right tracking-wide text-white">
              <span className="text-xl">₹ </span>{' '}
              {walletData?.['REFERRAL'] || 0}
            </p>
          </div>
        </div>
        <div className="flex  items-center   rounded-lg bg-white bg-gradient-to-br from-[#31c8d9]  to-[#e16fae] p-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className="w-[50%]">
            <img src={walletBg.src} className="" alt="" />
          </div>
          <div className="w-full pr-4">
            <div className="flex flex-col gap-2">
              <p className="text-right text-xl font-semibold tracking-wider text-white">
                Total Amount
              </p>
              <p className="text-right tracking-wide text-white">
                <span className="text-xl">₹ </span>{' '}
                {walletData?.['totalAmount'] || 0}
              </p>
            </div>
            <div className="mt-4 flex justify-end pb-2">
              <button
                onClick={cardOpenPopup}
                className="rounded-md bg-sky-500   py-2 px-5 font-sans text-[15px] tracking-wider text-white"
              >
                Withdrow
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col pt-10 ">
        <h1 className="text-xl text-gray-600 ">Transaction History</h1>

        <div className="mt-6 max-h-[450px] overflow-y-auto rounded-xl    shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className=" ">
            {TrancData?.map((tranc: any) => (
              <TransactionCard tranc={tranc} />
            ))}
          </div>
        </div>
      </div>
      {showWalletCard && (
        <BankDetailsForm open={showWalletCard} close={CardclosePopup} />
      )}
    </div>
  )
}

const TransactionCard = ({ tranc }: any) => {
  // console.log(tranc)
  const [open, setOpen] = useState(false)
  const [tanceData, setTranceData] = useState(null)
  const HandleOpen = (data: any) => {
    setTranceData(data)
    setOpen(true)
  }
  return (
    <div className="flex cursor-default flex-col items-center justify-center border-b bg-white p-3 ">
      <div
        onClick={() => HandleOpen(tranc)}
        className={`flex w-full items-center justify-between p-2 md:w-[70%] `}
      >
        <div className="flex items-center gap-6">
          {tranc.amount < 0 ? (
            <img
              className="w-[2.5rem]"
              src="https://i.ibb.co/441qxYW/diagonal-arrow.png"
              alt=""
            />
          ) : (
            <img
              className="w-[2.5rem]"
              src="https://i.ibb.co/FY63Sd7/up-arrow.png"
              alt=""
            />
          )}
          <div>
            <p
              className={` text-lg font-semibold tracking-wider ${
                tranc?.amount < 0 ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {tranc.amount < 0 ? ' DEBITED' : ' CREDITED'}
            </p>
            <p className="text-sm text-gray-600">
              {moment(tranc?.createdAt).format('MMM Do YYYY, h:mm a ')}
            </p>
          </div>
        </div>
        <div>
          <div className=" xl:w-[8rem]">
            <p
              className={`text-xl font-semibold md:pr-3 ${
                tranc?.amount < 0 ? 'text-red-600' : 'text-green-600'
              }`}
            >
              ₹ {tranc?.amount}
            </p>
          </div>
        </div>
      </div>
      {open && (
        <TransactionHistoryPopUp
          transData={tanceData}
          open={open}
          close={() => setOpen(false)}
        />
      )}
    </div>
  )
}

export default MyWallet
