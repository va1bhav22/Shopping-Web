import * as Yup from 'yup'

const AppUpdateSchema = [
  {
    key: '3',
    label: 'App Version',
    name: 'version',
    type: 'number',
    validationSchema: Yup.number().required('Version is Required'),
    initialValue: '',
  },
  {
    key: '1',
    label: 'App Update Title',
    name: 'title',
    validationSchema: Yup.string()
      .required('Title is Required')
      .max(50, 'Title must be less than 50 characters'),
    initialValue: '',
  },
  {
    key: '2',
    label: 'App Update Description',
    name: 'message',
    multiline: true,
    rows: 4,
    validationSchema: Yup.string()
      .required('Description is Required')
      .max(350, 'Description must be less than 350 characters')
      .min(5, 'Description must be greater than 5 characters'),
    initialValue: '',
  },
  {
    key: '11',
    label: 'Dismissible',
    validationSchema: Yup.string().required('This field is Required'),
    name: 'isDismissible',
    // validationSchema: Yup.number().required("Requested Credit is Required"),
    initialValue: '',
    type: 'select',
    options: [
      {
        dismiss: 'Yes',
        value: true,
        key: '1',
      },
      {
        dismiss: 'No',
        value: false,
        key: '2',
      },
    ],
  },
]
export default AppUpdateSchema
