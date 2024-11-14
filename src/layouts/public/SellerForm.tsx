import { ICONS } from 'assets'

import { Dialog } from '@mui/material'

import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { CircularProgress, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { END_POINTS, post } from 'api'
import CommonBanner from 'components/CommonBanner'
import { useFormik } from 'formik'
import { PublicLayout } from 'layouts'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

type sellerProps = {
  onClose: () => void
  open: boolean
}

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
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

const SellerForm = ({ onClose, open }: sellerProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, props) => {
      console.log(values)
    },
  })

  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="rounded bg-white p-4 shadow">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <ICONS.Close className="text-[20px] text-red-600" />
          </button>
        </div>
        <div className="w-full text-center">
          <h1 className=" text-3xl font-bold text-gray-500">
            Become A<span className="text-nav"> Seller</span>
          </h1>
          <p className="mt-1 text-[13px] text-gray-500">
            Use Different E-Mail For Become A Seller
          </p>
        </div>
        <section className="relative flex w-full flex-col items-center justify-center  ">
          <form
            onSubmit={formik.handleSubmit}
            className="] w-full rounded-md bg-white p-10 "
          >
            {/* <h1 className="mb-8 text-center text-xl font-semibold md:text-3xl">
              Create Your Account
            </h1> */}

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
                fullWidth
                type={`${showConfirmPassword ? 'text' : 'password'}`}
                name="confirmPassword"
                id="outlined-basic"
                placeholder="Confirm Password"
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

            <button
              className="discount-card 
           relative mt-4
            w-full overflow-hidden rounded-xl bg-theme py-3
             text-sm text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={16} /> : 'Sign Up'}
            </button>
            {/* <p className="mt-6 text-center text-sm tracking-wider text-slate-800">
              Already Have An Account?{' '}
              <Link legacyBehavior href="/signin">
                <span className="cursor-pointer text-theme underline hover:text-red-500">
                  Sign In
                </span>
              </Link>
            </p> */}
          </form>
        </section>
      </div>
    </Dialog>
    // </div>
  )
}

export default SellerForm
