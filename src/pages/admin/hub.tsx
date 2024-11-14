import { Done } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Card, Container, Typography } from '@mui/material'
import { post, put } from 'api'
import { TextInput } from 'components/core'
import PhotoUpload from 'components/core/PhotoUpload'
import { Form, Formik } from 'formik'
import { useIsMounted } from 'hooks'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import { useEffect, useState } from 'react'
import { AddStoreSchema } from 'schemas'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
const Hub = () => {
  const isMounted = useIsMounted()
  const { data, mutate } = useSWRAPI('/store/dashboard/hub', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })

  const storeData = data?.data?.data

  const [image, setImage] = useState(storeData?._id ? storeData?.imageURL : '')

  useEffect(() => {
    if (storeData?._id) {
      setImage(storeData?.imageURL)
    }
    return () => {
      isMounted.current === false
    }
  }, [storeData])
  const handleSend = async (values: any, submitProps: any) => {
    const formData = new FormData()
    formData.append('displayName', values?.displayName)
    formData.append('email', values?.email)
    formData.append('phoneNumber', values?.phoneNumber)
    formData.append('image', image?.target?.files[0])
    formData.append('type', 'HUB')
    try {
      const response = await post({
        path: '/store',
        body: formData,
        token: 'CGHAccessToken',
        isImage: true,
      })
      if (response?.status === 200) {
        Swal.fire({ text: response?.message, icon: 'success' })
      } else {
        Swal.fire({ text: response?.error, icon: 'error' })
      }
    } catch (error) {
      console.log(error)
    } finally {
      mutate()
    }
  }

  const handleUpdate = async (values: any, submitProps: any) => {
    const formData = new FormData()
    formData.append('displayName', values?.displayName)
    formData.append('email', values?.email)
    formData.append('phoneNumber', values?.phoneNumber)
    formData.append('image', image?.target?.files[0])
    try {
      const response = await put({
        path: `/store/${storeData?._id}`,
        body: formData,
        token: 'CGHAccessToken',
        isImage: true,
      })
      if (response?.status === 200) {
        Swal.fire({ text: response?.message, icon: 'success' })
      } else {
        Swal.fire({ text: response?.error, icon: 'error' })
      }
    } catch (error) {
      console.log(error)
    } finally {
      mutate()
    }
  }

  const initialValues = AddStoreSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue
    return accumulator
  }, {} as any)
  const validationSchema = AddStoreSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )

  return (
    <AdminLayout title="Admin | My Store">
      <Container
        maxWidth="xl"
        // style={{
        //   width: '40vw',
        //   marginTop: '5vh',
        // }}
      >
        <Card className="m-auto w-1/2 !p-6 !shadow-xl">
          <Typography
            align="center"
            color="text.primary"
            variant="h5"
            className="!mt-2"
            sx={{ marginBottom: 3 }}
          >
            My Store
          </Typography>
          <div className="mt-4 flex justify-center text-center">
            <PhotoUpload
              variant={'square'}
              value={image}
              onChange={setImage}
              width={560}
              height={200}
            />
          </div>
          <Formik
            validationSchema={Yup.object(validationSchema)}
            onSubmit={storeData ? handleUpdate : handleSend}
            enableReinitialize
            initialValues={
              storeData?.email
                ? {
                    displayName: storeData?.displayName,
                    email: storeData?.email,
                    phoneNumber: storeData?.phoneNumber,
                  }
                : initialValues
            }
          >
            {(formik) => (
              <Form>
                {AddStoreSchema?.map((inputItem) => (
                  <TextInput
                    key={inputItem.key}
                    name={inputItem?.name}
                    label={inputItem?.label}
                    // multiline={inputItem?.multiline}
                    // rows={inputItem?.rows}
                  />
                ))}

                <div>
                  <div className="mt-2 mb-2">
                    <LoadingButton
                      className="btn-background !bg-theme"
                      variant="contained"
                      type="submit"
                      fullWidth
                      disabled={formik.isSubmitting || !formik.isValid}
                      loading={formik.isSubmitting}
                      loadingPosition="start"
                      startIcon={<Done />}
                    >
                      {storeData ? 'Save' : 'Add'}
                    </LoadingButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default Hub
