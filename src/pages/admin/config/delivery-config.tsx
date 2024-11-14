import { Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
} from '@mui/material'
import { put } from 'api'
import { Field, Form, Formik } from 'formik'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import { DeliveryChargeSchema } from 'schemas'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
const DeliveryConfig = () => {
  const { data, mutate } = useSWRAPI('config')
  const config = data?.data?.data
  const initialValues = DeliveryChargeSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = DeliveryChargeSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )
  const handleSetProfit = async (values: any, submitProps: any) => {
    // console.log(values);
    try {
      const response = await put({
        path: `config`,
        body: JSON.stringify({
          deliveryCharge: values?.deliveryCharge,
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
      submitProps.resetForm()
      mutate()
    }
  }
  return (
    <AdminLayout title="Admin | Set Delivery Charge">
      <Container
        maxWidth="sm"
        className="d-flex place-content-center place-items-center"
      >
        <Card
          sx={{ width: { lg: 500, md: 500, sm: 400, sx: 300 }, mt: '10vh' }}
        >
          <CardHeader
            title="Set Delivery Charge"
            subheader="Set delivery charge for your customers"
            titleTypographyProps={{ variant: 'h6', textAlign: 'center' }}
            subheaderTypographyProps={{
              variant: 'subtitle1',
              textAlign: 'center',
              mb: 0,
            }}
          ></CardHeader>
          <Formik
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSetProfit}
            enableReinitialize
            initialValues={
              config?.deliveryCharge
                ? {
                    deliveryCharge: config?.deliveryCharge,
                  }
                : initialValues
            }
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <CardContent>
                  {DeliveryChargeSchema?.map((inputItem) => (
                    <Field name={inputItem.name} key={inputItem.key}>
                      {(props: any) => {
                        return (
                          <div>
                            <TextField
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              label={inputItem.label}
                              type={inputItem.type}
                              error={Boolean(
                                props.meta.touched && props.meta.error
                              )}
                              helperText={
                                props.meta.touched && props.meta.error
                              }
                              {...props.field}
                            />
                          </div>
                        )
                      }}
                    </Field>
                  ))}
                  <div className="place-content-center">
                    <LoadingButton
                      className="btn-background !mt-2 !bg-theme"
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      loading={isSubmitting}
                      loadingPosition="start"
                      startIcon={<Send />}
                      fullWidth
                    >
                      Save
                    </LoadingButton>
                  </div>
                </CardContent>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default DeliveryConfig
