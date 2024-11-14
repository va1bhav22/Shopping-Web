import { Dialog } from '@mui/material'
import { ICONS } from 'assets'
import { useState } from 'react'
type WalletCardProps = {
  open: boolean
  close: () => void
}
const WalletCard = ({ open, close }: WalletCardProps) => {
  const [cardNumber, setcardNumber] = useState('')

  const [expiryMonth, setexpiryMonth] = useState('')
  const [expiryYear, setexpiryYear] = useState('')
  const [cardholderName, setcardholderName] = useState('')
  const [ccv, setccv] = useState('')

  const handleSubmit = (event: any) => {
    event.preventDefault()
    // const storedata = {
    //   cardNumber: cardNumber,
    //   expiryMonth: expiryMonth,
    //   expiryYear: expiryYear,
    //   cardholderName: cardNumber,
    //   ccv: ccv,
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
              ADD CREDIT / DEBIT CARD
            </h1>
            <form action="" onSubmit={handleSubmit} className="mt-5">
              <div>
                <label
                  className="text-[14px] font-semibold tracking-wider"
                  htmlFor=""
                >
                  CARD NUMBER
                </label>
                <div className="flex h-10 w-3/4 items-center justify-between border border-gray-600 p-1">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setcardNumber(e.target.value)}
                    className=" w-[9rem] border-none pl-3 outline-none md:w-[18rem]"
                  />
                  <ICONS.Card className="text-2xl" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="text-[14px] font-semibold tracking-wider"
                  htmlFor=""
                >
                  EXPIRY DATE
                </label>
                <div>
                  <span>
                    <select
                      required
                      value={expiryMonth}
                      onChange={(e) => setexpiryMonth(e.target.value)}
                      name=""
                      className="h-[40px] w-[8rem] border border-gray-600"
                      id="month"
                    >
                      <option value="">Month</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </span>
                  &nbsp; &nbsp;
                  <span>
                    <select
                      className="h-[40px] w-[6rem] border border-gray-600"
                      required
                      value={expiryYear}
                      onChange={(e) => setexpiryYear(e.target.value)}
                      name=""
                      id="year"
                    >
                      <option value="">Year</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                    </select>
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="text-[14px] font-semibold tracking-wider"
                  htmlFor=""
                >
                  NAME OF CARD HOLDER
                </label>
                <div>
                  <input
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setcardholderName(e.target.value)}
                    className="h-[40px] w-3/4 border border-gray-600 pl-4 outline-none"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="text-[14px] font-semibold tracking-wider"
                  htmlFor=""
                >
                  CCV
                </label>
                <div className="flex h-10 w-[10rem] items-center justify-between border border-gray-600 p-1">
                  <input
                    type="password"
                    value={ccv}
                    onChange={(e) => setccv(e.target.value)}
                    maxLength={4}
                    className=" w-[6rem] border-none pl-3 outline-none"
                  />
                  <ICONS.Cardccv className="text-2xl" />
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="rounded-md bg-slate-700 py-2 px-4 font-medium tracking-widest text-white"
                >
                  Use This Card
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default WalletCard
