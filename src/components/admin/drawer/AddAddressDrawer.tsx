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
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Done } from '@mui/icons-material'
import { StoreAddressSchema } from 'schemas'

import { LoadingButton } from '@mui/lab'
import { post, put } from 'api'
import Swal from 'sweetalert2'
// import { PhotoUpload } from "./core";
type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const AddAddressDrawer = ({ open, onClose, setRealtime, mutate }: Props) => {
  const initialValues = StoreAddressSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = StoreAddressSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema
      return accumulator
    },
    {} as any
  )
  const updateAddress = async (values: any) => {
    try {
      const response = await put({
        path: `/address/${open?.address?._id}`,
        body: JSON.stringify({
          name: open?.displayName,
          email: open?.email,
          phoneNumber: open?.phoneNumber,
          zip: values?.zip,
          street: values?.street,
          city: values?.city,
          landmark: values?.landmark,
          state: values?.state,
          country: 'India',
          type: 'WORK',
        }),
        token: 'CGHAccessToken',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response?.status !== 200)
        return Swal.fire({ text: response?.error, icon: 'error' })

      Swal.fire({ text: response?.message, icon: 'success' })
      onClose()
    } catch (error) {
      console.log(error)
    } finally {
      mutate()
    }
  }

  const handleSend = async (values: any, submitProps: any) => {
    if (open?.address) {
      return updateAddress(values)
    }
    try {
      const response = await post({
        path: `/address?storeId=${open?._id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: open?.displayName,
          email: open?.email,
          phoneNumber: open?.phoneNumber,
          zip: values?.zip,
          street: values?.street,
          city: values?.city,
          landmark: values?.landmark,
          state: values?.state,
          country: 'India',
          type: 'WORK',
        }),
        token: 'CGHAccessToken',
      })

      if (response?.status === 200) {
        Swal.fire({ text: response?.message, icon: 'success' })
        onClose()
      }
      return Swal.fire({ text: response?.error, icon: 'error' })
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
            Add Store Address
          </Typography>
          {/* <div className="flex text-center justify-center mt-4">
          
            <PhotoUpload
              variant={"square"}
              value={value}
              onChange={setValue}
              width={450}
              height={200}
            />
          </div> */}
          <Formik
            enableReinitialize
            initialValues={
              open?.address
                ? {
                    displayName: open?.displayName,
                    email: open?.email,
                    phoneNumber: open?.phoneNumber,
                    zip: open?.address?.zip,
                    street: open?.address?.street,
                    city: open?.address?.city,
                    landmark: open?.address?.landmark,
                    state: open?.address?.state,
                    country: open?.address?.country,
                  }
                : open?._id
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
                {StoreAddressSchema?.map((inputItem: any) => (
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
                            variant="outlined"
                            fullWidth
                            // margin="normal"
                            required={inputItem?.required}
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                          >
                            {formik?.values?.state ? (
                              ' '
                            ) : (
                              <InputLabel
                                id={`label-${inputItem.name}`}
                                //   shrink={true}
                              >
                                {inputItem.label}
                              </InputLabel>
                            )}
                            <Select
                              // labelId={`label-${curElm.placeholder}`}
                              id={inputItem?.name}
                              //   notched={true}
                              value="Select State"
                              // placeholder={curElm.placeholder}
                              {...props.field}
                              // InputProps={{
                              //   classes: {
                              //     notchedOutline: 'sorting-select-outline',
                              //   },
                              // }}
                            >
                              {inputItem?.options?.map((option: any) => (
                                <MenuItem value={option.value} key={option.key}>
                                  <div className="flex items-center">
                                    {option.value
                                      ? option.value
                                      : 'Select State'}
                                  </div>
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
                            required={inputItem.required}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            disabled={inputItem?.disabled}
                            label={inputItem.label}
                            type={inputItem.type}
                            multiline={inputItem?.multiline}
                            // rows={inputItem?.rows}
                            InputLabelProps={{ shrink: true }}
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

export default AddAddressDrawer
