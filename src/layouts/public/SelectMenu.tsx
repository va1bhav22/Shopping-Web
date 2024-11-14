import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import useSWRAPI from 'hooks/useSWRAPI'
import CategoryType from 'types/category'

const categoryLists = [
  {
    value: 'Select Category',
    label: 'Select Category',
  },
  {
    value: 'Ayush Products',
    label: 'Ayush Products',
  },
  {
    value: 'Gourmet Foods',
    label: 'Gourmet Foods',
  },
  {
    value: 'Personal Care',
    label: 'Personal Care',
  },
  {
    value: 'Home Care',
    label: 'Home Care',
  },
  {
    value: 'Sweets',
    label: 'Sweets',
  },
]

export default function SelectTextFields() {
  const { data, isValidating } = useSWRAPI('categories')
  // if (isValidating && !data) return <div>Loading...</div>
  // if (!data) return null
  const [category, setCategory] = React.useState('ALL')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value)
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '15ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          select
          value={category}
          defaultValue="Select Category"
          onChange={handleChange}
          className=""
          InputProps={{
            classes: {
              root: ' ',
              notchedOutline: 'notched-outline',
              input: 'form-textfield',
            },
          }}
        >
          <MenuItem value="ALL">Select Category</MenuItem>
          {data?.data?.data?.data?.map((option: CategoryType) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  )
}
