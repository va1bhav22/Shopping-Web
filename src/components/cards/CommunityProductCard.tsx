import { ProductImageNotAvailable } from 'assets'

const CommunityProductCard = ({ curElm }: any) => {
  return (
    <div className="flip-card h-[25rem] w-full rounded-md bg-transparent shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="flip-card-inner rounded-md">
        <div className="flip-card-front rounded-md">
          <img
            src={curElm.img || ProductImageNotAvailable?.src}
            alt="woman-worker"
            className="h-full w-full rounded-md"
          />
        </div>
        <div className="flip-card-back flex flex-col items-center justify-center gap-2 rounded-md bg-theme p-4 text-white">
          <img src={curElm.back_img} alt={curElm.title} className="w-1/2" />

          <h1 className="text-xl tracking-wide md:text-3xl">{curElm.title}</h1>
        </div>
      </div>
    </div>
  )
}

export default CommunityProductCard
