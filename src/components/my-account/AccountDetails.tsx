import { ImageSearchRounded, UploadFile } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Avatar,
  Grid,
  Radio,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useAuth } from 'hooks'
import useAuthFetch from 'hooks/useAuthFetch'
import React from 'react'
import { PersonalInformationSchema } from 'schemas'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

const AccountDetails = () => {
  // const [selectGender, setSelectGender] = React.useState('a')
  const { user, getUser } = useAuth()
  const { data, isLoading, mutate } = useAuthFetch()
  const [isEditClicked, setIsEditClicked] = React.useState(false)
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null)
  const initialValues = {
    email: user?.email || '',
    gender: user?.gender || '',
    name: user?.displayName || '',
    phone: user?.phoneNumber || '',
  }
  const validationSchema = PersonalInformationSchema().reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as { [key: string]: Yup.StringSchema }
  )

  // const handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectGender(event.target.value)
  // }

  const handleInformationSubmit = async (values: any) => {
    const formData = new FormData()
    formData.append('displayName', values?.name)
    formData.append('email', values?.email)
    formData.append('phoneNumber', values?.phone)
    formData.append('gender', values?.gender?.toUpperCase())
    avatarFile && formData.append('avatar', avatarFile)
    const updatedProfileData = await mutate({
      path: 'user/account',
      method: 'PUT',
      isFormData: true,
      body: formData,
    })

    if (updatedProfileData?.error) {
      Swal.fire({
        text: updatedProfileData?.error,
        icon: 'error',
      })
    } else {
      getUser()
      setIsEditClicked(false)
      Swal.fire({
        title: 'Your Profile Information has been updated',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f15a24',
      })
    }
  }

  return (
    <section className="bg-white py-4 px-8">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleInformationSubmit}
      >
        {(formik) => (
          <Form className="!flex !flex-col !items-center !gap-10">
            <div className="flex w-full justify-between">
              <h1 className="text-lg tracking-wide">Personal Information</h1>
              {isEditClicked ? (
                <button
                  className="tracking-wide text-red-500"
                  onClick={() => setIsEditClicked(false)}
                  type="button"
                >
                  CANCEL
                </button>
              ) : (
                <button
                  className="tracking-wide text-blue-500 hover:text-theme"
                  onClick={() => setIsEditClicked(true)}
                  type="button"
                >
                  EDIT
                </button>
              )}
            </div>
            <section className="my-4 w-full md:w-1/2">
              <Grid container justifyContent="center" spacing={1}>
                <label htmlFor="avatar" className="relative">
                  <Avatar
                    alt="display-picture"
                    src={
                      avatarFile
                        ? URL.createObjectURL(avatarFile)
                        : user?.photoURL
                    }
                    style={{
                      width: '6rem',
                      height: '6rem',
                    }}
                  >
                    <>
                      <UploadFile />
                    </>
                  </Avatar>
                  {isEditClicked && (
                    <input
                      type="file"
                      name="avatar"
                      hidden
                      id="avatar"
                      onChange={(e) => {
                        e.target.files && setAvatarFile(e.target.files[0])
                      }}
                    />
                  )}

                  {isEditClicked && (
                    <ImageSearchRounded className="absolute right-0 bottom-0 text-gray-500" />
                  )}
                </label>
                {PersonalInformationSchema().map((curElm: any) => (
                  <Field name={curElm.name} key={curElm.key}>
                    {(props: {
                      meta: { touched: any; error: any }
                      field: JSX.IntrinsicAttributes &
                        TextFieldProps &
                        SelectProps
                    }) => {
                      if (curElm.type === 'text' || curElm.type === 'email') {
                        return (
                          <Grid item xs={12} sm={12} md={12} lg={curElm.lg}>
                            <h1 className="mb-3 tracking-wide">
                              {curElm.label}
                            </h1>
                            <TextField
                              required={curElm?.required}
                              type={curElm.type}
                              fullWidth
                              placeholder={curElm.placeholder}
                              // InputProps={{
                              //   classes: {
                              //     root: ' ',
                              //     notchedOutline: 'sorting-select-outline',
                              //   },
                              // }}
                              inputProps={{
                                readOnly: isEditClicked ? false : true,
                              }}
                              error={Boolean(
                                props.meta.touched && props.meta.error
                              )}
                              helperText={
                                props.meta.touched && props.meta.error
                              }
                              {...props.field}
                            />
                          </Grid>
                        )
                      } else {
                        return <></>
                      }
                    }}
                  </Field>
                ))}
              </Grid>
              <p className="my-3 tracking-wide">Your Gender</p>
              <div className="flex flex-col gap-4 md:flex-row md:justify-start">
                <span className="gap- flex items-center gap-1">
                  <Radio
                    // checked={selectGender === 'Male'}
                    // onChange={handleGender}
                    checked={formik.values.gender === 'MALE'}
                    onChange={() => formik.setFieldValue('gender', 'MALE')}
                    value="MALE"
                    size="small"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'MALE' }}
                    className="!p-0"
                  />
                  <p className="text-sm font-light tracking-wide">Male</p>
                </span>

                <span className="gap- flex items-center gap-1">
                  <Radio
                    // checked={selectGender === 'Female'}
                    // onChange={handleGender}
                    checked={formik.values.gender === 'FEMALE'}
                    onChange={() => formik.setFieldValue('gender', 'FEMALE')}
                    value="FEMALE"
                    size="small"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'FEMALE' }}
                    className="!p-0"
                  />
                  <p className="text-sm font-light tracking-wide">Female</p>
                </span>
                <span className="gap- flex items-center gap-1">
                  <Radio
                    // checked={selectGender === 'Female'}
                    // onChange={handleGender}
                    checked={formik.values.gender === 'OTHER'}
                    onChange={() => formik.setFieldValue('gender', 'OTHER')}
                    value="OTHER"
                    size="small"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'OTHER' }}
                    className="!p-0"
                  />
                  <p className="text-sm font-light tracking-wide">Other</p>
                </span>
              </div>
              {isEditClicked && (
                <div className="flex place-content-center py-4">
                  <LoadingButton
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                    size="medium"
                    className="bg-theme !tracking-wide text-white"
                    disabled={!formik.isValid || isLoading}
                  >
                    SAVE
                  </LoadingButton>
                </div>
              )}
            </section>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default AccountDetails
