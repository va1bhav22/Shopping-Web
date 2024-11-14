import { LockClockRounded, Security } from '@mui/icons-material'
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

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = React.useState('')
  const { push } = useRouter()
  return (
    <PublicLayout title="Forgot Password | Prizen">
      <CommonBanner title="My Account" />
      <section className="relative flex w-full flex-col items-center justify-center bg-theme_gray py-12 lg:py-20">
        {userEmail ? (
          <OtpVerifySection
            email={userEmail}
            onSuccess={() => push('/signin')}
          />
        ) : (
          <OtpSendSection onSuccess={(email: string) => setUserEmail(email)} />
        )}
      </section>
    </PublicLayout>
  )
}

const OtpSendSection = ({
  onSuccess,
}: {
  onSuccess: (userEmail: string) => void
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const initialValues = {
    email: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Enter a valid Email').required('Required'),
  })
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, props) => {
      try {
        setIsLoading(true)

        const response = await post({
          path: END_POINTS.post()['forgot-password'],
          body: JSON.stringify({
            email: values?.email,
          }),
        })
        console.log(response)
        if (response.status === 200) {
          onSuccess && onSuccess(values?.email)
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
      } finally {
        setIsLoading(false)
      }
    },
  })
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="z-10 w-full rounded-md bg-white p-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:w-3/5 lg:w-[35%]"
    >
      <p className="text-sm font-light tracking-wider">
        Lost your password? Please enter your email address. You will receive a
        link to create a new password via email.
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
      <button className="discount-card relative mt-4 w-full overflow-hidden rounded-[30px] bg-theme py-3 text-sm text-white">
        {isLoading ? <CircularProgress size={16} /> : 'Reset Password'}
      </button>
    </form>
  )
}

const OtpVerifySection = ({
  email,
  onSuccess,
}: {
  email: string
  onSuccess?: () => void
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const initialValues = {
    OTP: '',
    newPassword: '',
    conformPassword: '',
  }

  const validationSchema = Yup.object({
    OTP: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required'),
    //check newPassword and conformPassword are same
    conformPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Required'),
  })
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, props) => {
      try {
        setIsLoading(true)

        const response = await post({
          path: END_POINTS.post()['forgot-password-otp-verify'],
          body: JSON.stringify({
            email: email,
            OTP: values?.OTP,
            newPassword: values?.newPassword,
            confirmPassword: values?.conformPassword,
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
          onSuccess && onSuccess()
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
      } finally {
        setIsLoading(false)
      }
    },
  })
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="z-10 my-20 w-full rounded-md bg-white p-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:w-3/5 lg:w-[35%]"
    >
      <p className="text-sm font-light tracking-wider">
        Lost your password? Please enter your email address. You will receive a
        link to create a new password via email.
      </p>
      <h1 className="my-4 font-semibold ">OTP</h1>
      <div className="mb-4 flex items-center justify-start border border-gray-300 p-1">
        <Security className="mx-2 text-theme" />
        <TextField
          fullWidth
          type="number"
          placeholder="Enter OTP Send To Email"
          name="OTP"
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
          value={formik.values.OTP}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.OTP && Boolean(formik.errors.OTP)}
          helperText={formik.touched.OTP && formik.errors.OTP}
        />
      </div>
      <h1 className="my-4 font-semibold ">New Password</h1>
      <div className="mb-4 flex items-center justify-start border border-gray-300 p-1">
        <LockClockRounded className="mx-2 text-theme" />
        <TextField
          fullWidth
          type="password"
          placeholder="New Password"
          name="newPassword"
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
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
      </div>
      <h1 className="my-4 font-semibold ">Conform Password</h1>
      <div className="mb-4 flex items-center justify-start border border-gray-300 p-1">
        <LockClockRounded className="mx-2 text-theme" />
        <TextField
          fullWidth
          type="password"
          placeholder="Conform Password"
          name="conformPassword"
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
          value={formik.values.conformPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.conformPassword &&
            Boolean(formik.errors.conformPassword)
          }
          helperText={
            formik.touched.conformPassword && formik.errors.conformPassword
          }
        />
      </div>
      <button className="discount-card relative mt-4 w-full overflow-hidden rounded-[30px] bg-theme py-3 text-sm text-white">
        {isLoading ? <CircularProgress size={16} /> : 'Reset Password'}
      </button>
    </form>
  )
}

export default ForgotPassword
