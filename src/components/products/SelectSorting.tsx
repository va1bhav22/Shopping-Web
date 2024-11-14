import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import * as React from 'react'

const categoryLists = [
  {
    value: 'popularity',
    label: 'Sort by popularity',
  },
  {
    value: 'latest',
    label: 'Sort by latest',
  },
  {
    value: 'high-to-low',
    label: 'Sort by price : high to low',
  },
  {
    value: 'low-to-high',
    label: 'Sort by price: low to high',
  },
  {
    value: 'default',
    label: 'Default',
  },
]

export default function SelectTextFields({
  onSortSelect,
}: {
  onSortSelect: Function
}) {
  const [sortBy, setSortBy] = React.useState('default')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value)
    onSortSelect(event.target.value)
  }

  return (
    <div className="">
      <TextField
        select
        value={sortBy}
        onChange={handleChange}
        className="w-60"
        InputProps={{
          classes: {
            root: ' ',
            notchedOutline: 'sorting-select-outline',
          },
        }}
      >
        {categoryLists.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            className="!tracking-wider"
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}
