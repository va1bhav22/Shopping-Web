import { Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import ReviewAndRatingCard from 'components/cart/reviewAndRatingCard'
import VerticalSkeletonCard from 'components/cart/VerticalSkeletonCard'
import Pagination from 'components/core/pagination'
import { useFormik } from 'formik'
import useSWRAPI from 'hooks/useSWRAPI'
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const initialValues = {
  review: '',
  rating: 0,
}
const validationSchema = Yup.object({
  review: Yup.string().required('Required'),
})

const DescriptionReview = ({
  description,
  productId,
  isLoading,
}: {
  description: string
  productId: string
  isLoading: boolean
}) => {
  const [showReview, setShowReview] = useState(false)
  const [showDescription, setShowDescription] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleReviewClick = () => {
    setShowReview(true)
    setShowDescription(false)
  }

  const handleDescriptionClick = () => {
    setShowReview(false)
    setShowDescription(true)
  }

  const handleClose = () => {
    setIsDialogOpen(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, props) => {
      console.log(values)
      Swal.fire({
        title: 'Success',
        text: 'Your review has been submitted successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      handleClose()
      props.resetForm()
    },
  })

  return (
    <section className="main-container">
      <div className="flex w-full justify-center gap-4 pb-2">
        <button
          className={`flex h-10 w-32 items-center justify-center rounded lg:h-12 lg:w-40 lg:text-xl ${
            showDescription
              ? 'discount-card relative overflow-hidden bg-theme text-white'
              : 'bg-gray-100 text-gray-600'
          } `}
          onClick={() => {
            handleDescriptionClick()
          }}
        >
          Description
        </button>
        <button
          className={`flex h-10 w-32 items-center justify-center rounded lg:h-12 lg:w-40 lg:text-xl ${
            showReview
              ? 'discount-card relative overflow-hidden bg-theme text-white'
              : 'bg-gray-100 text-gray-600'
          } `}
          onClick={handleReviewClick}
        >
          Reviews
        </button>
      </div>
      <div className="h-[1px] w-full border-b-2 border-gray-200"></div>
      {showDescription && (
        <p className="my-16 text-justify tracking-wider text-slate-800 md:text-left">
          {isLoading ? <Skeleton count={5} /> : description}
        </p>
      )}
      {showReview && (
        <section className="my-16 flex w-full flex-col items-center gap-8">
          <AllReviews productId={productId} />
        </section>
      )}
    </section>
  )
}

const AllReviews = ({ productId }: { productId: string }) => {
  const [limit, setLimit] = useState(5)
  const [chunk, setChunk] = useState(0)
  const { data, isValidating } = useSWRAPI(
    `reviews/product/${productId}?limit=${limit}&chunk=${chunk}`,
    {
      revalidateOnFocus: false,
    }
  )
  if (isValidating) return <VerticalSkeletonCard cards={1} />
  const reviews = data?.data?.data?.data
  if (!reviews?.length) return <h1>No Reviews</h1>
  return (
    <>
      {reviews?.map((review: any) => (
        <ReviewAndRatingCard key={review._id} review={review} />
      ))}
      <Pagination
        chunk={chunk}
        isLastChunk={data?.data?.data?.isLastChunk}
        setChunk={setChunk}
        isLoading={isValidating}
      />
    </>
  )
}

export default DescriptionReview
