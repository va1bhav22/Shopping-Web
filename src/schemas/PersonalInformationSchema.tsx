import * as Yup from 'yup'
export default () => [
  {
    key: '1',
    placeholder: 'Enter your name',
    name: 'name',
    label: 'Full Name',
    type: 'text',
    validationSchema: Yup.string()
      .required('required')
      .min(2, 'Name must be at least 2 characters'),
    initialValue: 'John Doe',
    required: true,
  },
  {
    key: '2',
    placeholder: 'Enter your email',
    name: 'email',
    label: 'Email Address',
    type: 'email',
    validationSchema: Yup.string()
      .required('Email is required')
      .email('Invalid Email Address'),
    initialValue: 'jhondoe@gmail.com',
    required: true,
  },
  {
    key: '3',
    placeholder: 'Enter your phone number',
    name: 'phone',
    label: 'Phone Number',
    type: 'text',
    validationSchema: Yup.string().required('Phone number is required'),
    initialValue: '+919373054469 ',
    required: true,
  },
  {
    key: '4',
    placeholder: '',
    name: 'gender',
    type: 'radio',
    validationSchema: Yup.string(),
    initialValue: 'MALE',
  },
]
