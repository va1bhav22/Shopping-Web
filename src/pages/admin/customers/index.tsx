import MaterialTable from '@material-table/core'
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { put } from 'api'
import { SendNotification } from 'components/admin/dialog'
import { IOSSwitch } from 'components/core'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import { useState } from 'react'
import Swal from 'sweetalert2'

import { MuiTblOptions } from 'utils'

const Customers = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { data, mutate, isValidating } = useSWRAPI(`users/all`)
  const customers = data?.data?.data?.data
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `${
        rowData?.blockStatus === 'BLOCKED' ? 'UNBLOCK' : 'BLOCK'
      } this user`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${
        rowData?.blockStatus === 'BLOCKED' ? 'Unblock' : 'Block'
      }`,
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true)
        try {
          const response = await put({
            headers: {
              'Content-Type': 'application/json',
            },
            path: `/user/block-status/${rowData?._id}`,
            body: JSON.stringify({
              blockStatus:
                rowData?.blockStatus === 'BLOCKED' ? 'UNBLOCKED' : 'BLOCKED',
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
          title={
            <div className="text-lg font-bold text-[#f15a24]">Customers</div>
          }
          isLoading={isValidating || loading}
          data={customers?.map((customer: any, i: number) => {
            return {
              ...customer,
              sl: i + 1,
              userType: customer?.GSTDoc || customer?.GSTNumber ? 'B2B' : 'B2C',
              timestamp: customer?.createdAt
                ? moment(customer?.createdAt).format('LLL')
                : 'Not available',
              lastLoginTime: customer?.lastLogin
                ? moment(customer?.lastLogin).fromNow()
                : 'Not Login Yet',
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
                      secondary={email}
                      //   secondary={phoneNumber}
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },
            // {
            //   title: 'Type',
            //   field: 'userType',
            // },
            {
              title: 'Email',
              field: 'email',
              searchable: true,
              export: true,
              hidden: true,
            },
            {
              title: 'Phone',
              field: 'phoneNumber',
              searchable: true,
              export: true,
              emptyValue: 'Not Provided',
              //   hidden:true,
            },

            {
              title: 'Status',
              field: 'blockStatus',
              render: (rowData) => (
                <IOSSwitch
                  checked={rowData?.blockStatus === 'BLOCKED'}
                  onChange={() => {
                    handleBlock(rowData)
                  }}
                />
              ),
            },
            {
              title: 'Created At',
              field: 'timestamp',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
            },
            {
              title: 'Last Login',
              field: 'lastLoginTime',
              emptyValue: 'Not Login Yet',
              render: ({ lastLogin }) =>
                lastLogin
                  ? moment(new Date(lastLogin)).fromNow()
                  : 'Not Login Yet',
            },
          ]}
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

            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => mutate(),
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
export default withAdmin(Customers)
