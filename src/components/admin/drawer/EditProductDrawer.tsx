import { Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Container,
  Drawer,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'
import { put } from 'api'
import PhotoUpload from 'components/core/PhotoUpload'
import { Field, Form, Formik } from 'formik'
import { useIsMounted } from 'hooks'
import { useEffect, useState } from 'react'
import { useAddProductSchema } from 'schemas/AddProductSchema'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  businessType: 'B2B' | 'B2C'
  mutate?: any
}

const EditProductDrawer = ({ open, onClose, businessType, mutate }: Props) => {
  const isMounted = useIsMounted()
  const { addProductSchema } = useAddProductSchema()
  const [value, setValue] = useState<any>(
    open?._id ? open?.displayImage?.url : ''
  )

  useEffect(() => {
    if (open?._id) {
      setValue(open?.displayImage?.url)
    }
    return () => {
      isMounted.current === false
    }
  }, [open])

  if (businessType == 'B2B') {
    const initialValues = addProductSchema?.reduce(
      (accumulator: any, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.initialValue
        return accumulator
      },
      {} as any
    )
    const validationSchema = addProductSchema?.reduce(
      (accumulator: any, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.validationSchema
        return accumulator
      },
      {} as any
    )
  }
  const initialValues = addProductSchema
    ?.filter((item: any) => !item.hidden)
    .reduce((accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    }, {} as any)
  const validationSchema = addProductSchema
    ?.filter((item: any) => !item.hidden)
    ?.reduce((accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    }, {} as any)
  const handleUpdateProduct = async (values: any, submitProps: any) => {
    const formData = new FormData()
    formData.append('title', values?.title)
    formData.append('category', values?.category)
    formData.append('shortDescription', values?.shortDescription)
    formData.append('description', values?.description)
    formData.append('mrp', values?.mrp)
    formData.append('measureType', values?.measureType)
    formData.append('measureUnit', values?.measureUnit)
    formData.append('stock', values?.stock)
    formData.append('salePrice', values?.salePrice)
    formData.append('type', businessType)
    formData.append('moq', values?.moq)
    formData.append('isFeatured', values?.isFeatured)

    formData.append('displayImage', value?.target?.files[0])

    try {
      const response = await put({
        path: `/product/${open?._id}`,
        body: formData,
        token: 'CGHAccessToken',
        isImage: true,
      })
      if (response?.status === 200) {
        mutate()
        onClose()
        Swal.fire({ text: response?.message, icon: 'success' })
      } else {
        Swal.fire({ text: response?.error, icon: 'error' })
      }
    } catch (error) {
      console.log(error)
    } finally {
      submitProps?.resetForm()
      submitProps.setSubmitting(false)
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
            Edit Details
          </Typography>
          <div className="mt-4 flex justify-center text-center">
            <PhotoUpload
              variant={'square'}
              value={value}
              onChange={setValue}
              width={450}
              height={170}
            />
          </div>
          <Formik
            enableReinitialize
            initialValues={
              open?._id
                ? {
                    ...initialValues,
                    title: open?.title,
                    description: open?.description,
                    shortDescription: open?.shortDescription,
                    category: open?.category?._id,
                    measureUnit: open?.measureUnit,
                    measureType: open?.measureType,
                    mrp: open?.mrp,
                    moq: open?.moq,
                    salePrice: open?.salePrice,
                    stock: open?.stock,
                    isFeatured: open?.isFeatured,
                  }
                : initialValues
            }
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleUpdateProduct}
          >
            {(formik) => (
              <Form>
                {addProductSchema?.map((inputItem: any) => (
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
                                  {option?.category}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {props.meta.touched && props.meta.error}
                            </FormHelperText>
                          </FormControl>
                        )
                      }
                      if (businessType === 'B2C' && inputItem?.hidden)
                        return null
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
                            helperText={props.meta.touched && props.meta.error}
                            {...props.field}
                          />
                        </div>
                      )
                    }}
                  </Field>
                ))}
                <div className="mb-4 flex place-content-center">
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    loading={formik.isSubmitting}
                    disabled={formik.isSubmitting || !formik.isValid}
                    className={`btn-background !mt-2 !bg-theme`}
                    startIcon={<Save />}
                  >
                    Save{' '}
                  </LoadingButton>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </Drawer>
    </>
  )
}

export default EditProductDrawer
