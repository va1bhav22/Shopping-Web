import { Cancel, Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { post } from 'api'
import { TextInput } from 'components/core'
// import { BASE_URL } from "configs";
import { Form, Formik } from 'formik'
import { MessageSchema } from 'schemas'
import Swal from 'sweetalert2'
// import Swal from "sweetalert2";
import * as Yup from 'yup'
type Props = {
  selectedUsers?: any
  handleClose: () => void
}
const SendNotification = ({ selectedUsers, handleClose }: Props) => {
  // console.log(selectedUsers?.email);
  const initialValues = MessageSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue
    return accumulator
  }, {} as { [key: string]: string })
  const validationSchema = MessageSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema
    return accumulator
  }, {} as { [key: string]: Yup.StringSchema })
  const handleSendReply = async (
    values: { [key: string]: string },
    submitProps: any
  ) => {
    try {
      const response = await post({
        path: '/mail-notification',
        body: JSON.stringify({
          to: selectedUsers?.email,
          ...values,
        }),
        token: 'CGHAccessToken',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response?.status === 200) {
        handleClose()
        Swal.fire({ text: response?.message, icon: 'success' })
      } else {
        Swal.fire({ text: response?.error, icon: 'error' })
      }
    } catch (error) {
      console.log(error)
    } finally {
      submitProps.setSubmitting(false)
      submitProps?.resetForm()
    }
  }
  return (
    <>
      <Dialog
        open={Boolean(selectedUsers?.email)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSendReply}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <DialogTitle>Send Notification</DialogTitle>
              <DialogContent dividers>
                {MessageSchema.map((inputItem) => (
                  <TextInput
                    key={inputItem.key}
                    name={inputItem?.name}
                    label={inputItem?.label}
                    multiline={inputItem?.multiline}
                    rows={inputItem?.rows}
                  />
                ))}
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleClose}
                  color="error"
                >
                  Close
                </Button>
                <LoadingButton
                  variant="contained"
                  startIcon={<Send />}
                  disabled={!isValid}
                  loading={isSubmitting}
                  color="success"
                  className="btn-background !bg-theme"
                  type="submit"
                >
                  Send
                </LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  )
}

export default SendNotification
