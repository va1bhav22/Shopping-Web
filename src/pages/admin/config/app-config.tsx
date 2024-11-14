import { Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { put } from 'api'
import { Field, Form, Formik } from 'formik'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import { AppUpdateSchema } from 'schemas'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
const AppConfig = () => {
  const initialValues = AppUpdateSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue
    return accumulator
  }, {} as any)
  const validationSchema = AppUpdateSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )
  const handleSetAndroid = async (values: any, submitProps: any) => {
    try {
      const response = await put({
        path: `config`,
        body: JSON.stringify({
          androidApp: {
            version: values?.version,
            title: values?.title,
            message: values?.message,
            isDismissible: values?.isDismissible,
          },
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
  const handleSetIos = async (values: any, submitProps: any) => {
    try {
      const response = await put({
        path: `config`,
        body: JSON.stringify({
          iosApp: {
            version: values?.version,
            title: values?.title,
            message: values?.message,
            isDismissible: values?.isDismissible,
          },
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
  const { data, error, mutate } = useSWRAPI('config')
  const config = data?.data?.data
  return (
    <AdminLayout title="Admin | App Config ">
      <Container
        maxWidth="lg"
        className="!mt-4 !flex !flex-col !items-center !justify-center"
      >
        <Grid
          container
          spacing={5}
          sx={{
            justifyContent: 'center',
          }}
        >
          <Grid item lg={6} md={6}>
            <Card
              sx={{ width: { lg: 400, md: 400, sm: 400, sx: 300 } }}
              className="shadow-xl"
            >
              <CardHeader
                className="!pb-0"
                title="Android App Update"
                //   subheader="Update your app"
                titleTypographyProps={{
                  variant: 'h6',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              />
              <Formik
                enableReinitialize
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSetAndroid}
                initialValues={
                  config?.androidApp ? config?.androidApp : initialValues
                }
              >
                {({ isSubmitting, isValid }) => (
                  <Form>
                    <CardContent>
                      {AppUpdateSchema?.map((inputItem) => (
                        <Field name={inputItem.name} key={inputItem.key}>
                          {(props: {
                            meta: { touched: any; error: any }
                            field: JSX.IntrinsicAttributes &
                              TextFieldProps &
                              SelectProps
                          }) => {
                            if (inputItem.type === 'select') {
                              return (
                                <FormControl
                                  required
                                  fullWidth
                                  margin="normal"
                                  variant="outlined"
                                  error={Boolean(
                                    props.meta.touched && props.meta.error
                                  )}
                                >
                                  <InputLabel id={`label-${inputItem.name}`}>
                                    {inputItem.label}
                                  </InputLabel>
                                  <Select
                                    labelId={`label-${inputItem.name}`}
                                    id={inputItem.name}
                                    label={inputItem.label}
                                    {...props.field}
                                  >
                                    {inputItem?.options?.map((option: any) => (
                                      <MenuItem
                                        value={option?.value}
                                        key={option?.key}
                                      >
                                        {option.dismiss}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  <FormHelperText>
                                    {props.meta.touched && props.meta.error}
                                  </FormHelperText>
                                </FormControl>
                              )
                            }
                            return (
                              <div>
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                  label={inputItem.label}
                                  type={inputItem.type}
                                  multiline={inputItem?.multiline}
                                  rows={inputItem?.rows}
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
                          className="!mt-1vh btn-background !bg-theme"
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting || !isValid}
                          loading={isSubmitting}
                          loadingPosition="start"
                          startIcon={<Send />}
                          fullWidth
                        >
                          Update App
                        </LoadingButton>
                      </div>
                    </CardContent>
                  </Form>
                )}
              </Formik>
            </Card>
          </Grid>
          <Grid item lg={6} md={6}>
            <Card
              sx={{ width: { lg: 400, md: 400, sm: 400, sx: 300 } }}
              className="shadow-xl"
            >
              <CardHeader
                className="!pb-0"
                title="IOS App Update"
                //   subheader="Update your app"
                titleTypographyProps={{
                  variant: 'h6',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  paddingBottom: '0px',
                  marginBottom: '0px',
                }}
              />
              <Formik
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSetIos}
                enableReinitialize
                initialValues={config?.iosApp ? config?.iosApp : initialValues}
                // initialValues={ initialValues}
              >
                {({ isSubmitting, isValid }) => (
                  <Form>
                    <CardContent>
                      {AppUpdateSchema?.map((inputItem) => (
                        <Field name={inputItem.name} key={inputItem.key}>
                          {(props: {
                            meta: { touched: any; error: any }
                            field: JSX.IntrinsicAttributes &
                              TextFieldProps &
                              SelectProps
                          }) => {
                            if (inputItem.type === 'select') {
                              return (
                                <FormControl
                                  required
                                  fullWidth
                                  margin="normal"
                                  variant="outlined"
                                  error={Boolean(
                                    props.meta.touched && props.meta.error
                                  )}
                                >
                                  <InputLabel id={`label-${inputItem.name}`}>
                                    {inputItem.label}
                                  </InputLabel>
                                  <Select
                                    labelId={`label-${inputItem.name}`}
                                    id={inputItem.name}
                                    label={inputItem.label}
                                    {...props.field}
                                  >
                                    {inputItem?.options?.map((option: any) => (
                                      <MenuItem
                                        value={option?.value}
                                        key={option?.key}
                                      >
                                        {option.dismiss}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  <FormHelperText>
                                    {props.meta.touched && props.meta.error}
                                  </FormHelperText>
                                </FormControl>
                              )
                            }
                            return (
                              <div>
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                  label={inputItem.label}
                                  type={inputItem.type}
                                  multiline={inputItem?.multiline}
                                  rows={inputItem?.rows}
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
                          className="!mt-1vh btn-background !bg-theme"
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting || !isValid}
                          loading={isSubmitting}
                          loadingPosition="start"
                          startIcon={<Send />}
                          fullWidth
                        >
                          Update App
                        </LoadingButton>
                      </div>
                    </CardContent>
                  </Form>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  )
}

export default AppConfig
