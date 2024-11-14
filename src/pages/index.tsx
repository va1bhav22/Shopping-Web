import ADDForm from 'components/AddForm'
import {
  BrowseCategory,
  DemoProductCard,
  Feature,
  HeroSection,
  MobileAppAd,
  OfferSection,
  SpecialProducts,
} from 'components/home'
import ReferralBanner from 'components/referral/ReferralBanner'

import { PublicLayout } from 'layouts'

const Index = () => {
  return (
    <PublicLayout title="Home | Prizen">
      <HeroSection />
      {/* <DemoProductCard /> */}
      <BrowseCategory />
      <Feature />
      <ReferralBanner />
      <ADDForm />
      <SpecialProducts />

      <OfferSection />
      <MobileAppAd />
    </PublicLayout>
  )
}

export default Index
