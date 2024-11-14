import * as Yup from 'yup'
const AddStoreSchema = [
  {
    key: '1',
    // placeholder: 'Enter your name',
    name: 'displayName',
    label: 'Store Name',
    type: 'text',
    validationSchema: Yup.string()
      .required(' Store Name required')
      .min(2, 'Store name must be at least 2 characters'),
    initialValue: '',
    required: true,
  },
  {
    key: '2',
    // placeholder: 'Enter your email',
    name: 'email',
    label: 'Email',
    type: 'email',
    validationSchema: Yup.string()
      .required('Email is required')
      .email('Invalid Email Address'),
    initialValue: '',
    required: true,
  },
  {
    key: '3',
    // placeholder: 'Enter your phone number',
    name: 'phoneNumber',
    label: 'Contact Number',
    type: 'number',
    validationSchema: Yup.string().required('Store contact number is required'),
    initialValue: '',
    required: true,
  },
]
export default AddStoreSchema
