import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Fragment } from 'react'
import ReviewType from 'types/review'
const ReviewAndRatingCard = ({ review }: { review: ReviewType }) => {
  return (
    <div className="flex w-full flex-col justify-between gap-4 rounded bg-white p-8 shadow-[inset_-12px_-8px_40px_#46464620] md:flex-row md:gap-0 lg:w-1/2">
      <div className="flex w-full justify-center md:w-1/4 md:justify-start">
        <img
          src={review?.order?.user?.photoURL}
          alt={review?.order?.user?.displayName}
          className="h-24 w-24 rounded-[50%]"
        />
      </div>
      <div className="w-full md:w-3/4">
        <div className="mb-1 flex w-full justify-between">
          <h1 className="text-2xl font-bold">
            {review?.order?.user?.displayName}
          </h1>
          <p className="flex justify-center gap-1 text-base text-theme">
            {[...Array(5)].map((item, index) => (
              <Fragment key={index}>
                {review?.rating >= index + 1 ? (
                  <StarIcon fontSize="inherit" color="inherit" />
                ) : (
                  <StarBorderIcon fontSize="inherit" color="inherit" />
                )}
              </Fragment>
            ))}
          </p>
        </div>
        <p className="text-xs tracking-wider text-theme">
          {new Date(review?.createdAt).toLocaleDateString()}
        </p>
        <b className="mt-3 text-sm tracking-wider text-gray-500">
          {review?.title}
        </b>
        <p className="mt-3 text-sm tracking-wider text-gray-500">
          {review?.comment}
        </p>
      </div>
    </div>
  )
}
export default ReviewAndRatingCard
