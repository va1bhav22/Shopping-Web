import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  CodeOutlined,
} from '@mui/icons-material'
import { CircularProgress, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { END_POINTS, post } from 'api'
import { signUpimg } from 'assets'
import Icons from 'assets/icons'
import CommonBanner from 'components/CommonBanner'
import { useFormik } from 'formik'
import { PublicLayout } from 'layouts'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
// import '../styles/globals.css'
const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  referral: '',
}

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "it's too short")
    .required('Please enter your name'),
  email: Yup.string().email('Enter a valid Email').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

const SignUp = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, props) => {
      console.log(values)

      try {
        setIsLoading(true)

        const response = await post({
          path: END_POINTS.post()['signup'],
          body: JSON.stringify({
            displayName: values?.username,
            email: values?.email,
            password: values?.password,
            confirmPassword: values?.confirmPassword,
            role: 'USER',
            referralCode: values?.referral,
          }),
        })
        if (response.status === 200) {
          Swal.fire({
            title: 'Success',

            text: 'Email verification link sent to your email',
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
        }
      } catch (error: any) {
        console.log(error)
        setIsLoading(false)
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

  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  return (
    <PublicLayout title="Sign Up | Prizen">
      <CommonBanner title="Sign Up" />

      <section className="relative flex w-full items-center justify-center  bg-theme_gray px-6 py-12 lg:py-20">
        <article className="main-container justify-betwen flex w-full flex-col items-center gap-4 rounded-xl bg-white p-4 md:flex-row md:p-6 lg:w-11/12 lg:p-8">
          <aside className="flex w-full flex-col justify-center pr-4 md:border-r md:pr-6 lg:pr-8">
            <img src={signUpimg.src} alt="" className="" />

            <div className="flex gap-4  pt-8">
              <div className="relative flex h-5 w-5 ">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex h-5 w-5 rounded-full bg-orange-500 ">
                  <div className="flex w-full items-center justify-center text-white ">
                    i
                  </div>
                </span>
              </div>
              <p className=" tracking-wide text-gray-700">
                After you sign in,You Buy referral code you can take advantage
                of the referral system and enjoy its benefits. By using a
                referral code, you unlock the ability to refer others to the
                website and earn rewards or incentives in return. Here are some
                advantages of utilizing the referral programExclusive Discounts:
                Referral codes often come with special discounts or promotional
                offers. When you refer someone using your code and you get more
                amezing gifts.
              </p>
            </div>
          </aside>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full pl-4 md:pl-6 lg:pl-8"
          >
            <h1 className="mb-8 text-center text-xl font-semibold md:text-3xl">
              Create Your Account
            </h1>
            <div className="mb-4 flex items-center justify-start border border-gray-300 p-1">
              <Person className="mx-2 text-theme" />
              <TextField
                fullWidth
                type="name"
                name="username"
                id="outlined-basic"
                placeholder="Name"
                variant="outlined"
                className=""
                InputProps={{
                  classes: {
                    root: ' ',
                    notchedOutline: 'login-notched-outline',
                    input: 'mui-textfield-input',
                  },
                }}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </div>
            <div className="mb-4 flex items-center justify-start border border-gray-300 p-1">
              <Email className="mx-2 text-theme" />
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
            <div className="mb-4 flex items-center justify-start border border-gray-300 p-1">
              <Lock className="mx-2 text-theme" />
              <TextField
                fullWidth
                type={`${showPassword ? 'text' : 'password'}`}
                name="password"
                id="outlined-basic"
                placeholder="Password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disableFocusRipple
                        disableRipple
                        onClick={() => {
                          setShowPassword(!showPassword)
                        }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  classes: {
                    root: ' ',
                    notchedOutline: 'login-notched-outline',
                    input: 'mui-textfield-input',
                  },
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>

            <div className="flex items-center justify-start border border-gray-300 p-1">
              <Lock className="mx-2 text-theme" />
              <TextField
                placeholder="Confirm Password"
                fullWidth
                type={`${showConfirmPassword ? 'text' : 'password'}`}
                name="confirmPassword"
                id="outlined-basic"
                variant="outlined"
                className=""
                InputProps={{
                  classes: {
                    root: ' ',
                    notchedOutline: 'login-notched-outline',
                    input: 'mui-textfield-input',
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disableFocusRipple
                        disableRipple
                        onClick={() => {
                          setShowConfirmPassword(!showConfirmPassword)
                        }}
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </div>
            <div className=" mt-4 flex items-center justify-start border border-gray-300 p-1">
              <CodeOutlined className="mx-2 text-theme" />
              <TextField
                fullWidth
                type="text"
                name="referral"
                id="outlined-basic"
                placeholder="Enter referral code "
                variant="outlined"
                className=""
                InputProps={{
                  classes: {
                    root: ' ',
                    notchedOutline: 'login-notched-outline',
                    input: 'mui-textfield-input',
                  },
                }}
                value={formik.values.referral}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.referral && Boolean(formik.errors.referral)
                }
                helperText={formik.touched.referral && formik.errors.referral}
              />
            </div>

            <button
              className="discount-card 
           relative mt-4
            w-full overflow-hidden rounded-[30px] bg-theme py-3
             text-sm text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={16} /> : 'Pay Now'}
            </button>
            <p className="mt-6 text-center text-sm tracking-wider text-slate-800">
              Already Have An Account?{' '}
              <Link legacyBehavior href="/signin">
                <span className="cursor-pointer text-theme underline hover:text-red-500">
                  Sign In
                </span>
              </Link>
            </p>
          </form>
        </article>
      </section>
    </PublicLayout>
  )
}

export default SignUp
