import useSWRAPI from 'hooks/useSWRAPI'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
const AddProductSchema = [
  {
    key: '1',
    // placeholder: 'Enter your name',
    name: 'title',
    label: 'Title *',
    type: 'text',
    validationSchema: Yup.string()
      .required('Product Title required')
      .min(3, 'Product title must be at least 3 characters')
      .max(50, 'Product title not be more than 50 characters'),
    initialValue: '',
    required: true,
  },
  // {
  //   key: '2',
  //   // placeholder: 'Enter your email',
  //   name: 'category',
  //   label: 'Category',
  //   type: 'select',
  //   validationSchema: Yup.string().required('Category is required'),
  //   options: [
  //     {
  //       category: 'Electronics',
  //       value: 'Electronics',
  //       key: '1',
  //     },
  //     {
  //       category: 'Fashion',
  //       value: 'Fashion',
  //       key: '2',
  //     },
  //   ],
  //   initialValue: '',
  //   required: true,
  // },
  // {
  //   key: '3',
  //   name: 'shortDescription',
  //   label: 'Short Description',
  //   type: 'text',
  //   validationSchema: Yup.string().required('Short description is required'),
  //   initialValue: '',
  //   required: true,
  // },

  // {
  //   key: '5',
  //   name: 'mrp',
  //   label: 'MRP',
  //   type: 'number',
  //   validationSchema: Yup.number().required('MRP is required'),
  //   initialValue: '',
  //   required: true,
  // },
  // {
  //   key: '6',
  //   name: 'salePrice',
  //   label: 'Sale Price',
  //   type: 'number',
  //   validationSchema: Yup.number().required('Sale Price is required'),
  //   initialValue: '',
  //   required: true,
  // },
  // {
  //   key: '7',
  //   name: 'measureType',
  //   label: 'Measure Type',
  //   type: 'text',
  //   validationSchema: Yup.string().required('Measure Type is required'),
  //   initialValue: '',
  //   required: true,
  // },
  // {
  //   key: '8',
  //   name: 'measureUnit',
  //   label: 'Measure Unit',
  //   type: 'text',
  //   validationSchema: Yup.string().required('Measure Unit is required'),
  //   initialValue: '',
  //   required: true,
  // },
  // {
  //   key: '9',
  //   name: 'stock',
  //   label: 'Stock',
  //   type: 'text',
  //   validationSchema: Yup.string().required('Stock is required'),
  //   initialValue: '',
  //   required: true,
  // },
]
export const useAddProductSchema = () => {
  const [addProductSchema, setAddProductSchema] = useState<any>([])
  const { data } = useSWRAPI(`categories`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const categories = data?.data?.data?.data

  // const { drivers } = useDrivers();
  useEffect(() => {
    if (categories) {
      setAddProductSchema([
        ...AddProductSchema,
        {
          key: '2',
          // placeholder: 'Enter your email',
          name: 'category',
          label: 'Category',
          type: 'select',
          validationSchema: Yup.string().required('Category is required'),
          options:
            categories === null
              ? []
              : categories?.map((item: any) => ({
                  category: item?.name,
                  value: item?._id,
                  key: item?._id,
                })),
          initialValue: '',
          required: true,
        },
        {
          key: '3',
          name: 'shortDescription',
          label: 'Short Description *',
          type: 'text',
          validationSchema: Yup.string()
            .required('Short description is required')
            .min(8, 'Short Description must be greater than 8 characters')
            .max(100, 'Short Description not be more than 100 characters'),
          initialValue: '',
          required: true,
        },
        {
          key: '3.1',
          name: 'description',
          label: 'Description *',
          type: 'text',
          validationSchema: Yup.string()
            .required('Description is required')
            .min(11, 'Description must be greater than 11 characters')
            .max(501, 'Long Description not be more than 501 characters'),

          initialValue: '',
          required: true,
          multiline: true,
          rows: 4,
        },
        {
          key: '4',
          name: 'measureType',
          label: 'Measure Type ',
          type: 'select',
          validationSchema: Yup.string().required('Measure Type is required'),
          options: [
            {
              category: 'Kg',
              value: 'kg',
              key: '4.1',
            },
            {
              category: 'Gm',
              value: 'gm',
              key: '4.2',
            },
            {
              category: 'Ltr',
              value: 'ltr',
              key: '4.3',
            },
            {
              category: 'Ml',
              value: 'ml',
              key: '4.4',
            },
            // {
            //   category: 'Pc',
            //   value: 'pc',
            //   key: '4.5',
            // },
            {
              category: 'Size',
              value: 'size',
              key: '4.5ss',
            },
            {
              category: 'Color',
              value: 'color',
              key: '4.6',
            },
          ],
          initialValue: '',
          required: true,
        },
        {
          key: '8',
          name: 'measureUnit',
          label: 'Measure Unit *',
          type: 'text',
          validationSchema: Yup.string().required('Measure Unit is required'),
          initialValue: '',
          required: true,
        },
        {
          key: '5',
          name: 'mrp',
          label: 'MRP *',
          type: 'number',
          validationSchema: Yup.number().required('MRP is required'),
          initialValue: '',
          required: true,
        },
        {
          key: '6i',
          name: 'salePrice',
          label: 'Sale Price *',
          type: 'number',
          validationSchema: Yup.number().required('Sale Price is required'),
          initialValue: '',
          required: true,
        },
        {
          key: '6',
          name: 'moq',
          label: 'Minimum Order Quantity',
          type: 'number',
          validationSchema: Yup.number().required(
            'Minimum Order Quantity is required'
          ),
          initialValue: '',
          required: true,
          hidden: true,
        },
        {
          key: '6k',
          name: 'isFeatured',
          label: 'Featured',
          type: 'select',
          validationSchema: Yup.string().required('Featured is required'),
          initialValue: '',
          required: true,
          options: [
            {
              category: 'Yes',
              value: true,
              key: '4.1',
            },
            {
              category: 'No',
              value: false,
              key: '4.2',
            },
          ],
        },
        {
          key: '9',
          name: 'stock',
          label: 'Stock *',
          type: 'text',
          validationSchema: Yup.string().required('Stock is required'),
          initialValue: '',
          required: true,
        },
      ])
    } else {
      setAddProductSchema(AddProductSchema)
    }
  }, [categories])
  return { addProductSchema }
}
export default AddProductSchema
