import { Card } from '@material-ui/core'
import { Add, DeleteOutlineSharp } from '@material-ui/icons'
import { LoadingButton } from '@mui/lab'
import { Avatar } from '@mui/material'
import React, { useRef } from 'react'
type Props = {
  value?: any
  onChange?: React.ChangeEventHandler<HTMLInputElement> | any
  height?: number
  width?: number
  uri?: string
  onDelete?: any
}
const ImgUpload = ({ onChange, uri, onDelete, height, width }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <Card
        style={{
          width: '300px',
        }}
      >
        <div>
          {' '}
          <Avatar
            variant="rounded"
            onClick={() => (onChange ? inputRef.current?.click() : {})}
            src={
              uri || 'https://dummyimage.com/300x200&text=Upload%20New%20Image'
            }
            style={{
              width: width || '300px',
              height: height || 160,
            }}
          />
        </div>
        {onDelete ? (
          // <DeleteOutlineSharp
          //   style={{
          //     position: 'absolute',
          //     top: 0,
          //     right: 0,
          //     cursor: 'pointer',
          //   }}
          //   onClick={onDelete}
          // />
          <LoadingButton
            className="w-full !bg-red-500 !p-2 !text-center !text-white"
            onClick={onDelete}
            startIcon={<DeleteOutlineSharp />}
          >
            Delete Picture
          </LoadingButton>
        ) : (
          <LoadingButton
            className="w-full !bg-green-500 !p-2 !text-center !text-white"
            onClick={() => (onChange ? inputRef.current?.click() : {})}
            startIcon={<Add />}
          >
            Add Picture
          </LoadingButton>
        )}
        {/* {onDelete ? (
          <Button
            endIcon={<DeleteOutlineSharp />}
            color="secondary"
            fullWidth
            onClick={onDelete}
          >
            Delete Picture
          </Button>
        ) : (
          <Button
            startIcon={<Add />}
            color="primary"
            fullWidth
            onClick={() => (onChange ? inputRef.current?.click() : {})}
          >
            Add Picture
          </Button>
        )} */}
        <input ref={inputRef} hidden type="file" onChange={onChange} />
      </Card>
    </>
  )
}

export default ImgUpload
