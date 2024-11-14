import { LoadingButton } from '@mui/lab'
import { Rating, TextField } from '@mui/material'
import { useFormik } from 'formik'
import useAuthFetch from 'hooks/useAuthFetch'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

export default function RatingAndReview({
  orderId,
  onSuccess,
  reviewId,
}: {
  onSuccess?: () => void
  orderId: string
  reviewId?: string
}) {
  const { isLoading, mutate } = useAuthFetch()
  const [initialValues, setInitialValues] = useState({
    review: '',
    rating: 0,
    title: '',
  })
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    rating: Yup.number().required('Rating is required'),
    review: Yup.string().required('Review Required'),
  })
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, props) => {
      try {
        const resData: {
          error?: string
        } = await mutate({
          path: reviewId ? `review/${reviewId}` : 'review',
          method: reviewId ? 'PUT' : 'POST',
          body: JSON.stringify({
            orderId,
            rating: values?.rating,
            title: values?.title,
            comment: values?.review,
          }),
        })
        if (resData?.error) {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: resData?.error,
          })
        }
        Swal.fire({
          title: 'Success',
          text: reviewId
            ? 'Your review has been updated successfully'
            : 'Your review has been submitted successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        props.resetForm()
        onSuccess && onSuccess()
      } catch (error) {
        console.log({ error })
      }
    },
  })
  const { isLoading: ratingDataLoading, mutate: fetchRatingData } =
    useAuthFetch()
  useEffect(() => {
    if (reviewId) {
      ;(async () => {
        const resData = await fetchRatingData({
          path: `review/${reviewId}`,
          method: 'GET',
        })
        setInitialValues({
          rating: resData?.data?.rating,
          title: resData?.data?.title,
          review: resData?.data?.comment,
        })
      })()
    }
  }, [])
  if (ratingDataLoading)
    return (
      <div className="relative flex w-[30rem] flex-col gap-4 p-8">
        <p className="pt-4 text-sm tracking-wide text-gray-500">
          <Skeleton width={'50%'} />
        </p>
        <p className="text-sm tracking-wide text-gray-500">
          <Skeleton width={'40%'} />
        </p>
        <Skeleton
          count={5}
          height={15}
          circle
          width={15}
          containerClassName="flex flex-row gap-1"
        />

        <Skeleton height={50} width={'100%'} />

        <Skeleton height={140} width={'100%'} />

        <Skeleton height={35} width={'100%'} />
      </div>
    )
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative flex w-[30rem] flex-col gap-4 p-8"
    >
      <p className="pt-4 text-sm tracking-wide text-gray-500">
        Required fields are marked *
      </p>
      <p className="text-sm tracking-wide text-gray-500">Your rating *</p>
      <Rating
        name="size-small"
        value={formik.values.rating}
        size="large"
        className="!w-fit"
        onChange={(event: any, newValue: any) => {
          formik.setFieldValue('rating', newValue)
        }}
      />

      <TextField
        label="Title"
        variant="outlined"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      <TextField
        fullWidth
        type="text"
        name="review"
        placeholder="Your Review"
        id="outlined-multiline-static"
        multiline
        rows={4}
        variant="outlined"
        className=""
        InputProps={{
          classes: {
            root: ' ',
            notchedOutline: 'sorting-select-outline',
            // input: 'mui-textfield-input',
          },
        }}
        value={formik.values.review}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.review && Boolean(formik.errors.review)}
        helperText={formik.touched.review && formik.errors.review}
      />

      <LoadingButton
        size="large"
        variant="contained"
        className="w-full bg-theme !tracking-wider text-white"
        type="submit"
        loading={isLoading}
        disabled={isLoading}
      >
        Submit
      </LoadingButton>
    </form>
  )
}
