import MaterialTable from '@material-table/core'

import { formatCurrency } from '@ashirbad/js-core'
import { Info } from '@mui/icons-material'
import {
  Avatar,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { put } from 'api'
import { ProductInfo, SendReply } from 'components/admin/dialog'
import { BillingDrawer } from 'components/admin/drawer'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { MuiTblOptions } from 'utils'

const requestedOrders = () => {
  const { data, mutate } = useSWRAPI(`/orders?status=pending`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const requestedOrders = data?.data?.data?.data
  console.log(requestedOrders)
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const [openBillingDrawer, setOpenBillingDrawer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openProductInfo, setOpenProductInfo] = useState(false)

  return (
    <AdminLayout title="Admin | Manage Requested Orders ">
      <div className="m-auto px-4 py-4">
        <BillingDrawer
          open={openBillingDrawer}
          onClose={() => setOpenBillingDrawer(false)}
          setRealtime={() => {}}
        />
        <ProductInfo
          open={openProductInfo}
          handleClose={() => setOpenProductInfo(false)}
        />

        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div className="text-lg font-bold text-theme">Requested Orders</div>
          }
          isLoading={!data || loading}
          data={
            requestedOrders === null
              ? []
              : requestedOrders?.map((order: any, i: number) => ({
                  ...order,
                  sl: i + 1,
                  productCost: order?.billing?.totalPrice,
                  productName: order?.product?.title,
                  unit: order?.product?.measureType,
                  productQuantity: `${order?.quantity} ${order?.product?.measureType}`,
                  storeName: order?.store?.displayName,
                  storeEmail: order?.store?.email,
                  timestamp: order?.createdAt
                    ? moment(order?.createdAt).format('LLL')
                    : 'Not available',
                }))
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
              title: 'Name',
              field: 'productName',
              editable: 'never',
              searchable: true,
            },

            {
              export: true,
              hidden: true,
              title: 'Quantity',
              field: 'productQuantity',
              editable: 'never',
              searchable: true,
              emptyValue: '--',
            },
            {
              export: true,
              hidden: true,
              title: 'Store Name',
              field: 'storeName',
              editable: 'never',
              searchable: true,
              emptyValue: '--',
            },
            {
              export: true,
              hidden: true,
              title: 'Store Email',
              field: 'storeEmail',
              editable: 'never',
              searchable: true,
              emptyValue: '--',
            },
            {
              export: false,
              title: 'Measure',
              field: 'quantity',
              render: (rowData) =>
                `${rowData?.product?.measureUnit} ${rowData?.unit}`,
              editable: 'never',
              searchable: true,
              emptyValue: '--',
            },
            {
              export: false,
              title: 'Quantity',
              field: 'quantity',
              editable: 'never',
              searchable: true,
              emptyValue: '--',
            },
            {
              export: false,
              title: 'Store',
              tooltip: 'Store',
              searchable: true,
              editable: 'never',
              field: 'displayName',
              render: ({ store }) => (
                <>
                  <ListItem sx={{ paddingLeft: '0px' }}>
                    {/* <ListItemAvatar>
                        <Avatar src={photoURL} alt={"img"} />
                    </ListItemAvatar> */}
                    <ListItemText
                      primary={
                        <Typography component="span" variant="body2">
                          {store?.displayName}
                        </Typography>
                      }
                      secondary={store?.email}
                      //   secondary={phoneNumber}
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },

            {
              title: 'Price Set',
              field: 'totalPrice',
              render: (rowData) => formatCurrency(rowData?.totalPrice),
              tooltip: 'Set Price',
              // editable: 'never',
              searchable: true,
            },
            {
              export: false,
              title: 'Product Info',
              editable: 'never',
              render: (row) => (
                <>
                  {' '}
                  <Tooltip title="View Product Info">
                    <Avatar
                      variant="rounded"
                      onClick={() => setOpenProductInfo(row?.product)}
                      sx={{
                        mr: '.4vw',
                        padding: '0px !important',
                        backgroundColor: 'lawngreen',
                        cursor: 'pointer',
                      }}
                    >
                      <Info sx={{ padding: '0px !important' }} />
                    </Avatar>
                  </Tooltip>
                </>
              ),
            },
            {
              title: 'Requested On',
              field: 'timestamp',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
              editable: 'never',
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
          cellEditable={{
            isCellEditable: (rowData) => rowData,
            onCellEditApproved: async (
              newValue: number,
              oldValue: number,
              rowData: any,
              columnDef: any
            ) => {
              try {
                Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to send price request again!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes!',
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    setLoading(true)
                    const response = await put({
                      path: `/order/bulk/price/${rowData?._id}`,
                      body: JSON.stringify({
                        price: +newValue,
                      }),
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
                  setLoading(false)
                })
              } catch (e) {
                console.log(e)
              }
            },
          }}
        />
        <SendReply
          selectedUsers={selectedUsers}
          handleClose={() => setSelectedUsers({} as any)}
        />
      </div>
    </AdminLayout>
  )
}

export default withAdmin(requestedOrders)
