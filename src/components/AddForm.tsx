import {
  Card,
  CardContent,
  Container,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PhotoUpload from './core/PhotoUpload'
import { useState } from 'react'
import MaterialTable from '@material-table/core'
import { mutate } from 'swr'
// import useState from 'react'
const data = [
  {
    image: 'hduqwuihduiqhidwuqh',
    name: 'Item 1',
    description: 'Description 1',
  },
  {
    image: 'hduqwuihduiqhidwuqh',
    name: 'Item 2',
    description: 'Description 2',
  },
  {
    image: 'hduqwuihduiqhidwuqh',
    name: 'Item 3',
    description: 'Description 3',
  },
]

const ADDForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [photoValue, setPhotoValue] = useState<any>('')
  const columns = [
    { title: 'Image', field: 'image' },
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
  ]
  const initialValues = {
    username: '',
    description: '',
  }

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "It's too short")
      .required('Please enter your name'),
    description: Yup.string().required('Required'),
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //   console.log('main-values=====>', values?.username)
      //   console.log('photos-value====>', photoValue?.target?.files[0])
      // const obj = {
      //   title: values.username,
      //   message: values.description,
      //   imageUrl: photoValue?.target?.files[0],
      // }
      // console.log(obj)
      // const resData = await mutate({
      //   path: 'jjjj',
      //   method: 'POST',
      //   body: JSON.stringify({
      //     couponId: {
      //       title: values?.username,
      //       message: values?.description,
      //       imageUrl: photoValue?.target?.files[0],
      //     },
      //   }),
      // })
    },
  })

  return (
    <section>
      <Container>
        <Card className="m-auto w-full !shadow-xl">
          <CardContent>
            <section>
              <div className="rounded bg-white p-4 shadow">
                <section className="relative flex w-full flex-col items-center justify-center">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="w-full rounded-md bg-white p-10"
                  >
                    <div className="mt-4 flex justify-center text-center">
                      <PhotoUpload
                        variant="square"
                        value={photoValue}
                        onChange={setPhotoValue}
                        width={450}
                        height={150}
                      />
                    </div>
                    <div className="mb-4 mt-5 flex items-center justify-start border border-gray-300 p-1">
                      <TextField
                        fullWidth
                        type="text"
                        name="username"
                        id="outlined-basic"
                        placeholder="Name"
                        variant="outlined"
                        InputProps={{
                          classes: {
                            root: ' ',
                            notchedOutline: 'login-notched-outline',
                            input: 'mui-textfield-input',
                          },
                        }}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username && formik.errors.username
                        }
                      />
                    </div>
                    <div className="mb-4 flex items-center justify-start border border-gray-300 p-1">
                      <TextField
                        fullWidth
                        rows={9}
                        placeholder="Description"
                        name="description"
                        id="outlined-basic"
                        variant="outlined"
                        InputProps={{
                          classes: {
                            root: ' ',
                            notchedOutline: 'login-notched-outline',
                            input: 'mui-textfield-input',
                          },
                        }}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.description &&
                          Boolean(formik.errors.description)
                        }
                        helperText={
                          formik.touched.description &&
                          formik.errors.description
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="contained"
                      className="discount-card  relative mt-4 w-full overflow-hidden rounded-xl bg-theme py-3 text-sm text-white hover:bg-theme"
                      disabled={isLoading}
                    >
                      {isLoading ? <CircularProgress size={16} /> : 'Add'}
                    </Button>
                  </form>
                </section>
              </div>
            </section>
          </CardContent>
        </Card>
      </Container>
      <div className="maincontainer">
        <MaterialTable title="Table" columns={columns} data={data} />
      </div>
    </section>
  )
}

export default ADDForm
