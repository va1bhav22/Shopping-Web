import MaterialTable from '@material-table/core'
import { Avatar, Paper } from '@mui/material'
import { post, put, remove } from 'api'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import { MuiTblOptions } from 'utils'

import PhotoUpload from 'components/core/PhotoUpload'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import Swal from 'sweetalert2'

const blogs = () => {
  const { data, mutate } = useSWRAPI('blogs', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const blogs = data?.data?.data?.data
  return (
    <AdminLayout title="Admin | Manage Blogs">
      <div className="m-auto px-4 py-4">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div className="text-lg font-bold text-theme">Manage Blogs</div>
          }
          isLoading={!data}
          data={
            blogs === null
              ? []
              : blogs?.map((news: any, i: number) => {
                  return {
                    ...news,
                    sl: i + 1,
                    timestamp: news?.createdAt
                      ? moment(news?.createdAt).format('LLL')
                      : 'Not available',
                  }
                })
          }
          options={MuiTblOptions()}
          columns={[
            {
              title: '#',
              field: 'id',
              editable: 'never',
              width: '2%',
            },
            {
              title: 'Image',
              field: 'imageURL',
              export: false,
              render: (rowData) => (
                <Avatar
                  src={rowData.imageURL}
                  variant="square"
                  sx={{ width: 120, height: 70 }}
                />
              ),
              editComponent: ({ value, onChange }) => {
                return (
                  <>
                    <PhotoUpload value={value} onChange={onChange} />
                  </>
                )
              },
            },
            {
              title: 'Title',
              field: 'title',
              searchable: true,
              validate: (value) => {
                if (
                  value?.title?.length <= 0 ||
                  value?.title?.length === undefined ||
                  value?.title?.length === null
                ) {
                  return 'Required'
                }
                return true
              },
            },

            {
              title: 'Description',
              field: 'info',
              searchable: true,
            },
            // {
            //   title: 'Link',
            //   field: 'link',
            //   searchable: true,
            // },
            {
              title: 'Timestamp',
              field: 'timestamp',
              editable: 'never',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
            },
          ]}
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => mutate(),
            },
          ]}
          editable={{
            onRowAdd: async (data) => {
              const formData = new FormData()
              formData.append('title', data?.title)
              formData.append('info', data?.info)
              // formData.append('link', data?.link)
              data?.imageURL &&
                formData.append('image', data?.imageURL?.target?.files[0])
              try {
                const response = await post({
                  path: '/blog',
                  body: formData,
                  token: 'CGHAccessToken',
                  isImage: true,
                })
                response?.status === 200
                  ? Swal.fire({ text: response?.message, icon: 'success' })
                  : Swal.fire({ text: response?.error, icon: 'error' })
              } catch (error) {
                console.log(error)
              } finally {
                mutate()
              }
            },
            onRowUpdate: async (newData, oldData) => {
              const formData = new FormData()
              formData.append('name', newData?.name)
              formData.append('info', newData?.info)
              // formData.append('link', newData?.link)
              newData?.imageURL &&
                formData.append('image', newData?.imageURL?.target?.files[0])

              try {
                const response = await put({
                  path: `blog/${oldData?._id}`,
                  body: formData,
                  token: 'CGHAccessToken',
                  isImage: true,
                })
                response?.status === 200
                  ? Swal.fire({ text: response?.message, icon: 'success' })
                  : Swal.fire({ text: response?.error, icon: 'error' })
              } catch (error) {
                console.log(error)
              } finally {
                mutate()
              }
            },
            onRowDelete: async (oldData) => {
              try {
                Swal.fire({
                  title: 'Are you sure?',
                  text: 'You will not be able to recover it again!',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!',
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    const response = await remove({
                      path: `blog/${oldData?._id}`,
                      token: 'CGHAccessToken',
                    })

                    response?.status === 200
                      ? Swal.fire({
                          text: response?.message,
                          icon: 'success',
                        })
                      : Swal.fire({ text: response?.error, icon: 'error' })
                    mutate()
                  }
                })
              } catch (error) {
                console.log(error)
              }
            },
          }}
        />
      </div>
    </AdminLayout>
  )
}

export default withAdmin(blogs)
