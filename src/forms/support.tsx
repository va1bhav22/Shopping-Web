import { LoadingButton } from '@mui/lab'
import { Grid, SelectProps, TextField, TextFieldProps } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import useAuthFetch from 'hooks/useAuthFetch'
import { SupportUsForm } from 'schemas'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

export default function SupportForm({ onSuccess }: { onSuccess?: () => void }) {
  const supportInitialValues = SupportUsForm().reduce(
    (
      accumulator: { [x: string]: any },
      currentValue: { name: string | number; initialValue: any }
    ) => {
      accumulator[currentValue?.name] = currentValue.initialValue
      return accumulator
    },
    {} as { [key: string]: string }
  )
  const supportValidationSchema = SupportUsForm().reduce(
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
    props: { resetForm: () => void }
  ) => {
    try {
      const responseData = await mutate({
        path: 'support-form',
        method: 'POST',
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phoneNumber: values?.phoneNumber,
          subject: values?.subject,
          message: values?.message,
        }),
      })
      if (responseData?.error) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: responseData?.error,
        })
      }
      Swal.fire({
        title: 'Success',
        text: 'Your message has been sent successfully. Our team will reach you soon',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      props.resetForm()
      onSuccess && onSuccess()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Formik
      enableReinitialize
      initialValues={supportInitialValues}
      validationSchema={Yup.object(supportValidationSchema)}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="!flex !flex-col !items-center !gap-4">
          <p className="mt-4 tracking-wide text-gray-500">
            Our Support Team Is Here To Help You 24 x 7
          </p>
          <Grid container justifyContent="center" spacing={0}>
            {SupportUsForm().map((curElm: any) => (
              <Field name={curElm.name} key={curElm.key}>
                {(props: {
                  meta: { touched: any; error: any }
                  field: JSX.IntrinsicAttributes & TextFieldProps & SelectProps
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

                      error={Boolean(props.meta.touched && props.meta.error)}
                      helperText={props.meta.touched && props.meta.error}
                      {...props.field}
                    />
                  </Grid>
                )}
              </Field>
            ))}
          </Grid>

          <LoadingButton
            size="large"
            variant="contained"
            className="w-full bg-theme !tracking-wider text-white"
            type="submit"
            disabled={isLoading}
            loading={isLoading}
          >
            SEND MESSAGE
          </LoadingButton>
        </Form>
      )}
    </Formik>
  )
}
