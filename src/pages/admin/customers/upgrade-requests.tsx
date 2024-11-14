import MaterialTable from '@material-table/core'
import {
  Avatar,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { put } from 'api'
import { SendNotification } from 'components/admin/dialog'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { MuiTblOptions } from 'utils'

const UpgradeRequests = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { data, mutate } = useSWRAPI(`users/all/?role=user&status=pending`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const upgradeCustomers = data?.data?.data?.data
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])

  const handleUpgrade = async (id: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Upgrade this user to premium`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, upgrade!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true)
          const response = await put({
            path: `/user/status/${id}`,
            body: JSON.stringify({
              status: 'VERIFIED',
            }),
            token: 'CGHAccessToken',
          })
          mutate()
          setLoading(false)
          response?.status === 200
            ? Swal.fire({ text: response?.message, icon: 'success' })
            : Swal.fire({ text: response?.error, icon: 'error' })
        } catch (error) {
          console.log(error)
        } finally {
          mutate()
        }
      }
    })
  }
  const handleReject = async (id: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Reject this user`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true)
          const response = await put({
            path: `/user/status/${id}`,
            body: JSON.stringify({
              status: 'REJECTED',
            }),
            token: 'CGHAccessToken',
          })
          mutate()
          setLoading(false)
          response?.status === 200
            ? Swal.fire({ text: response?.message, icon: 'success' })
            : Swal.fire({ text: response?.error, icon: 'error' })
        } catch (error) {
          console.log(error)
        } finally {
          mutate()
        }
      }
    })
  }
  return (
    <AdminLayout title="Admin | Customers">
      <div className="m-auto px-4 py-4">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={<div className="text-lg font-bold text-theme">B2B KYC</div>}
          isLoading={!data || loading}
          data={upgradeCustomers?.map((customer: any, i: number) => {
            return {
              ...customer,
              sl: i + 1,
              timestamp: customer?.createdAt
                ? moment(customer?.createdAt).format('LLL')
                : 'Not available',
            }
          })}
          options={{ ...MuiTblOptions(), selection: true }}
          columns={[
            {
              title: '#',
              field: 'sl',
              editable: 'never',
              width: '2%',
            },
            {
              title: 'Profile',
              tooltip: 'Profile',
              searchable: true,
              field: 'displayName',
              render: ({ photoURL, displayName, phoneNumber, email }) => (
                <>
                  <ListItem sx={{ paddingLeft: '0px' }}>
                    <ListItemAvatar>
                      <Avatar src={photoURL} alt={'img'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="span" variant="body2">
                          {displayName}
                        </Typography>
                      }
                      // secondary={email}
                      //   secondary={phoneNumber}
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },
            // {
            //   title: 'Name',
            //   field: 'displayName',
            // },
            {
              title: 'Email',
              field: 'email',
              searchable: true,
              export: true,
              // hidden: true,
            },
            {
              title: 'Phone',
              field: 'phoneNumber',
              searchable: true,
              export: true,
              //   hidden:true,
            },

            {
              title: 'Created At',
              field: 'timestamp',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
            },
          ]}
          detailPanel={({ rowData }) => {
            return (
              <div className="bg-eef5f9 m-auto p-[20px]">
                <Card
                  sx={{
                    minWidth: 275,
                    maxWidth: 400,
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
                    <h1 className="mb-[5px] text-lg text-theme">Documents </h1>
                    <p className="!mb-2 break-words text-base font-bold">
                      GST Number:{rowData?.GSTNumber}
                    </p>
                    <p className="!h-1/2">
                      {' '}
                      <Avatar
                        variant="square"
                        src={rowData?.GSTDoc}
                        sx={{
                          width: '100%',
                          height: '80%',
                        }}
                      />
                    </p>
                  </CardContent>
                </Card>
              </div>
            )
          }}
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => mutate(),
            },
            {
              tooltip: 'Accept  Request',
              icon: 'done',
              onClick: async (evt, data) =>
                handleUpgrade(data?.map((item: any) => item._id)),
            },
            {
              tooltip: 'Reject Request',
              icon: 'cancel',
              onClick: async (evt, data) =>
                handleReject(data?.map((item: any) => item._id)),
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
export default withAdmin(UpgradeRequests)
