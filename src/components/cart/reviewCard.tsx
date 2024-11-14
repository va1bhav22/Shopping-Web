import { Delete, Edit } from '@mui/icons-material'
import {
  CircularProgress,
  Dialog,
  IconButton,
  Rating,
  Slide,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import RatingAndReview from 'forms/ratingAndReview'
import useAuthFetch from 'hooks/useAuthFetch'
import Image from 'next/image'
import React from 'react'
import ReviewType from 'types/review'

const ReviewCard = ({
  review,
  reload,
  isDataFetching,
}: {
  review: ReviewType
  reload?: () => void
  isDataFetching?: boolean
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const { isLoading: isReviewDeleting, mutate: fetchDeleteReview } =
    useAuthFetch()
  const { isLoading: isReviewEditing, mutate: fetchEditReview } = useAuthFetch()

  const handelDeleteReview = async (id: string) => {
    await fetchDeleteReview({
      path: `review/${id}`,
      method: 'DELETE',
    })
    reload && reload()
  }
  const handelEditReview = async (id: string) => {}
  const handleClose = () => {
    setIsDialogOpen(false)
    reload && reload()
  }
  return (
    <div className="flex w-full flex-col rounded-2xl p-2 shadow-md sm:p-5">
      <div className="flex w-full flex-row items-center gap-2">
        <span className="relative w-16">
          <Image
            unoptimized
            src={review?.order?.product?.displayImage?.url}
            alt={review?.order?.product?.title}
            width={100}
            height={100}
            objectFit="contain"
          />
        </span>
        <span className="flex flex-col items-start">
          <h1 className="text-lg font-semibold tracking-wide">
            {review?.order?.product?.title}
          </h1>
          <Rating value={review?.rating} readOnly={true} />
          <p>{new Date(review?.createdAt).toLocaleDateString()}</p>
        </span>
      </div>
      <div className="flex w-full flex-col items-start">
        <span className="flex flex-col items-start">
          <h1 className="text-lg font-semibold tracking-wide">
            {review?.title}
          </h1>
          <p className="text-sm text-gray-500">{review?.comment}</p>
        </span>
        <span className="flex w-full flex-row justify-evenly">
          <IconButton
            disabled={isReviewDeleting || isDataFetching}
            onClick={() => handelDeleteReview(review?._id)}
          >
            {isReviewDeleting || isDataFetching ? (
              <CircularProgress size={16} />
            ) : (
              <Delete color="error" />
            )}
          </IconButton>
          <IconButton
            disabled={isReviewEditing || isDataFetching}
            onClick={() => setIsDialogOpen(true)}
          >
            {isReviewEditing || isDataFetching ? (
              <CircularProgress size={16} />
            ) : (
              <Edit color="info" />
            )}
          </IconButton>
        </span>
      </div>
      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{ padding: '32px' }}
        // maxWidth="500px"
      >
        <RatingAndReview
          orderId={review?.order?._id}
          onSuccess={() => handleClose()}
          reviewId={review?._id}
        />
      </Dialog>
    </div>
  )
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default ReviewCard
