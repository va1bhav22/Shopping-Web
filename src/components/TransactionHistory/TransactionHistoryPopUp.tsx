import { Dialog } from '@mui/material'
import { BlueHi, ICONS, redHi } from 'assets'
import moment from 'moment'
type TransactionHistoryPopUpProps = {
  open: boolean
  close: () => void
  transData: any
}
const TransactionHistoryPopUp = ({
  open,
  close,
  transData,
}: TransactionHistoryPopUpProps) => {
  console.log('tranceData===========>', transData)
  return (
    <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
      <div className="relative rounded  bg-[#f5ede7] p-8 shadow">
        <div className="">
          <div
            className={`flex gap-7  p-3  text-white  ${
              transData?.amount < 0 ? 'bg-red-500' : 'bg-green-500'
            } `}
          >
            <button className="text-3xl  font-bold  " onClick={close}>
              <ICONS.BackArrow />
            </button>
            <div>
              <p className=" text-lg md:text-2xl">Transaction Successful</p>
              <p className="">
                {moment(transData?.createdAt).format('MMM Do YYYY, h:mm a ')}
              </p>
            </div>
          </div>
          <div className="mt-3 p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
            <div className="flex items-center gap-2">
              <span className="text-lg">{transData?.title}</span>
            </div>
            <hr className="mt-3 border border-gray-300" />
            <div className="mt-5">
              <div className="flex items-center gap-4">
                <div>
                  {transData?.amount < 0 ? (
                    <img src={redHi.src} className="h-10" alt="" />
                  ) : (
                    <img src={BlueHi.src} alt="" className="h-10" />
                  )}
                </div>
                <h3 className="text-xl">Transfer Details</h3>
              </div>
              <div className="mt-5">
                <p>Transaction ID</p>
                <p>{transData?._id}</p>
              </div>
              <div className="mt-3 ">
                <div className=" flex flex-col justify-between md:flex-row">
                  <p
                    className={`${
                      transData?.amount < 0 ? 'text-red-500' : 'text-green-600 '
                    }`}
                  >
                    {transData?.amount < 0 ? ' DEBITED' : ' CREDITED'}
                  </p>
                  <div className="text-xl md:w-[35%] md:text-end">
                    <p>₹ {transData?.amount}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p>{transData?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default TransactionHistoryPopUp
