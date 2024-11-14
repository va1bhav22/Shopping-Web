import * as Yup from 'yup'
export default () => [
  {
    key: '1',
    placeholder: 'Enter your name',
    name: 'name',
    type: 'text',
    validationSchema: Yup.string()
      .required('required')
      .min(2, 'Name must be at least 2 characters'),
    initialValue: '',
    required: true,
    isPhone: false,
  },
  {
    key: '2',
    placeholder: 'Enter your email',
    name: 'email',
    type: 'email',
    validationSchema: Yup.string()
      .required('Email is required')
      .email('Invalid Email Address'),
    initialValue: '',
    required: true,
    isPhone: false,
  },
  {
    key: '3',
    placeholder: 'Enter your phone number',
    name: 'phoneNumber',
    type: 'number',
    validationSchema: Yup.string()
      .required('phone number is required')
      .min(10, 'Phone number must be at least 10 characters'),

    initialValue: '',
    required: true,
    isPhone: true,
  },
  {
    key: '4',
    placeholder: 'Enter subject',
    name: 'subject',
    type: 'text',
    validationSchema: Yup.string().required('Subject field is required'),
    initialValue: '',
    required: true,
    isPhone: true,
  },

  {
    key: '5',
    placeholder: 'Message',
    name: 'message',
    type: 'text',
    multiline: true,
    validationSchema: Yup.string()
      .max(450, "message can't be more than 450 characters")
      .required('Please put some messages'),
    initialValue: '',
    required: true,
    isPhone: false,
  },
]
