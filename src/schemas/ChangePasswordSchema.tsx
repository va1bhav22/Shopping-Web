import { LockOutlined } from '@mui/icons-material'
import * as Yup from 'yup'
const ChangePasswordSchema = [
  {
    key: '1',
    label: 'Current Password',
    name: 'oldPassword',
    type: 'password',
    validationSchema: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Current Password is Required'),
    initialValue: '',
    startIcon: <LockOutlined />,
  },

  {
    key: '2',
    label: 'New Password',
    name: 'newPassword',
    type: 'password',
    validationSchema: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    initialValue: '',
    startIcon: <LockOutlined />,
  },
  {
    key: '3',
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
    validationSchema: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      "Passwords don't match"
    ),
    initialValue: '',
    startIcon: <LockOutlined />,
  },
]
export default ChangePasswordSchema
