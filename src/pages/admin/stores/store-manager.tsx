import MaterialTable from '@material-table/core'
import { Assignment } from '@mui/icons-material'
import { Avatar, Paper, Tooltip } from '@mui/material'
import { post, remove } from 'api'
import { SendNotification } from 'components/admin/dialog'
import { AssignStoreDrawer } from 'components/admin/drawer'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { MuiTblOptions } from 'utils'
const StoreManager = () => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const { data, mutate } = useSWRAPI(`/users/all?role=manager`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const storeManager = data?.data?.data?.data
  const [assignStore, setAssignStore] = useState(false)
  return (
    <AdminLayout title="Admin | Store Manager ">
      <div className="m-auto px-4 py-4">
        <AssignStoreDrawer
          open={assignStore}
          mutate={mutate}
          onClose={() => setAssignStore(false)}
        />
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div className="text-lg font-bold text-theme">Store Managers</div>
          }
          isLoading={!data}
          data={storeManager?.map((item: any, i: number) => ({
            ...item,
            sl: i + 1,
            timestamp: item?.createdAt
              ? moment(item?.createdAt).format('LLL')
              : 'Not available',
          }))}
          options={{ ...MuiTblOptions(), selection: true }}
          columns={[
            {
              title: '#',
              field: 'sl',
              editable: 'never',
              width: '2%',
            },

            {
              title: 'Name',
              field: 'displayName',
              searchable: true,
              export: true,
            },

            {
              title: 'Phone',
              field: 'phoneNumber',
              searchable: true,
              export: true,

              //   hidden:true,
            },
            {
              title: 'Email',
              field: 'email',
              searchable: true,
              export: true,
            },
            {
              title: 'Password',
              field: 'password',
              searchable: true,
              export: false,
              emptyValue: '--',
            },
            {
              editable: 'never',
              title: 'Timestamp',
              field: 'timestamp',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
            },
            {
              title: 'Store Assign',
              export: false,
              headerStyle: {
                textAlign: 'justify',
              },
              cellStyle: {
                textAlign: 'justify',
                paddingLeft: '3vw',
              },
              render: (row) => (
                <Tooltip title="Store Assign">
                  <Avatar
                    variant="rounded"
                    onClick={() => setAssignStore(row as any)}
                    className="!mr-1 !cursor-pointer !bg-theme !p-0"
                  >
                    <Assignment />
                  </Avatar>
                </Tooltip>
              ),
            },
          ]}
          editable={{
            onRowAdd: async (data) => {
              try {
                const response = await post({
                  path: '/user/manager',
                  body: JSON.stringify({
                    ...data,
                  }),
                  token: 'CGHAccessToken',
                  headers: {
                    'Content-Type': 'application/json',
                  },
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
            // onRowUpdate: async (newData, oldData) => {
            //   try {
            //     const response = await put({
            //       path: `coupon/${oldData?._id}`,
            //       body: JSON.stringify({
            //         code: newData?.code,
            //         discount: newData?.discount,
            //         maxDiscount: newData?.maxDiscount,
            //         maxUses: newData?.maxUses,
            //         startDate: newData?.validFrom,
            //         endDate: newData?.validTill,
            //         isActive: newData?.isActive,
            //       }),
            //       token: 'CGHAccessToken',
            //       headers: {
            //         'Content-Type': 'application/json',
            //       },
            //     })
            //     response?.status === 200
            //       ? Swal.fire({ text: response?.message, icon: 'success' })
            //       : Swal.fire({ text: response?.error, icon: 'error' })
            //   } catch (error) {
            //     console.log(error)
            //   } finally {
            //     mutate()
            //   }
            // },
            onRowDelete: async (oldData) => {
              try {
                const response = await remove({
                  path: `/user/account/${oldData?._id}`,
                  token: 'CGHAccessToken',
                })
                response?.status === 200
                  ? Swal.fire({
                      text: response?.message,
                      icon: 'success',
                    })
                  : Swal.fire({ text: response?.error, icon: 'error' })
                mutate()
              } catch (error) {
                console.log(error)
              }
            },
          }}
          //           detailPanel={({ rowData }) => {
          //             return (
          //               <div
          //                 className="bg-eef5f9 p-[20px] m-auto"
          //               >
          //                 <Card
          //                   sx={{
          //                     minWidth: 275,
          //                     maxWidth: 700,
          //                     transition: "0.3s",
          //                     margin: "auto",
          //                     borderRadius: "10px",
          //                     fontWeight: "bolder",
          //                     wordWrap: "break-word",
          //                     padding: "20px",
          //                     boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          //                     "&:hover": {
          //                       boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
          //                     },
          //                   }}
          //                 >
          //                   <CardContent>
          //                     <h1 className="mb-[5px] text-green-700 text-lg">
          // Comments </h1>
          //                     <p  className="font-bold break-words text-base">{rowData?.message}</p>
          //                   </CardContent>
          //                 </Card>
          //               </div>
          //             );
          //           }}
          actions={[
            {
              icon: 'send',
              tooltip: 'Send Notification',
              onClick: (evt, data: any) =>
                data?.length > 1
                  ? Swal.fire({
                      text: 'Please select only one customer to send notification',
                      icon: 'warning',
                      confirmButtonText: 'Ok',
                    })
                  : setSelectedUsers(data[0]),
            },
          ]}
        />
        <SendNotification
          selectedUsers={selectedUsers}
          handleClose={() => setSelectedUsers({} as any)}
        />
      </div>
    </AdminLayout>
  )
}
export default withAdmin(StoreManager)
