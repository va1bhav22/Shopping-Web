import EmailIcon from '@mui/icons-material/Email'
import { CircularProgress, TextField } from '@mui/material'
import { END_POINTS, post } from 'api'
import CommonBanner from 'components/CommonBanner'
import { useFormik } from 'formik'
import { PublicLayout } from 'layouts'
import { useRouter } from 'next/router'
import React from 'react'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

const initialValues = {
  email: '',
}

const validationSchema = Yup.object({
  email: Yup.string().email('Enter a valid Email').required('Required'),
})

const resendEmailVerification = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, props) => {
      try {
        setIsLoading(true)

        const response = await post({
          path: END_POINTS.post()['resend-email-verification'],
          body: JSON.stringify({
            email: values?.email,
          }),
        })
        console.log(response)
        if (response.status === 200) {
          Swal.fire({
            title: 'Success',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'OK',
          })
          setIsLoading(false)
          router.push('/signin')
          props.resetForm()
        } else {
          Swal.fire({
            title: 'Error',
            text: response.error,
            icon: 'error',
            confirmButtonText: 'OK',
          })
          setIsLoading(false)
        }
      } catch (error: any) {
        console.log(error)
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    },
  })
  return (
    <PublicLayout title="Resend Email Verification | Prizen">
      <CommonBanner title="My Account" />
      <section className="relative flex w-full flex-col items-center justify-center bg-theme_gray px-6 py-12 lg:py-20">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full rounded-md bg-white p-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:w-3/5 lg:w-[35%]"
        >
          <p className="text-sm font-light tracking-wider">
            Lost your email verification link? Please enter your email address.
            You will receive a link to verify your email again.
          </p>
          <h1 className="my-4 font-semibold ">Email</h1>
          <div className="mb-4 flex items-center justify-start border border-gray-300 p-1">
            <EmailIcon className="mx-2 text-theme" />
            <TextField
              fullWidth
              type="email"
              placeholder="Email Address"
              name="email"
              id="outlined-basic"
              variant="outlined"
              className=""
              InputProps={{
                classes: {
                  root: ' ',
                  notchedOutline: 'login-notched-outline',
                  input: 'mui-textfield-input',
                },
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <button
            className="discount-card relative mt-4 w-full overflow-hidden rounded-[30px] bg-theme py-3 text-sm text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={16} />
            ) : (
              'Resend Email Verification'
            )}
          </button>
        </form>
      </section>
    </PublicLayout>
  )
}

export default resendEmailVerification
