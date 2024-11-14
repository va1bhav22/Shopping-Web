import { Upload } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { useRef } from 'react'
// import Swal from "sweetalert2";
type Props = {
  value?: any
  variant?: 'square' | 'rounded' | 'circular'
  onChange?: React.ChangeEventHandler<HTMLInputElement> | any
  height?: number
  width?: number
  dimensions?: number
}
const PhotoUpload = ({
  value,
  onChange,
  variant,
  height,
  width,
  dimensions,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleImageChange = async (e: any) => {
    try {
      const file = e?.target?.files?.[0]
      if (!file) return
      if (!dimensions) return onChange(e)
      // Swal.fire(
      //   "Invalid Dimensions",
      //   `Please use ${dimensions.width}x${dimensions.height} images`,
      //   "warning"
      // );
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Avatar
        variant={variant || 'square'}
        src={
          value?.target?.files[0]
            ? URL.createObjectURL(value?.target?.files[0])
            : value
        }
        sizes={''}
        sx={{
          height: height || 120,
          width: width || 120,
          cursor: 'pointer',
          backgroundColor: '#f15a24',
        }}
        onClick={() => inputRef.current?.click()}
      >
        <Upload />
      </Avatar>
      <input
        ref={inputRef}
        hidden
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
    </>
  )
}

export default PhotoUpload
