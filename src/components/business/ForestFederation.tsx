import { woman_with_cashew } from 'assets/business'

const ForestFederation = () => {
  return (
    <section className="main-container flex w-full flex-col gap-12 pt-28 pb-16 md:flex-row-reverse md:justify-between">
      <div className="w-full">
        <img src={woman_with_cashew.src} alt="woman with a cashew" />
      </div>
      <div className="w-full">
        <h1 className="text-2xl tracking-wide md:text-4xl">
          Chhattisgarh Minor Forest Produce Cooperative Federation
        </h1>
        <div className="mt-4 w-20 rounded-md border-b-2 border-gray-200"></div>

        <p className="mt-10 font-light tracking-wider">
          All products of Chhattisgarh Herbals are powered by Chhattisgarh Minor
          Forest Produce Cooperative Federation, an institution dedicated to
          uplifting more than 1.2 million forest dwellers of Chhattisgarh state.
        </p>
        <p className="my-4 font-light tracking-wider">
          These pure natural forest products are collected by forest-dwelling
          tribals and manufactured by Women Self-help Groups in Van Dhan Kendras
          under the banner of CG Herbals brand.
        </p>
        <p className="font-light tracking-wider">
          The Federation ensures that all profits from the sale of these
          products are ploughed back to these forest dwellers and SHGs as bonus
          payments, scholarships and insurance, providing a sustainable
          livelihood for the tribal community of Chhattisgarh.
        </p>
      </div>
    </section>
  )
}

export default ForestFederation
