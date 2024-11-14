import { bgimg, offerImg } from 'assets'
import { useState } from 'react'
import ReferralDig from './ReferralDig'
import { useAuth } from 'hooks'
import { Router, useRouter } from 'next/router'
import Swal from 'sweetalert2'

const ReferralBanner = () => {
  const [showReferral, setShowReferral] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const openReferral = () => {
    if (user?._id) {
      setShowReferral(true)
    } else {
      Swal.fire({ icon: 'warning', text: 'Please Login ' })
      router.push('/signin')
    }
  }

  const closeReferral = () => {
    setShowReferral(false)
  }

  return (
    <section className="h-full w-full bg-gradient-to-tr from-[#4fa2b1] via-[#4fa2b1] to-[#4fa2b1] py-10">
      <div className="m-auto flex w-full flex-col items-center md:w-[95%] md:flex-row">
        <div className="w-full">
          <img src={offerImg.src} alt="" />
        </div>
        <div className="w-full text-center text-slate-100 md:text-left ">
          <h1 className=" mt-3 text-xl font-semibold md:mt-0 md:text-3xl">
            Unlock Exclusive Perks with Our Referral Program
          </h1>
          <p className=" mt-5">
            Introducing our exciting referral program! Spread the word about our
            exceptional products/services and be rewarded for your enthusiasm.
            Refer a friend, family member, or colleague, and both of you can
            enjoy exclusive benefits.
          </p>
          <h2 className="mt-4  text-xl ">
            Spread the Word and Reap the Benefits
          </h2>
          <button
            onClick={openReferral}
            className="mt-6 rounded-md bg-nav px-4 py-2 text-[17px] text-white"
          >
            Become A Referral User
          </button>
        </div>
      </div>
      {showReferral && (
        <ReferralDig open={showReferral} onClose={closeReferral} />
      )}
    </section>
  )
}

// </div>
export default ReferralBanner
