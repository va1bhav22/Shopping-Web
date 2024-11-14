import { Dialog, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import useAuthFetch from 'hooks/useAuthFetch'
import { PrivateRoute, PublicLayout } from 'layouts'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

const VerifyPayment = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAnimation, setIsAnimation] = useState(false)
  const [successData, setSuccessData] = useState<any>(false)
  const { query, push } = useRouter()
  const { isLoading, mutate } = useAuthFetch()

  useEffect(() => {
    if (query?.order_id) {
      ;(async () => {
        const responseData = await mutate({
          path: 'checkout/payment-verify',
          method: 'POST',
          body: JSON.stringify({
            payment_order_id: query?.order_id,
          }),
        })
        if (responseData?.error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: responseData.error,
          })
          return
        }
        setIsDialogOpen(true)
        setSuccessData(responseData)
      })()
    }
  }, [query?.order_id])

  console.log(successData)

  return (
    <PrivateRoute>
      <PublicLayout title="Payment Verification | Prizen">
        <article className="grid h-[calc(100vh-212px)] place-items-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <img
              src="/payment_gif.gif"
              alt="payment-loading"
              className="h-1/2 w-1/2"
            />
            <p className=" text-2xl font-semibold text-slate-800">
              Verifying your payment...
            </p>
          </div>
        </article>
        <Dialog
          open={isDialogOpen}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <article className="flex h-[75vh] w-full flex-col items-center justify-center gap-4 p-10">
            <div className="h-48 w-48">
              <img src="/success.gif" alt="success-icon" className="w-full" />
            </div>
            <h1 className="text-2xl font-semibold text-green-600">
              Payment Successful
            </h1>
            <p className="text-center text-lg font-semibold ">
              Thank you. Your order has been placed.
            </p>
            {successData?.voucher?.code ? (
              <section className="scratch-card text-center">
                <h1 className="text-lg font-medium text-slate-800">
                  <span className="font-semibold text-theme">Congrats 🎉!</span>{' '}
                  You have won a scratch card.
                </h1>
                <aside
                  className="relative my-4 h-10 w-full cursor-pointer overflow-hidden rounded-md border border-theme_light"
                  onClick={() => setIsAnimation(true)}
                >
                  <p className="z-1 grid h-full w-full  place-items-center text-center font-semibold uppercase text-theme">
                    {successData?.voucher?.code}
                  </p>
                  <div
                    className={`z-5 absolute  top-0 h-10 w-1/4 bg-theme_light transition-all duration-[400ms] ease-in ${
                      isAnimation
                        ? '-left-1/4 opacity-50'
                        : 'left-0 opacity-100'
                    }`}
                  ></div>
                  <div
                    className={`z-5 absolute left-1/4 h-10 w-1/4 bg-theme_light transition-all duration-[500ms] ease-in-out ${
                      isAnimation ? 'top-full opacity-40' : 'top-0 opacity-100'
                    }`}
                  ></div>
                  <div
                    className={`z-5 absolute right-1/4 h-10 w-1/4 bg-theme_light transition-all duration-[500ms] ease-in-out ${
                      isAnimation
                        ? 'bottom-full opacity-40'
                        : 'bottom-0 opacity-100'
                    }`}
                  ></div>
                  <div
                    className={`z-5 absolute top-0 h-10 w-1/4 bg-theme_light transition-all duration-[400ms] ease-out ${
                      isAnimation
                        ? '-right-1/4 opacity-50'
                        : 'right-0 opacity-100'
                    }`}
                  ></div>
                </aside>
                <p className="text-slate-800">
                  <span className="text-theme">Note: </span>Click the above card
                  to see the code.
                </p>
              </section>
            ) : null}
            <section>
              <button
                className="discount-card relative overflow-hidden rounded-md bg-green-600 px-6 py-3 text-lg font-semibold tracking-wide text-white"
                onClick={() =>
                  push(
                    `/my-account/my-order/${
                      successData?.data?._id || successData?.data[0]?._id
                    }`
                  )
                }
              >
                OK
              </button>
            </section>
          </article>
        </Dialog>
      </PublicLayout>
    </PrivateRoute>
  )
}

export default VerifyPayment
