import { Container, Drawer, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

import { Done } from '@mui/icons-material'
import { AddStoreSchema } from 'schemas'

import { LoadingButton } from '@mui/lab'
import { post } from 'api'
import { TextInput } from 'components/core'
import PhotoUpload from 'components/core/PhotoUpload'
import Swal from 'sweetalert2'
// import { PhotoUpload } from "./core";
type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const AddStoreDrawer = ({ open, onClose, setRealtime, mutate }: Props) => {
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
  const [image, setImage] = useState<any>()
  const handleSend = async (values: any, submitProps: any) => {
    const formData = new FormData()
    formData.append('displayName', values?.displayName)
    formData.append('email', values?.email)
    formData.append('phoneNumber', values?.phoneNumber)
    formData.append('image', image?.target?.files[0])
    try {
      const response = await post({
        path: '/store',
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
            Add Store
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
            initialValues={initialValues}
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
                      startIcon={<Done />}
                    >
                      Add
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

export default AddStoreDrawer
