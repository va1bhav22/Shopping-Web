import MaterialTable from '@material-table/core'
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import { useState } from 'react'

import { MuiTblOptions } from 'utils'

const Customers = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { data, mutate } = useSWRAPI(`/users/all`)
  const customers = data?.data?.data?.data
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])

  return (
    <AdminLayout title="Admin | Customers">
      <div className="m-auto px-4 py-4">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={<div className="text-lg font-bold text-theme">Customers</div>}
          isLoading={!data}
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
          options={{ ...MuiTblOptions(), pageSize: 10 }}
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => mutate(),
            },
          ]}
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
            {
              title: 'Type',
              field: 'userType',
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
              emptyValue: 'Not Provided',
              // hidden: true,
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
              title: 'Created At',
              field: 'timestamp',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
            },
            {
              title: 'Last Login',
              field: 'lastLoginTime',
              emptyValue: 'Not Login Yet',
              render: ({ lastLogin }) => moment(new Date(lastLogin)).fromNow(),
            },
          ]}
        />
      </div>
    </AdminLayout>
  )
}
export default withAdmin(Customers)
