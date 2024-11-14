import { Button, Card, CardActionArea, CardMedia } from '@material-ui/core'
import { Add, DeleteOutlineSharp } from '@material-ui/icons'
import { useRef } from 'react'

const ImgUpload = ({ onChange, uri, onDelete, height }: any) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Card
        style={{
          width: '300px',
        }}
      >
        <CardActionArea
          onClick={() => (onChange ? inputRef?.current?.click() : {})}
        >
          <CardMedia
            image={
              uri || 'https://dummyimage.com/300x200&text=Upload%20New%20Image'
            }
            style={{
              width: '300px',
              height: height || 160,
            }}
          />
        </CardActionArea>
        {onDelete ? (
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
        )}
      </Card>
      <input ref={inputRef} hidden type="file" onChange={onChange} />
    </>
  )
}

export default ImgUpload
