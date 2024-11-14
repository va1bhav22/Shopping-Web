import { VpnKey } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Card, CardContent, TextFieldProps } from '@mui/material'
import { post } from 'api'
import { MAIN_LOGO } from 'assets/home'
import { TextInput } from 'components/core'
import { Field, Form, Formik } from 'formik'
import { useAuth } from 'hooks'
import { PrivateRoute, PublicLayout } from 'layouts'
import { ChangePasswordSchema } from 'schemas'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
const ChangePassword = () => {
  const { user } = useAuth()

  const initialValues = ChangePasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as { [key: string]: string }
  )
  const validationSchema = ChangePasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as { [key: string]: Yup.StringSchema }
  )
  const handleChangePassword = async (
    values: { [key: string]: string },
    submitProps: any
  ) => {
    try {
      const response = await post({
        path: '/auth/change-password',
        body: JSON.stringify({
          email: user?.email,
          ...values,
        }),
        token: 'CGHAccessToken',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      response?.status === 200
        ? Swal.fire({ text: response?.message, icon: 'success' })
        : Swal.fire({ text: response?.error, icon: 'error' })
    } catch (error) {
      console.log(error)
    } finally {
      submitProps.setSubmitting(false)
      submitProps?.resetForm()
    }
  }
  return (
    <PrivateRoute>
      <PublicLayout title="Change Password | Prizen">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleChangePassword}
        >
          {(formik) => (
            <Form>
              <section className="flex min-h-[35rem] place-content-center px-16 py-6">
                <Card className="!m-auto !w-1/2 !shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <h1 className="py-6 text-center text-2xl font-semibold tracking-wide text-slate-800 md:text-4xl">
                    Change Your Password
                  </h1>
                  <CardContent>
                    {ChangePasswordSchema.map((inputItem) => (
                      <Field name={inputItem.name} key={inputItem.key}>
                        {(props: {
                          meta: { touched: any; error: any }
                          field: JSX.IntrinsicAttributes & TextFieldProps
                        }) => (
                          <TextInput
                            key={inputItem.key}
                            name={inputItem?.name}
                            label={inputItem?.label}
                            type={inputItem?.type}
                            startIcon={inputItem?.startIcon}
                          />
                          // <TextField
                          //   variant="outlined"
                          //   fullWidth
                          //   margin="normal"
                          //   label={inputItem.label}
                          //   type={inputItem?.type}

                          //   error={Boolean(
                          //     props.meta.touched && props.meta.error
                          //   )}
                          //   helperText={props.meta.touched && props.meta.error}
                          //   {...props.field}
                          // />
                        )}
                      </Field>
                    ))}
                    <div className="flex place-content-center">
                      <LoadingButton
                        className="btn-background !mt-2 !bg-theme"
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={formik.isSubmitting || !formik.isValid}
                        loading={formik.isSubmitting}
                        loadingPosition="start"
                        startIcon={<VpnKey />}
                      >
                        Change Password
                      </LoadingButton>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </Form>
          )}
        </Formik>
      </PublicLayout>
    </PrivateRoute>
  )
}

export default ChangePassword
