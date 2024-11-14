import { Lock, Person, Visibility, VisibilityOff } from '@mui/icons-material'
import { CircularProgress, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import CommonBanner from 'components/CommonBanner'
import myProductContext from 'contexts/myProductContext'
import { useFormik } from 'formik'
import { useAuth } from 'hooks'
import useAuthFetch from 'hooks/useAuthFetch'
import { PublicLayout } from 'layouts'
import Link from 'next/link'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { getLocalStorageItem } from 'utils'
import * as Yup from 'yup'
const initialValues = {
  username: '',
  password: '',
}
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "it's too short")
    .required('Please enter your name'),
  password: Yup.string().required('Required'),
})

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { isLogin, setIsLogin } = myProductContext()
  const { setUser, user } = useAuth()

  const authToken = getLocalStorageItem('CghRefreshToken')

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const { isLoading, mutate } = useAuthFetch()
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, props) => {
      try {
        const response = await mutate({
          path: 'auth/login',
          method: 'POST',
          body: JSON.stringify({
            email: values?.username,
            password: values?.password,
          }),
        })
        if (response?.error) {
          Swal.fire({ icon: 'error', text: response?.error })
          return
        }
        response?.data?.role === 'ADMIN'
          ? (window.location.href = '/admin/dashboard')
          : response?.data?.role === 'SELLER'
          ? (window.location.href = '/admin/manager/dashboard')
          : (window.location.href = '/')
        setUser(response?.data)
        setIsLogin(true)
        scrollTop()
        props.resetForm()
      } catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <PublicLayout title="Sign In | Prizen">
      <CommonBanner title="Sign In" />
      <section
        className="relative flex w-full scroll-mt-28 flex-col items-center justify-center bg-theme_gray px-6 py-12 lg:py-20"
        id="signin-form"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="w-full rounded-md bg-white p-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:w-3/5 lg:w-[35%]"
        >
          <h1 className="mb-8 text-center text-xl font-semibold md:text-3xl">
            Log In To Your Account
          </h1>
          <div className="mb-4 flex items-center justify-start border border-gray-300 p-1">
            <Person className="mx-2 text-theme" />
            <TextField
              fullWidth
              type="name"
              name="username"
              id="outlined-basic"
              placeholder="Email"
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
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </div>
          <div className="flex items-center justify-start border border-gray-300 p-1">
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <button
            className="discount-card relative mt-4 w-full overflow-hidden rounded-[30px] bg-theme py-3 text-sm text-white"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={16} /> : 'Log In'}
          </button>
          <p className="mt-6 text-center text-sm tracking-wider">
            New to Prizen?{' '}
            <Link legacyBehavior href="/signup">
              <a className=" cursor-pointer text-theme underline hover:text-red-500">
                Sign Up
              </a>
            </Link>
          </p>
        </form>
        <div className="flex flex-col ">
          <Link legacyBehavior href="/forgot-password">
            <a className="z-10 my-5 cursor-pointer text-center text-sm tracking-wider text-theme underline hover:text-red-500">
              Forgot Your Password?
            </a>
          </Link>
          <Link legacyBehavior href="/resend-email-verification">
            <a className="z-10 my-5 cursor-pointer text-center text-sm tracking-wider text-theme underline hover:text-red-500">
              Resend Email Verification Link?
            </a>
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}

export default SignIn
