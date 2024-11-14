import { Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Card, CardContent, CardHeader, Container } from '@mui/material'
import { post } from 'api'
import { MAIN_LOGO } from 'assets/home'
import { TextInput } from 'components/core'
import { withAdmin } from 'components/hoc'

import { Form, Formik } from 'formik'
import { useAuth } from 'hooks'
import { AdminLayout } from 'layouts'
import { MessageSchema } from 'schemas'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

const UniversitySupport = () => {
  const { user } = useAuth()
  console.log(user)
  const initialValues = MessageSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue
    return accumulator
  }, {} as any)
  const validationSchema = MessageSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema
    return accumulator
  }, {} as any)
  const handleSupport = async (values: any, submitProps: any) => {
    console.log(values)
    try {
      const response = await post({
        path: '/support-form',
        body: JSON.stringify({
          name: user?.displayName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          subject: values?.subject,
          message: values?.message,
        }),
        token: 'CGHAccessToken',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      response?.status === 200
        ? Swal.fire({ text: response?.message, icon: 'success' })
        : Swal.fire({ text: response?.error, icon: 'error' })
      submitProps.resetForm()
      console.log(values)
    } catch (error) {
      submitProps.resetForm()
      console.log(error)
      submitProps.setSubmitting(false)
    }
  }
  return (
    <AdminLayout>
      <section className="m-8">
        <Container
          maxWidth="sm"
          className=" h-75vh place-content-center place-items-center"
        >
          <Card>
            <div className="flex justify-center">
              <img src={MAIN_LOGO.src} width="150" alt="" />
            </div>
            <CardHeader
              title="Need Some Help ?"
              subheader="Don't Worry Drop a Message..."
              titleTypographyProps={{
                gutterBottom: true,
                align: 'center',
              }}
              subheaderTypographyProps={{
                gutterBottom: true,
                align: 'center',
              }}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSupport}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <CardContent>
                    {MessageSchema.map((inputItem) => (
                      <TextInput
                        key={inputItem.key}
                        name={inputItem?.name}
                        label={inputItem?.label}
                        multiline
                        rows={inputItem?.rows}
                      />
                    ))}
                    <div className="place-content-center">
                      <LoadingButton
                        variant="contained"
                        startIcon={<Send />}
                        disabled={!isValid}
                        loading={isSubmitting}
                        color="success"
                        className="btn-background !mt-1 !bg-theme"
                        type="submit"
                        loadingPosition="start"
                        fullWidth
                      >
                        Send Message
                      </LoadingButton>
                    </div>
                  </CardContent>
                </Form>
              )}
            </Formik>
          </Card>
        </Container>
      </section>
    </AdminLayout>
  )
}

export default withAdmin(UniversitySupport)
