import STATES from 'configs/states'
import * as Yup from 'yup'
const StoreAddressSchema = [
  {
    key: '1',
    label: 'Store Name',
    name: 'displayName',
    type: 'text',
    validationSchema: Yup.string()
      .required('required')
      .min(2, 'Name must be at least 2 characters'),
    initialValue: '',
    required: true,
    disabled: true,
    lg: 6,
  },
  {
    key: '2',
    label: 'Email',
    name: 'email',
    type: 'email',
    validationSchema: Yup.string()
      .required('required')
      .email('Invalid Email Address'),
    initialValue: '',
    required: true,
    lg: 6,
    disabled: true,
  },
  {
    key: '3',
    disabled: true,

    label: 'Phone Number',
    name: 'phoneNumber',
    type: 'number',
    validationSchema: Yup.number().required('required'),
    initialValue: '',
    required: true,
    lg: 6,
  },
  {
    key: '4',
    label: 'Pin Code',
    name: 'zip',
    type: 'number',
    validationSchema: Yup.number().required('required'),
    initialValue: '',
    required: true,
    lg: 6,
  },

  {
    key: '5',
    label: 'Street',
    name: 'street',
    type: 'text',
    multiline: true,
    // validationSchema: Yup.string()
    // .max(450, "Address can't be more than 450 characters")
    // .required('Street is required'),
    initialValue: '',
    // required: true,
    // rows: 3,
    lg: 12,
  },
  {
    key: '8',
    label: 'Landmark',
    name: 'landmark',
    type: 'text',
    // validationSchema: Yup.string().required('Landmark is required'),
    initialValue: '',
    // required: true,
    lg: 6,
  },

  {
    key: '6',
    label: 'City/District/Town',
    name: 'city',
    type: 'text',
    validationSchema: Yup.string().required('required'),
    initialValue: '',
    required: true,
    lg: 6,
  },
  {
    key: '7',
    label: 'Select your state',
    name: 'state',
    type: 'select',
    validationSchema: Yup.string().required('required'),
    initialValue: '',
    options: STATES.map((state) => ({
      key: state,
      value: state,
    })),
    required: true,
    lg: 6,
  },

  //   {
  //     key: '9',
  //     label: 'Alternate phone (Optional)',
  //     name: 'alternatePhone',
  //     type: 'text',
  //     validationSchema: Yup.string(),
  //     initialValue: '',
  //     // required: true,
  //     lg: 6,
  //   },
]
export default StoreAddressSchema
