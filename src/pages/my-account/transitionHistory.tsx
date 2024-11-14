import { bankHistory } from 'assets'
import CommonBanner from 'components/CommonBanner'
import { PrivateRoute, PublicLayout } from 'layouts'
import MyAccountNavLayout from 'layouts/myAccountNavbar'

const transitionHistory = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="My Trasition History | Prizen">
        <CommonBanner title="My Trasition History" />
        <MyAccountNavLayout>
          <HistoryWrapper />
        </MyAccountNavLayout>
      </PublicLayout>
    </PrivateRoute>
  )
}

const HistoryWrapper = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="h-[80%] w-[80%] overflow-scroll  p-4">
        <div className="h-20 w-full rounded-md border bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className="flex h-full items-center border ">
            <div>
              <img
                src={bankHistory.src}
                alt="BankhistoryIcon"
                className="w-20"
              />
            </div>
            <div>
              <div>
                <p>name</p>
              </div>
              <div>
                <span>date</span> &nbsp; at &nbsp;
                <span>time</span>
              </div>
            </div>
            <div>price</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default transitionHistory
