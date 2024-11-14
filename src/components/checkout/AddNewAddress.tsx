import AddIcon from '@mui/icons-material/Add'
import {
  Button,
  CircularProgress,
  Collapse,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import useAuthFetch from 'hooks/useAuthFetch'
import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { AddressSchema } from 'schemas'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

const AddNewAddress = ({
  // selectedValue,
  // setSelectedValue,
  // handleChange,
  // isOrderSummaryOpen,
  // setIsOrderSummaryOpen,
  // setIsDeliveryCollapse,
  // isRadioButton,
  addressId,
  reload,
  title,
  onClose,
}: {
  reload: () => void
  addressId?: string | null
  title?: string
  onClose?: () => void
}) => {
  const [openAddress, setOpenAddress] = React.useState(false)
  const [initialValues, setInitialValues] = React.useState({
    name: '',
    email: '',
    phone: '',
    pincode: '',
    street: '',
    city: '',
    state: '',
    landmark: '',
    country: '',
    addressType: '',
  })
  const { isLoading: isAddressDataLoading, mutate: fetchAddressData } =
    useAuthFetch()

  useEffect(() => {
    if (addressId) {
      ;(async () => {
        const resData = await fetchAddressData({
          path: `address/${addressId}`,
        })
        if (!resData?.error) {
          setInitialValues({
            name: resData?.data?.name,
            email: resData?.data?.email,
            phone: resData?.data?.phoneNumber,
            pincode: resData?.data?.zip,
            street: resData?.data?.street,
            city: resData?.data?.city,
            state: resData?.data?.state,
            landmark: resData?.data?.landmark,
            country: resData?.data?.country,
            addressType: resData?.data?.type,
          })
        }
      })()
    }
  }, [addressId])

  const handleClick = () => {
    setOpenAddress(!openAddress)
    onClose && onClose()
    // isRadioButton && setSelectedValue('c')
  }

  const validationSchema = AddressSchema().reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as { [key: string]: Yup.StringSchema }
  )

  const { isLoading, mutate } = useAuthFetch()
  const handleAddressSubmit = async (values: any, props: any) => {
    const addressValues = {
      landmark: values?.landmark,
      email: values?.email,
      phoneNumber: values?.phone,
      countryCode: 91,
      street: values?.street,
      city: values?.city,
      state: values?.state,
      country: values?.country,
      zip: values?.pincode,
      type: values?.addressType?.toUpperCase(),
      name: values?.name,
    }
    !addressValues?.landmark && delete addressValues?.landmark

    const resData = await mutate({
      path: addressId ? `address/${addressId}` : 'address',
      method: addressId ? 'PUT' : 'POST',
      body: JSON.stringify(addressValues),
    })
    if (resData?.error) {
      Swal.fire({
        title: 'Error!',
        text: resData?.error,
        icon: 'error',
        confirmButtonText: 'Ok',
      })
      return
    }
    Swal.fire({
      title: 'Your New Address has been Added',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#f15a24',
      allowOutsideClick: false,
    })
    props.resetForm()
    reload && reload()
    handleClick()
  }

  if (isAddressDataLoading)
    return (
      <div className="w-full">
        <div
          className={`w-fit cursor-pointer items-center gap-2 text-theme ${
            openAddress || !!addressId ? 'hidden' : 'flex'
          }`}
          onClick={handleClick}
        >
          <AddIcon className="" />
          <p>Add a new address</p>
        </div>
        <Collapse in={openAddress || !!addressId} timeout="auto" unmountOnExit>
          <section className="flex w-full flex-col gap-2">
            <div className="flex items-start gap-2">
              <div className="flex w-full justify-between">
                <h1 className="w-full font-semibold uppercase text-gray-600">
                  <Skeleton width={'30%'} height={21} />
                </h1>
                <button
                  className="text-blue-500 hover:text-theme"
                  onClick={handleClick}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="w-full">
              <Grid container justifyContent="center" spacing={1}>
                {AddressSchema().map((curElm: any, index) => (
                  <React.Fragment key={index}>
                    {curElm.type === 'select' ? (
                      <Grid item xs={12} sm={12} md={12} lg={curElm.lg}>
                        <Skeleton height={50} />
                      </Grid>
                    ) : curElm.type === 'radio' ? (
                      <></>
                    ) : curElm.name === 'address' ? (
                      <Grid item xs={12} sm={12} md={12} lg={curElm.lg}>
                        <Skeleton height={150} />
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={12} md={12} lg={curElm.lg}>
                        <Skeleton height={50} />
                      </Grid>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
              <p className="my-3 text-xs tracking-wide text-gray-500">
                <Skeleton height={10} width={'30%'} />
              </p>
              <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between md:gap-2">
                <Skeleton
                  count={3}
                  height={25}
                  width={'25%'}
                  containerClassName="flex justify-between w-full"
                />
              </div>
              <div className="flex w-full place-content-center py-4">
                <Skeleton
                  height={35}
                  width={'35%'}
                  containerClassName="flex justify-center w-full"
                />
              </div>
            </div>
          </section>
        </Collapse>
      </div>
    )

  return (
    <div className="w-full">
      <div
        className={`w-fit cursor-pointer items-center gap-2 text-theme ${
          openAddress || !!addressId ? 'hidden' : 'flex'
        }`}
        onClick={handleClick}
      >
        <AddIcon className="" />
        <p>Add a new address</p>
      </div>
      <Collapse in={openAddress || !!addressId} timeout="auto" unmountOnExit>
        <>
          <div className="flex items-start gap-2">
            {/* {isRadioButton && (
              <Radio
                checked={selectedValue === 'c'}
                onChange={handleChange}
                value="c"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'C' }}
                className="!p-0"
              />
            )} */}
            <div className="flex w-full justify-between">
              <h1 className="font-semibold uppercase text-gray-600">
                {(openAddress || !!addressId) && 'Add New Address'}
              </h1>
              {/* {isRadioButton || ( */}
              <button
                className="text-blue-500 hover:text-theme"
                onClick={handleClick}
              >
                Cancel
              </button>
              {/* )} */}
            </div>
          </div>
          <div>
            {/* <button className="discount-card relative my-4 flex items-center gap-2 overflow-hidden rounded bg-theme px-4 py-2 text-sm text-white">
              <MyLocationIcon className="!text-base" />
              Use my current location
            </button> */}
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleAddressSubmit}
            >
              {(formik) => (
                <Form>
                  <Grid container justifyContent="center" spacing={1}>
                    {AddressSchema().map((curElm: any) => (
                      <Field name={curElm.name} key={curElm.key}>
                        {(props: {
                          meta: { touched: any; error: any }
                          field: JSX.IntrinsicAttributes &
                            TextFieldProps &
                            SelectProps
                        }) => {
                          if (curElm.type === 'select') {
                            return (
                              <Grid item xs={12} sm={12} md={12} lg={curElm.lg}>
                                <FormControl
                                  fullWidth
                                  // margin="normal"
                                  required={curElm?.required}
                                  error={Boolean(
                                    props.meta.touched && props.meta.error
                                  )}
                                >
                                  {formik.values.state ? (
                                    ' '
                                  ) : (
                                    <InputLabel id={`label-${curElm.name}`}>
                                      {curElm.placeholder}
                                    </InputLabel>
                                  )}
                                  <Select
                                    // labelId={`label-${curElm.placeholder}`}
                                    id={curElm.name}
                                    value="Select State"
                                    defaultValue={curElm.defaultValue}
                                    // placeholder={curElm.placeholder}
                                    {...props.field}
                                    // InputProps={{
                                    //   classes: {
                                    //     notchedOutline: 'sorting-select-outline',
                                    //   },
                                    // }}
                                  >
                                    {curElm?.options?.map((option: any) => (
                                      <MenuItem
                                        value={option.value}
                                        key={option.key}
                                      >
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
                              </Grid>
                            )
                          } else if (curElm.type === 'radio') {
                            return <></>
                          }

                          return (
                            <Grid item xs={12} sm={12} md={12} lg={curElm.lg}>
                              <TextField
                                required={curElm?.required}
                                type={curElm.type}
                                fullWidth
                                // margin="normal"
                                placeholder={curElm.placeholder}
                                // InputProps={{
                                //   classes: {
                                //     root: ' ',
                                //     notchedOutline: 'sorting-select-outline',
                                //   },
                                // }}
                                multiline={curElm?.multiline}
                                rows={curElm?.multiline ? 4 : 1}
                                error={Boolean(
                                  props.meta.touched && props.meta.error
                                )}
                                helperText={
                                  props.meta.touched && props.meta.error
                                }
                                {...props.field}
                              />
                            </Grid>
                          )
                        }}
                      </Field>
                    ))}
                  </Grid>
                  <p className="my-3 text-xs tracking-wide text-gray-500">
                    Address Type
                  </p>
                  <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-2">
                    <span className="gap- flex items-center gap-1">
                      <Radio
                        checked={formik.values.addressType === 'HOME'}
                        onChange={() =>
                          formik.setFieldValue('addressType', 'HOME')
                        }
                        value="HOME"
                        size="small"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'HOME' }}
                        className="!p-0"
                      />
                      <p className="text-sm font-light tracking-wide">
                        Home {`(All day delivery)`}
                      </p>
                    </span>

                    <span className="gap- flex items-center gap-1">
                      <Radio
                        checked={formik.values.addressType === 'WORK'}
                        onChange={() =>
                          formik.setFieldValue('addressType', 'WORK')
                        }
                        value="WORK"
                        size="small"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'WORK' }}
                        className="!p-0"
                      />
                      <p className="text-sm font-light tracking-wide">
                        Work {`(Delivery between 10AM - 5PM)`}
                      </p>
                    </span>
                    <span className="gap- flex items-center gap-1">
                      <Radio
                        checked={formik.values.addressType === 'OTHER'}
                        onChange={() =>
                          formik.setFieldValue('addressType', 'OTHER')
                        }
                        value="OTHER"
                        size="small"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'OTHER' }}
                        className="!p-0"
                      />
                      <p className="text-sm font-light tracking-wide">Other</p>
                    </span>
                  </div>
                  <div className="flex place-content-center py-4">
                    <Button
                      size="medium"
                      variant="contained"
                      className="bg-theme !tracking-wide text-white"
                      type="submit"
                      disabled={
                        formik.isSubmitting || !formik.isValid || isLoading
                      }
                      // onClick={handleDeliveryAddress}
                    >
                      {isLoading ? (
                        <CircularProgress size={16} />
                      ) : (
                        'Save and Deliver Here'
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      </Collapse>
    </div>
  )
}

export default AddNewAddress
