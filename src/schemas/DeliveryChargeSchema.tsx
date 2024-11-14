import * as Yup from 'yup'

const DeliveryChargeSchema = [
  {
    key: '3',
    label: 'Set Delivery Charge In Rupee ',
    name: 'deliveryCharge',
    type: 'number',
    validationSchema: Yup.number().required('Delivery Charge Is Required'),
    initialValue: '',
  },
]
export default DeliveryChargeSchema
