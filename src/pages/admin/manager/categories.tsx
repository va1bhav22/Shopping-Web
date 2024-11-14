import MaterialTable from '@material-table/core'
import { Avatar, Chip, Paper } from '@mui/material'
import SubCategories from 'components/admin/SubCategories'
import PhotoUpload from 'components/core/PhotoUpload'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import { MuiTblOptions } from 'utils'

const categories = () => {
  // const { categories, setRealtime } = useCategories()
  // console.log(categories)
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
            <div className="text-lg font-bold text-theme">
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
              field: 'createdAt',
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
        />
      </div>
    </AdminLayout>
  )
}

export default withAdmin(categories)
