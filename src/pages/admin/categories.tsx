import MaterialTable from '@material-table/core'
import { Avatar, Chip, Paper } from '@mui/material'
import { post, put, remove } from 'api'
import SubCategories from 'components/admin/SubCategories'
import PhotoUpload from 'components/core/PhotoUpload'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import Swal from 'sweetalert2'
import { MuiTblOptions } from 'utils'

const categories = () => {
  const { data, mutate } = useSWRAPI(`categories`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const categories = data?.data?.data?.data

  return (
    <AdminLayout title="Admin | Manage Categories">
      <div className="m-auto px-4 py-4">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div className="text-lg font-bold text-[#f15a24]">
              Manage Categories
            </div>
          }
          isLoading={!data}
          data={
            categories === null
              ? []
              : categories?.map((category: any, i: number) => {
                  return {
                    ...category,
                    sl: i + 1,
                    timestamp: category?.createdAt
                      ? moment(category?.createdAt).format('LLL')
                      : 'Not available',
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
              title: 'Name',
              field: 'name',
              searchable: true,
            },
            {
              title: 'Description',
              field: 'description',
              searchable: true,
            },
            {
              title: 'Featured',
              field: 'isFeatured',
              editable: 'onUpdate',
              render: (rowData) => (
                <Chip
                  variant="filled"
                  label={rowData?.isFeatured ? 'Yes' : 'No'}
                  color={rowData?.isFeatured ? 'success' : 'secondary'}
                />
              ),
              searchable: true,
              lookup: { true: 'Yes', false: 'No' },
            },
            {
              title: 'Timestamp',
              field: 'timestamp',
              editable: 'never',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
            },
          ]}
          // editable={{
          //   onRowDelete: async(oldData: any) =>console.log(oldData),

          // }}
          detailPanel={({ rowData }) => {
            return <SubCategories rowData={rowData} mutate={mutate} />
          }}
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
              formData.append('name', data.name)
              formData.append('description', data.description)
              data.isFeatured && formData.append('isFeatured', data.isFeatured)
              data?.imageURL &&
                formData.append('image', data?.imageURL?.target?.files[0])
              try {
                const response = await post({
                  path: '/category',
                  body: formData,
                  token: 'CGHAccessToken',
                  isImage: true,
                })
                console.log(data?.isFeatured)
                console.log(response)
                response?.status === 200
                  ? Swal.fire({
                      text: response?.message,
                      icon: 'success',
                    })
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
              formData.append('description', newData?.description)
              newData?.isFeatured &&
                formData.append('isFeatured', newData?.isFeatured)
              newData?.imageURL &&
                formData.append('image', newData?.imageURL?.target?.files[0])

              try {
                const response = await put({
                  path: `category/${oldData._id}`,
                  body: formData,
                  token: 'CGHAccessToken',
                  isImage: true,
                })

                response?.status === 200
                  ? Swal.fire({
                      text: response?.message,
                      icon: 'success',
                    })
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
                      path: `category/${oldData?._id}`,
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

export default withAdmin(categories)
