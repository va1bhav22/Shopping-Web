import { Container, Drawer, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'

import { Save } from '@mui/icons-material'
import { AddStoreSchema } from 'schemas'

import { LoadingButton } from '@mui/lab'
import { put } from 'api'
import { TextInput } from 'components/core'
import PhotoUpload from 'components/core/PhotoUpload'
import { useIsMounted } from 'hooks'
import Swal from 'sweetalert2'
type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const EditStoreDrawer = ({ open, onClose, mutate }: Props) => {
  const isMounted = useIsMounted()
  const initialValues = AddStoreSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue
    return accumulator
  }, {} as any)
  const validationSchema = AddStoreSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as { [key: string]: Yup.StringSchema }
  )
  const [image, setImage] = useState(open?._id ? open?.imageURL : '')

  useEffect(() => {
    if (open?._id) {
      setImage(open?.imageURL)
    }
    return () => {
      isMounted.current === false
    }
  }, [open])

  const handleSend = async (values: any, submitProps: any) => {
    const formData = new FormData()
    formData.append('displayName', values?.displayName)
    formData.append('email', values?.email)
    formData.append('phoneNumber', values?.phoneNumber)
    formData.append('image', image?.target?.files[0])
    try {
      const response = await put({
        path: `/store/${open?._id}`,
        body: formData,
        token: 'CGHAccessToken',
        isImage: true,
      })
      if (response?.status === 200) {
        onClose()
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
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: '40vw',
            marginTop: '5vh',
          }}
        >
          <Typography
            align="center"
            color="text.primary"
            variant="h5"
            sx={{ marginBottom: 3 }}
          >
            Edit Store
          </Typography>
          <div className="mt-4 flex justify-center text-center">
            <PhotoUpload
              variant={'square'}
              value={image}
              onChange={setImage}
              width={450}
              height={200}
            />
          </div>
          <Formik
            enableReinitialize
            initialValues={
              open?.email
                ? {
                    displayName: open?.displayName,
                    email: open?.email,
                    phoneNumber: open?.phoneNumber,
                  }
                : initialValues
            }
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
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
                      startIcon={<Save />}
                    >
                      Save
                    </LoadingButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </Drawer>
    </>
  )
}

export default EditStoreDrawer
