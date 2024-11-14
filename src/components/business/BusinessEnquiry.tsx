import {
  Call,
  Email,
  Facebook,
  Instagram,
  LocationOn,
  Twitter,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  CircularProgress,
  Grid,
  IconButton,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { contact_us } from 'assets/business'
import { Field, Form, Formik } from 'formik'
import useAuthFetch from 'hooks/useAuthFetch'
import { BusinessContactSchema } from 'schemas'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

const BusinessEnquiry = () => {
  const initialValues = BusinessContactSchema().reduce(
    (
      accumulator: { [x: string]: any },
      currentValue: { name: string | number; initialValue: any }
    ) => {
      accumulator[currentValue?.name] = currentValue.initialValue
      return accumulator
    },
    {} as { [key: string]: string }
  )
  // console.log({ initialValues })

  const validationSchema = BusinessContactSchema().reduce(
    (
      accumulator: { [x: string]: any },
      currentValue: { name: string | number; validationSchema: any }
    ) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as { [key: string]: Yup.StringSchema }
  )
  const { isLoading, mutate } = useAuthFetch()
  const handleSubmit = async (
    values: any,
    submitProps: {
      resetForm: () => void
      setSubmitting: (arg0: boolean) => void
    }
  ) => {
    try {
      const resData = await mutate({
        path: 'business-enquiry-form',
        method: 'POST',
        body: JSON.stringify({
          name: values?.name,
          email: values?.email,
          phoneNumber: values?.phone,
          organization: values?.organization,
          message: values?.message,
        }),
      })
      if (resData?.error) {
        return Swal.fire({
          title: 'Oops!',
          text: resData?.error,
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
      Swal.fire({
        title: 'Success',
        text: 'Your enquiry related to business has been sent successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      submitProps.resetForm()
      submitProps.setSubmitting(false)
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }
  return (
    <section
      className="main-container flex w-full flex-col items-center justify-center"
      id="contact"
    >
      <div className="mb-20 flex flex-col items-center text-center">
        <h1 className="text-2xl tracking-wide md:text-4xl">
          Other Business Enquiries
        </h1>
        <div className="mt-4 w-20 rounded-md border-b-2 border-gray-200"></div>
      </div>
      <section className="flex w-full flex-col items-center gap-10 md:flex-row md:justify-between">
        <div className="w-full">
          <div className="flex w-full justify-center">
            <img src={contact_us.src} alt="gif" className="mb-8 w-[70%]" />
          </div>
          <span className="flex items-start gap-4 text-sm tracking-wide text-gray-500">
            <LocationOn className="!text-base" />
            Dashwantpur,Kashimabad,Ghazipur, Uttar Pradesh, 233230
          </span>
          <span className="flex items-center gap-4 py-4 text-sm tracking-wide text-gray-500">
            <Email className="!text-base" />
            prizenbusiness@gmail.com
          </span>
          <span className="flex items-center gap-4 text-sm tracking-wide text-gray-500">
            <Call className="!text-base" />
            +91-9373054469
          </span>
          <div className="mt-4 flex gap-2">
            <IconButton className="!bg-facebook !text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:!bg-theme hover:!text-white">
              <Facebook className="!text-base" />
            </IconButton>
            <IconButton className="!bg-instagram !text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:!bg-theme hover:!text-white">
              <Instagram className="!text-base" />
            </IconButton>
            <IconButton className="!bg-twitter !text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:!bg-theme hover:!text-white">
              <Twitter className="!text-base" />
            </IconButton>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-4xl font-bold tracking-wide">Let’s talk</h1>
          <p className="py-4 tracking-wider text-gray-500">
            To request a call or want to meet up for business, contact us
            directly or fill out the form and we will get back to you promptly.
          </p>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="!flex !flex-col !items-center !gap-8">
                <Grid container justifyContent="center" spacing={1}>
                  {BusinessContactSchema().map((curElm: any) => (
                    <Field name={curElm.name} key={curElm.key}>
                      {(props: {
                        meta: { touched: any; error: any }
                        field: JSX.IntrinsicAttributes &
                          TextFieldProps &
                          SelectProps
                      }) => (
                        <Grid item xs={12} sm={12} md={12} lg={curElm.lg}>
                          <h1 className="mb-3 tracking-wide">{curElm.label}</h1>
                          <TextField
                            required={curElm?.required}
                            type={curElm.type}
                            fullWidth
                            placeholder={curElm.placeholder}
                            multiline={curElm?.multiline}
                            rows={curElm?.multiline ? 4 : 1}
                            //   InputProps={{
                            //     classes: {
                            //       root: ' ',
                            //       notchedOutline: 'sorting-select-outline',
                            //     },
                            //   }}
                            inputProps={{}}
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                            helperText={props.meta.touched && props.meta.error}
                            {...props.field}
                          />
                        </Grid>
                      )}
                    </Field>
                  ))}
                </Grid>

                <div className="flex place-content-center">
                  <LoadingButton
                    size="large"
                    variant="contained"
                    className="bg-theme !tracking-wider text-white"
                    type="submit"
                    disabled={!formik.isValid}
                    loading={formik.isSubmitting}
                  >
                    {isLoading ? (
                      <CircularProgress size={15} />
                    ) : (
                      'SEND MESSAGE'
                    )}
                  </LoadingButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </section>
  )
}

export default BusinessEnquiry
