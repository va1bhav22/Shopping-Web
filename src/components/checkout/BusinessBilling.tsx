import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { CircularProgress, Dialog } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { camera } from 'assets/business'
import { useAuth, useIsMounted } from 'hooks'
import useAuthFetch from 'hooks/useAuthFetch'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'

const BusinessBilling = ({}: any) => {
  const [radioValue, setRadioValue] = React.useState('I want GST invoice')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value)
  }

  return (
    <section>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={radioValue}
        onChange={handleChange}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FormControlLabel
          value="I don't have GST"
          control={<Radio />}
          label="I don't have GST"
        />
        <FormControlLabel
          value="I want GST invoice"
          control={<Radio />}
          label="I want GST invoice"
        />
      </RadioGroup>
      <div className="w-full">
        {radioValue === 'I want GST invoice' ? (
          <GSTNumberSection />
        ) : (
          <GSTDocSection />
        )}
      </div>
    </section>
  )
}

const GSTDocSection = () => {
  const { user, getUser } = useAuth()
  const [isShowDialog, setIsShowDialog] = React.useState(false)
  const [selectedDocumentValue, setSelectedDocumentValue] = React.useState(
    user?.GSTDocType || 'Choose Document'
  )
  const [uploadImg, setUploadImg] = React.useState<any>(null)

  const handleDocumentTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedDocumentValue(event.target.value)
  }
  const { isLoading, mutate } = useAuthFetch()
  const handleUploadDocumentClick = async () => {
    console.log({ uploadImg, selectedDocumentValue })
    const formData = new FormData()
    formData.append('GSTDoc', uploadImg)
    formData.append('GSTDocType', selectedDocumentValue)
    const resData = await mutate({
      path: 'user/account',
      method: 'PUT',
      body: formData,
      isFormData: true,
    })
    console.log({ resData })
    if (resData?.error) {
      Swal.fire({
        title: 'Oops...',
        icon: 'success',
        text: resData?.error,
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      })
      return
    }
    Swal.fire({
      title: 'Your Document Has Been Received Successfully',
      icon: 'success',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
    })
    getUser()
  }
  return (
    <div>
      <p className="text-sm tracking-wide text-gray-500">
        Please provide one Document for verification
      </p>
      <div className="flex items-start justify-between gap-2">
        {/* //! Add Document Type Dropdown */}
        <div className="mt-4 w-full">
          <div
            className="flex w-3/4 cursor-pointer items-center justify-between border border-gray-500 p-3"
            onClick={() => setIsShowDialog(true)}
          >
            {selectedDocumentValue ? selectedDocumentValue : 'Choose Document'}{' '}
            <ExpandMoreIcon />
          </div>
          <Dialog open={isShowDialog}>
            <div className="w-80 p-6">
              <p className="text-sm tracking-wider text-gray-500">
                Chose Document Type
              </p>
              <div className="flex flex-col">
                <span className="flex items-center gap-1 border-b border-gray-200 py-4">
                  <Radio
                    checked={selectedDocumentValue === 'Bill Book'}
                    onChange={handleDocumentTypeChange}
                    value="Bill Book"
                    size="small"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                    className="!p-0"
                  />
                  <p className="">Bill Book</p>
                </span>

                <span className="flex items-center gap-1 border-b border-gray-200 py-4">
                  <Radio
                    checked={selectedDocumentValue === 'Visiting Card'}
                    onChange={handleDocumentTypeChange}
                    value="Visiting Card"
                    size="small"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'B' }}
                    className="!p-0"
                  />
                  <p className="">Visiting Card</p>
                </span>

                <span className=" flex items-center gap-1 border-b border-gray-200 py-4">
                  <Radio
                    checked={selectedDocumentValue === 'Shop Photo'}
                    onChange={handleDocumentTypeChange}
                    value="Shop Photo"
                    size="small"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'C' }}
                    className="!p-0"
                  />
                  <p className="">Shop Photo</p>
                </span>

                <div className="mt-4 flex justify-between">
                  <button
                    className="text-lg text-red-500"
                    onClick={() => {
                      setSelectedDocumentValue('')
                      setIsShowDialog(false)
                      setUploadImg(null)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-lg text-blue-500"
                    onClick={() => {
                      setSelectedDocumentValue(selectedDocumentValue)
                      selectedDocumentValue === 'Choose Document'
                        ? Swal.fire({
                            title: 'Please Select Document Type',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                          })
                        : setIsShowDialog(false)
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
        {/* //! Add Upload Image */}
        <div className="flex w-full justify-end">
          <div className="relative flex w-1/2 cursor-pointer flex-col items-center border border-gray-500">
            <input
              type={!selectedDocumentValue ? 'text' : 'file'}
              className="absolute top-0 right-0 z-10 h-full w-full cursor-pointer opacity-0"
              onClick={(e: any) => {
                e.target.type === 'text' &&
                  Swal.fire({
                    title: 'Please Select Document Type',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                  })
              }}
              onChange={(e: any) => setUploadImg(e.target.files[0])}
            />
            <div className="flex h-32 w-full items-center justify-center">
              <img
                src={
                  uploadImg
                    ? URL.createObjectURL(uploadImg)
                    : user?.GSTDoc || camera.src
                }
                alt={uploadImg || user?.GSTDoc ? 'uploaded-document' : 'camera'}
                className={`h-full w-full object-contain ${
                  uploadImg || user?.GSTDoc ? 'h-full w-full' : 'w-8'
                }`}
              />
            </div>
            <div className="TRACKING-WIDE flex w-full justify-center bg-theme py-2 text-white">
              Upload Photo
            </div>
          </div>
        </div>
      </div>
      <span className="mt-8 flex items-center gap-2 bg-red-100 px-4 py-8 text-xs tracking-wider text-red-500">
        <InfoOutlinedIcon />
        You must provide atleast one verification document or valid GST No. to
        successfully place the order. This is only one time process.
      </span>
      <div className="mt-4 flex justify-end border-t border-gray-200 pt-4 ">
        <button
          className="discount-card relative overflow-hidden rounded bg-theme px-8 py-3 text-white"
          // onClick={handleGstBillingClick}
          onClick={handleUploadDocumentClick}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={16} /> : 'Continue'}
        </button>
      </div>
    </div>
  )
}
const GSTNumberSection = () => {
  const { user, getUser } = useAuth()
  const [GSTNumber, setGSTNumber] = React.useState(user?.GSTNumber || '')
  const [isInputTouched, setIsInputTouched] = React.useState(false)
  const { isLoading, mutate } = useAuthFetch()
  const IsMounted = useIsMounted()
  const handleGstBillingClick = async () => {
    const resData = await mutate({
      path: '/user/account',
      method: 'PUT',
      body: JSON.stringify({
        GSTNumber,
      }),
    })
    if (resData?.error) {
      Swal.fire({
        title: 'Oops...',
        icon: 'success',
        text: resData?.error,
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      })
      return
    }
    Swal.fire({
      title: 'Your GST No Has Been Received Successfully',
      icon: 'success',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
    })
    getUser()
    setIsInputTouched(false)
  }
  useEffect(() => {
    setGSTNumber(user?.GSTNumber || '')
  }, [user])

  return (
    //! Add GST invoice upload functionality
    <div className="mt-4 flex w-full flex-col items-center">
      <input
        type="text"
        maxLength={15}
        placeholder="Enter Your GST Number"
        value={GSTNumber}
        onChange={(e) => setGSTNumber(e.target.value)}
        onBlur={() => setIsInputTouched(true)}
        className={`m-1 w-3/4 rounded border   p-2 focus:outline-none ${
          isInputTouched && !GSTNumber ? 'border-red-500' : 'border-gray-500'
        }`}
      />
      {isInputTouched && !GSTNumber && (
        <small className="w-3/4 py-2 text-red-500"> *Required </small>
      )}
      <p className="w-3/4 text-xs tracking-wider text-blue-500">
        *To get GST invoice and tax benefits, please provide your GST Number
        above.
      </p>
      <span className="mt-8 flex items-center gap-2 bg-red-100 px-4 py-8 text-xs tracking-wider text-red-500">
        <InfoOutlinedIcon />
        You must provide atleast one verification document or valid GST No. to
        successfully place the order. This is only one time process.
      </span>
      <div className="mt-4 flex justify-end border-t border-gray-200 pt-4 ">
        <button
          className="discount-card relative overflow-hidden rounded bg-theme px-8 py-3 text-white"
          // onClick={handleGstBillingClick}
          onClick={handleGstBillingClick}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={16} /> : 'Continue'}
        </button>
      </div>
    </div>
  )
}

export default BusinessBilling
