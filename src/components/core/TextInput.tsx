import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Field } from 'formik'
import { useState } from 'react'
type Props = {
  name?: string
  label?: string
  type?: string
  placeholder?: string
  className?: string
  startIcon?: React.ReactElement
  rows?: number
  multiline?: boolean
}

const TextInput = ({
  name,
  label,
  type,
  startIcon,
  rows,
  multiline,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const checkInputType = () => {
    if (type === 'password' && isVisible) return 'text'
    if (type === 'password' && !isVisible) return 'password'
    return type
  }
  return (
    <>
      <Field name={name}>
        {(props: any) => (
          <TextField
            fullWidth
            margin="normal"
            label={label}
            rows={rows}
            multiline={multiline}
            type={checkInputType()}
            error={Boolean(props.meta.touched && props.meta.error)}
            helperText={props.meta.touched && props.meta.error}
            {...props.field}
            InputProps={{
              startAdornment: startIcon ? (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ) : null,
              endAdornment:
                type === 'password' ? (
                  <InputAdornment
                    onClick={() => setIsVisible(!isVisible)}
                    position="start"
                  >
                    <IconButton>
                      {isVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ) : null,
            }}
          />
        )}
      </Field>
    </>
  )
}

export default TextInput
