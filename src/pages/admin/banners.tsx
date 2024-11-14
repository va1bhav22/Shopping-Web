import MaterialTable from '@material-table/core'
import { Avatar, Paper } from '@mui/material'
import { post, put, remove } from 'api'
import PhotoUpload from 'components/core/PhotoUpload'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import Swal from 'sweetalert2'
import { MuiTblOptions } from 'utils'

const banners = () => {
  const { data, mutate } = useSWRAPI('banners', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })

  const banners = data?.data?.data?.data

  return (
    <AdminLayout title="Admin | Manage Banners">
      <div className="m-auto px-4 py-4">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div className="text-lg font-bold text-[#f15a24]">
              Manage Banners
            </div>
          }
          isLoading={!data}
          data={
            banners === null
              ? []
              : banners?.map((news: any, i: number) => {
                  return {
                    ...news,
                    sl: i + 1,
                    screenName: news?.data?.screen,
                    timestamp: news?.createdAt
                      ? moment(news?.createdAt).format('LLL')
                      : 'Not available',
                    screenId: news?.data?.id,
                  }
                })
          }
          options={MuiTblOptions()}
          columns={[
            {
              title: '#',
              field: 'sl',
              editable: 'never',
              width: '2%',
            },
            {
              export: false,
              title: 'Image',
              field: 'imageURL',
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
              field: 'description',
              searchable: true,
              validate: (value) => {
                if (
                  value?.description?.length <= 0 ||
                  value?.description?.length === undefined ||
                  value?.description?.length === null
                ) {
                  return 'Required'
                }
                return true
              },
            },
            {
              title: 'Link',
              field: 'link',
              searchable: true,
              emptyValue: '--',
              render: ({ link }) => (!link ? '--' : link),
            },
            {
              title: 'Type',
              field: 'type',
              searchable: true,
              lookup: {
                HEADER: 'HEADER',
                'APP-OFFER-BANNER': 'APP-OFFER-BANNER',
              },
              validate: (value) => {
                if (
                  value?.type?.length <= 0 ||
                  value?.type?.length === undefined ||
                  value?.type?.length === null
                ) {
                  return 'Required'
                }
                return true
              },
            },
            // {
            //   title: 'Screen Name',
            //   field: 'screenName',
            //   searchable: true,
            // },
            // {
            //   title: 'ID',
            //   field: 'screenId',
            //   searchable: true,
            // },
            {
              title: 'Timestamp',
              editable: 'never',
              field: 'timestamp',
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
              formData.append('link', data?.link)
              formData.append('description', data?.description)
              data?.imageURL &&
                formData.append('image', data?.imageURL?.target?.files[0])
              formData.append('type', data?.type)
              formData.append('dataScreen', data?.screenName)
              formData.append('dataId', data?.screenId)

              try {
                const response = await post({
                  path: '/banner',
                  body: formData,
                  isImage: true,
                  token: 'CGHAccessToken',
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
              formData.append('link', newData?.link)
              formData.append('description', newData?.description)
              formData.append('type', newData?.type)
              formData.append('dataScreen', newData?.screenName)
              formData.append('dataId', newData?.screenId)
              newData?.imageURL &&
                formData.append('image', newData?.imageURL?.target?.files[0])

              try {
                const response = await put({
                  path: `banner/${oldData._id}`,
                  body: formData,
                  isImage: true,
                  token: 'CGHAccessToken',
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
                      path: `banner/${oldData?._id}`,
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

export default withAdmin(banners)
