import MaterialTable from '@material-table/core'
import { Reply } from '@mui/icons-material'
import {
  Card,
  CardContent,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { remove } from 'api'
import { SendReply } from 'components/admin/dialog'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import React from 'react'
import Swal from 'sweetalert2'
import { MuiTblOptions } from 'utils'

const enquiry = () => {
  const [selectedUsers, setSelectedUsers] = React.useState<any[]>([])
  const { data, mutate } = useSWRAPI(`business-enquiry-forms`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const enquiries = data?.data?.data?.data
  console.log(data)
  return (
    <AdminLayout title="Admin | Enquiry Forms">
      <div className="m-auto px-8 py-4">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div className="text-lg font-bold text-[#f15a24]">
              Manage Enquiries
            </div>
          }
          isLoading={!data}
          data={
            enquiries === null
              ? []
              : enquiries?.map((support: any, i: number) => {
                  return {
                    ...support,
                    sl: i + 1,
                    timestamp: support?.createdAt
                      ? moment(support?.createdAt).format('LLL')
                      : 'Not available',
                  }
                })
          }
          options={{ ...MuiTblOptions() }}
          columns={[
            {
              title: '#',
              field: 'sl',
              editable: 'never',
              width: '2%',
            },
            {
              export: false,
              title: 'Profile',
              tooltip: 'profile',
              searchable: true,
              field: 'name',
              render: ({ photoURL, name, phoneNumber, email }) => (
                <>
                  <ListItem sx={{ paddingLeft: '0px' }}>
                    {/* <ListItemAvatar>
                        <Avatar src={photoURL} alt={"img"} />
                    </ListItemAvatar> */}
                    <ListItemText
                      primary={
                        <Typography component="span" variant="body2">
                          {name}
                        </Typography>
                      }
                      secondary={phoneNumber}
                      //   secondary={phoneNumber}
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },
            {
              title: 'Name',
              field: 'name',
              searchable: true,
              export: true,
              hidden: true,
            },
            {
              title: 'Phone Number',
              field: 'phoneNumber',
              searchable: true,
              export: true,
              hidden: true,
            },
            {
              title: 'Email',
              field: 'email',
              searchable: true,
            },
            {
              title: 'Organization',
              field: 'organization',
              searchable: true,
            },
            {
              title: 'Message',
              field: 'message',
              searchable: true,
              render: ({ message }) =>
                message?.length > 10 ? message?.slice(0, 7) + '...' : message,
            },
            {
              title: 'Timestamp',
              field: 'timestamp',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
            },
            {
              export: false,
              title: 'Reply',
              render: (row: any) => (
                <IconButton onClick={() => setSelectedUsers(row)}>
                  <Reply />
                </IconButton>
              ),
            },
          ]}
          editable={{
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
                      path: `business-enquiry-form/${oldData?._id}`,
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
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => mutate(),
            },
          ]}
          detailPanel={({ rowData }) => {
            return (
              <div className="bg-eef5f9 m-auto p-[20px]">
                <Card
                  sx={{
                    minWidth: 275,
                    maxWidth: 700,
                    transition: '0.3s',
                    margin: 'auto',
                    borderRadius: '10px',
                    fontWeight: 'bolder',
                    wordWrap: 'break-word',
                    padding: '20px',
                    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
                    '&:hover': {
                      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  <CardContent>
                    <h1 className="mb-[5px] text-lg text-theme">Message</h1>
                    <p className="break-words text-base font-bold">
                      {rowData?.message}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )
          }}
          // actions={[
          //   {
          //     icon: 'delete',
          //     tooltip: 'Delete',
          //     onClick: (event, rowData) => {
          //       console.log(rowData)
          //     },
          //   },
          // ]}
        />
        <SendReply
          selectedUsers={selectedUsers}
          handleClose={() => setSelectedUsers({} as any)}
        />
      </div>
    </AdminLayout>
  )
}

export default withAdmin(enquiry)
