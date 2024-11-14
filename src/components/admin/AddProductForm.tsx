import { Add } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { post } from 'api'
import PhotoUpload from 'components/core/PhotoUpload'
import { Field, Form, Formik, useFormik } from 'formik'
import { useState } from 'react'
import { useAddProductSchema } from 'schemas/AddProductSchema'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
type Props = {
  businessType: 'B2B' | 'B2C'
}
const AddProductForm = ({ businessType }: Props) => {
  const { addProductSchema } = useAddProductSchema()
  const [value, setValue] = useState<any>('')
  // if (businessType == 'B2B') {
  //   const initialValues = addProductSchema?.reduce(
  //     (accumulator: any, currentValue: any) => {
  //       accumulator[currentValue.name] = currentValue.initialValue
  //       return accumulator
  //     },
  //     {} as any
  //   )
  //   const validationSchema = addProductSchema?.reduce(
  //     (accumulator: any, currentValue: any) => {
  //       accumulator[currentValue.name] = currentValue.validationSchema
  //       return accumulator
  //     },
  //     {} as any
  //   )
  // }
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
  // const handleAddProduct = async (values: any, submitProps: any) => {
  //   console.log(submitProps)
  //   submitProps?.resetForm(initialValues)
  //   return
  //   const formData = new FormData()
  //   formData.append('title', values?.title)
  //   formData.append('category', values?.category)
  //   formData.append('shortDescription', values?.shortDescription)
  //   formData.append('description', values?.description)
  //   formData.append('mrp', values?.mrp)
  //   formData.append('measureType', values?.measureType)
  //   formData.append('measureUnit', values?.measureUnit)
  //   formData.append('stock', values?.stock)
  //   formData.append('salePrice', values?.salePrice)
  //   formData.append('type', businessType)
  //   formData.append(
  //     'moq',
  //     businessType === 'B2B'
  //       ? values?.moq
  //       : businessType === 'B2C'
  //       ? values?.moq || 1
  //       : ''
  //   )
  //   formData.append('displayImage', value?.target?.files[0])
  //   formData.append('isFeatured', values?.isFeatured)

  //   try {
  //     const response = await post({
  //       path: `/product?type=${businessType?.toLowerCase()}`,
  //       body: formData,
  //       token: 'CGHAccessToken',
  //       isImage: true,
  //     })
  //     if (response?.status === 200) {
  //       submitProps?.resetForm()
  //       Swal.fire({ text: response?.message, icon: 'success' })
  //     } else {
  //       Swal.fire({ text: response?.error, icon: 'error' })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     submitProps.setSubmitting(false)
  //   }
  // }
  console.log(initialValues)
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
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
      formData.append(
        'moq',
        businessType === 'B2B'
          ? values?.moq
          : businessType === 'B2C'
          ? values?.moq || 1
          : ''
      )
      formData.append('displayImage', value?.target?.files[0])
      formData.append('isFeatured', values?.isFeatured)

      try {
        const response = await post({
          path: `/product?type=${businessType?.toLowerCase()}`,
          body: formData,
          token: 'CGHAccessToken',
          isImage: true,
        })
        if (response?.status === 200) {
          formik?.resetForm()
          setValue('')
          Swal.fire({ text: response?.message, icon: 'success' })
        } else {
          Swal.fire({ text: response?.error, icon: 'error' })
        }
      } catch (error) {
        console.log(error)
      } finally {
        formik.setSubmitting(false)
      }
    },
  })
  console.log(formik)
  return (
    <>
      {/* <Formik
        initialValues={initialValues}
        // validationSchema={Yup.object(validationSchema)}
        onSubmit={handleAddProduct}
      > */}
      {/* {(formik) => ( */}
      <form>
        <Container
          maxWidth="md"
          className="!flex !min-h-[35rem] !place-content-center px-[8rem] py-6"
        >
          <Card className="m-auto w-full !shadow-xl">
            <div className="text-wider mt-6 flex place-content-center text-2xl font-semibold text-theme">
              {/* <img src={MAIN_LOGO.src} alt="" className="w-1/3" /> */}
              Add Product
            </div>
            <div className="mt-4 flex justify-center text-center">
              <PhotoUpload
                variant={'square'}
                value={value}
                onChange={setValue}
                width={450}
                height={150}
              />
              {console.log(formik.values)}
            </div>
            <CardContent>
              {addProductSchema?.map((inputItem: any) => {
                if (inputItem.type === 'select') {
                  return (
                    <FormControl
                      required
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      error={Boolean(
                        formik?.touched[inputItem?.name] &&
                          formik?.errors[inputItem?.name]
                      )}
                    >
                      <InputLabel id={`label-${inputItem.name}`}>
                        {inputItem.label}
                      </InputLabel>
                      <Select
                        labelId={`label-${inputItem.name}`}
                        id={inputItem.name}
                        label={inputItem.label}
                        name={inputItem.name}
                        onChange={formik.handleChange}
                        value={formik?.values[inputItem?.name]}
                      >
                        {inputItem?.options?.map((option: any) => (
                          <MenuItem value={option?.value} key={option?.key}>
                            {option?.category}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {formik?.touched[inputItem?.name] &&
                          (formik?.errors[inputItem?.name] as any)}
                      </FormHelperText>
                    </FormControl>
                  )
                }
                if (businessType === 'B2C' && inputItem?.hidden) return null
                return (
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name={inputItem?.name}
                      margin="normal"
                      label={inputItem.label}
                      type={inputItem.type}
                      multiline={inputItem?.multiline}
                      rows={inputItem?.rows}
                      value={formik?.values[inputItem?.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(
                        formik?.touched[inputItem?.name] &&
                          formik?.errors[inputItem?.name]
                      )}
                      helperText={
                        formik?.touched[inputItem?.name] &&
                        (formik?.errors[inputItem?.name] as any)
                      }

                      // {...props.field}
                    />
                  </div>
                )
              })}
              <div className="flex place-content-center">
                <LoadingButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  onClick={() => formik.handleSubmit()}
                  loading={formik.isSubmitting}
                  disabled={formik.isSubmitting || !formik.isValid}
                  className={`btn-background !mt-2 !bg-theme`}
                  startIcon={<Add />}
                >
                  Add{' '}
                </LoadingButton>
              </div>
            </CardContent>
          </Card>
        </Container>
      </form>
      {/* )} */}
      {/* </Formik>{' '} */}
    </>
  )
}

export default AddProductForm
