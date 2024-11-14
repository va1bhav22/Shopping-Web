import { forest } from 'assets/business'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section
      style={{ backgroundImage: `url(${forest.src})` }}
      className="relative h-[40em] w-full  bg-cover bg-center"
    >
      <div className="main-container flex w-full items-center justify-start">
        <div className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center gap-6 pr-6 text-center text-white md:w-1/2 md:items-start md:pr-0 md:text-left">
          <h1 className="text-3xl md:text-7xl">Business Opportunities</h1>
          <p className="tracking-wide">
            ‘Chhattisgarh Herbals’ presents exciting business opportunities for
            individuals and businesses interested in partnering with an
            organization dedicated towards upliftment of tribals, empowerment of
            women and protection of environment. ‘Chhattisgarh Herbals’ offers
            the following opportunities for like- minded individuals and firms:
          </p>
          <div className="flex gap-2">
            <span className="rounded bg-[#ffffff40] p-2 leading-8 tracking-wide">
              Organically Certified Raw & Processed Minor Forest Produce
            </span>
            <span className="rounded bg-[#ffffff40] p-2 leading-8 tracking-wide">
              MFP based Herbal Ayurvedic, Food and Personal Care Products
            </span>
          </div>
          <div className="flex gap-4">
            <Link legacyBehavior href="#contact">
              <button className="discount-card relative flex w-fit gap-2 overflow-hidden rounded-[30px] border-2  bg-theme px-8 py-2 text-white transition-all duration-300 ease-in-out">
                Contact Us
              </button>
            </Link>
            <Link legacyBehavior href="/business/products">
              <button className="discount-card relative flex w-fit gap-2 overflow-hidden rounded-[30px] border-2  bg-theme px-8 py-2 text-white transition-all duration-300 ease-in-out">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
