import MaterialTable from '@material-table/core'
import { ExportCsv, ExportPdf } from '@material-table/exporters'
import { Avatar, Paper } from '@mui/material'
import { post, put, remove } from 'api'
import PhotoUpload from 'components/core/PhotoUpload'
import useSWRAPI from 'hooks/useSWRAPI'
import moment from 'moment'
import Swal from 'sweetalert2'

const SubCategories = ({ rowData }: any) => {
  const { data, mutate } = useSWRAPI(
    `/categories?parentCategory=${rowData?._id}`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true, // If false, undefined data gets cached against the key.
      dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
    }
  )
  console.log(data)
  const subcategories = data?.data?.data?.data
  console.log(subcategories)

  return (
    <div className="m-auto px-4 py-4">
      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} elevation={5} />,
        }}
        title={
          <div className="text-lg font-bold text-theme">{`Subcategories of ${rowData?.name}`}</div>
        }
        isLoading={!data}
        data={
          subcategories === null
            ? []
            : subcategories?.map((subcategory: any, i: number) => {
                return {
                  ...subcategory,
                  sl: i + 1,
                }
              })
        }
        options={{
          headerStyle: {
            fontWeight: 'bold',
          },
          addRowPosition: 'first',
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: 'Export PDF',
              exportFunc: (cols, datas) => ExportPdf(cols, datas, 'All Data'),
            },
            {
              label: 'Export CSV',
              exportFunc: (cols, datas) => ExportCsv(cols, datas, 'All Data'),
            },
          ],
        }}
        columns={[
          {
            title: '#',
            field: 'sl',
            editable: 'never',
            width: '2%',
          },
          {
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
            title: 'Timestamp',
            field: 'createdAt',
            editable: 'never',
            render: ({ createdAt }) =>
              moment(new Date(createdAt)).format('LLL'),
          },
        ]}
        // editable={{
        //   onRowDelete: async(oldData: any) =>console.log(oldData),

        // }}

        actions={
          [
            // {
            //   icon: "add",
            //   tooltip: 'Add Store',
            //   isFreeAction: true,
            //   onClick: (event, rowData) => {
            //     setOpenAddStoreDrawer(true)
            //   }
            // }
          ]
        }
        editable={{
          onRowAdd: async (data) => {
            const formData = new FormData()
            formData.append('name', data?.name)
            formData.append('description', data?.description)
            formData.append('parentCategory', rowData?._id)
            data?.imageURL &&
              formData.append('image', data?.imageURL?.target?.files[0])
            try {
              const response = await post({
                path: '/category',
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
          onRowUpdate: async (newData: any, oldData: any) => {
            const formData = new FormData()
            formData.append('name', newData?.name)
            formData.append('description', newData?.description)
            newData?.imageURL &&
              formData.append('image', newData?.imageURL?.target?.files[0])

            try {
              const response = await put({
                path: `/category/${oldData?._id}`,
                body: formData,
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
  )
}

export default SubCategories
