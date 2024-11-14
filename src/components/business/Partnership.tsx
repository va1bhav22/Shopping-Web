import { scanner } from 'assets/business'
import React from 'react'

const partnershipOpportunitiesArr = [
  {
    feature: 'E-TRENDING',
    arr: [{ img: scanner.src, desc: 'SCAN TO VIEW TENDERS' }],
  },
  {
    feature: 'WHOLESALE AT FIXED PRICES',
    arr: [{ img: scanner.src, desc: 'SCAN TO VIEW WHOLESALE PRICES' }],
  },
  {
    feature: 'EMPANELMENT OF BULK BUYER',
    arr: [{ img: scanner.src, desc: 'SCAN TO VIEW BULK BUYER' }],
  },
  {
    feature: 'DISTRIBUTORSHIP',
    arr: [{ img: scanner.src, desc: 'SCAN TO VIEW DISTRIBUTOR' }],
  },
]

const Partnership = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  return (
    <section className="main-container py-16">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl tracking-wide md:text-4xl">
          Partnership Opportunities
        </h1>
        <div className="mt-4 w-20 rounded-md border-b-2 border-gray-200"></div>
      </div>
      <div className="flex w-full flex-wrap justify-center gap-6 pt-8">
        {partnershipOpportunitiesArr.map((curElm: any, index: number) => (
          <div
            className={`relative cursor-pointer py-4 text-center text-xs font-semibold tracking-wide md:text-base ${
              index === activeIndex
                ? 'active-index text-theme'
                : 'hover-effect text-gray-400'
            } `}
            key={index}
            data-index={index}
            onClick={() => setActiveIndex(index)}
          >
            {curElm.feature}
          </div>
        ))}
      </div>
      <div className=" flex w-full flex-col items-center py-8 text-center">
        {partnershipOpportunitiesArr[activeIndex]?.arr?.map<any>(
          (curElm: any, index: any) => (
            <div className="flex flex-col items-center" key={index}>
              <img src={curElm.img} alt="scanner" />
              <p className="py-2 text-lg font-semibold tracking-wide">
                {curElm.desc}
              </p>
            </div>
          )
        )}
        <p className="w-4/5 py-4 font-light tracking-wide">
          CGMFP Federation floats tenders at regular intervals for sale of raw
          and processed Minor Forest Produce. The tendering process is
          completely transparent and very convenient. One can visit the website
          of the CGMFP federation and access the tenders from the following
          link:
        </p>
        <a
          href="https://www.cgmfpfed.org/new/tendernotice.php?type=2"
          target="_blank"
          rel="noopener noreferrer "
          className="text-sm text-blue-500 md:text-base"
        >
          https://www.cgmfpfed.org/new/tendernotice.php?type=2
        </a>
      </div>
    </section>
  )
}

export default Partnership
