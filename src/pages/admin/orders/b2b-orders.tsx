import { formatCurrency } from '@ashirbad/js-core'
import MaterialTable from '@material-table/core'
import { PictureAsPdf, Visibility } from '@mui/icons-material'
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { put } from 'api'
import { BillingDrawer } from 'components/admin/drawer'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { downloadPdf, MuiTblOptions } from 'utils'

const b2bOrders = () => {
  const [openBillingDrawer, setOpenBillingDrawer] = useState(false)
  const { data, mutate } = useSWRAPI(`/orders?type=b2b`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const b2bOrders = data?.data?.data?.data
  return (
    <AdminLayout title="Admin | Manage B2B Orders ">
      <div className="m-auto px-4 py-4">
        <BillingDrawer
          open={openBillingDrawer}
          onClose={() => setOpenBillingDrawer(false)}
        />

        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div className="text-lg font-bold text-theme">
              Manage B2B Orders
            </div>
          }
          isLoading={!data}
          data={
            b2bOrders === null
              ? []
              : b2bOrders?.map((order: any, i: number) => ({
                  ...order,
                  sl: i + 1,
                  eta: order?.ETA ? moment(order?.ETA).format('LLL') : '--',
                  productCost: order?.billing?.totalPrice,
                  productName: order?.product?.title,
                  unit: order?.product?.measureType,
                  cost: formatCurrency(order?.totalPrice),
                  productQuantity: `${order?.product?.measureUnit} ${order?.product?.measureType}`,
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
              title: 'cost',
              field: 'productCost',
              editable: 'never',
              searchable: true,
            },
            {
              export: true,
              hidden: true,
              title: 'Measure',
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
              title: 'Price',
              field: 'totalPrice',
              render: (rowData) =>
                formatCurrency(rowData?.productCost ? rowData?.productCost : 0),
              editable: 'never',
              searchable: true,
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
              title: 'Status',
              field: 'status',
              lookup: {
                INITIATED: 'INITIATED',
                PENDING: 'PENDING',
                PACKED: 'PACKED',
                SHIPPED: 'SHIPPED',
                OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
                DELIVERED: 'DELIVERED',
                CANCELLED: 'CANCELLED',
                RETURNED: 'RETURNED',
              },
              render: (rowData) => {
                return (
                  <Chip
                    label={rowData.status}
                    color={
                      rowData.status == 'DELIVERED' ? 'secondary' : 'primary'
                    }
                    variant="filled"
                  />
                )
              },
            },
            {
              export: true,
              hidden: true,
              searchable: true,
              title: 'ETA',
              field: 'eta',
              type: 'date',
              emptyValue: '--',
            },
            {
              export: false,
              title: 'ETA',
              field: 'ETA',
              type: 'date',
              emptyValue: '--',
              render: ({ ETA }) => moment(new Date(ETA)).format('LL'),
              editComponent: ({ value, onChange, rowData }) => {
                return (
                  <>
                    <TextField
                      id="date"
                      type="date"
                      value={value?.split('T')[0]}
                      onChange={(e) => onChange(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        min: new Date().toISOString().split('T')[0],
                      }}
                    />
                  </>
                )
              },
            },
            {
              title: 'Timestamp',
              field: 'createdAt',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
              editable: 'never',
            },
            {
              title: 'Details',
              // field: "pick",
              render: (rowData) => (
                <>
                  <div className="flex">
                    {' '}
                    <Tooltip title="View Details">
                      <Tooltip title="View Order Details">
                        <IconButton
                          onClick={() => setOpenBillingDrawer(rowData)}
                          className="!text-theme"
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      {/* </Avatar> */}
                    </Tooltip>
                    {rowData?.status === 'DELIVERED' && (
                      <Tooltip title="Download Invoice">
                        <IconButton onClick={() => downloadPdf(rowData)}>
                          <PictureAsPdf className="!text-theme" />
                        </IconButton>

                        {/* </Avatar> */}
                      </Tooltip>
                    )}
                  </div>
                </>
              ),
            },
          ]}
          editable={{
            onRowUpdate: async (newData, oldData) => {
              try {
                const response = await put({
                  path: `/order/${oldData?._id}`,
                  body: JSON.stringify({
                    ETA: newData?.ETA,
                    status: newData?.status,
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
          }}
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
                    {/* <h1 className="mb-[5px] text-theme text-lg">
                      Location
                    </h1> */}
                    {/* <Typography variant="body1" gutterBottom align="left">
                      Tracking Number:{' '}
                      <span
                        style={{ color: 'rgb(30, 136, 229)', fontSize: '15px' }}
                      >
                        {'ewureyt1232432435'}
                      </span>
                    </Typography> */}
                    <Typography
                      variant="body1"
                      component="p"
                      gutterBottom
                      align="left"
                    >
                      Shipped From:{' '}
                      <span
                        style={{
                          color: 'rgb(30, 136, 229)',
                          fontSize: '15px',
                        }}
                      >
                        {rowData?.shippedFrom
                          ? `${rowData?.shippedFrom?.street} ${rowData?.shippedFrom?.city} ${rowData?.shippedFrom?.state} ${rowData?.shippedFrom?.zip}
                          ${rowData?.shippedFrom?.country}`
                          : 'N/A'}
                      </span>
                    </Typography>
                    <Typography variant="body1" gutterBottom align="left">
                      Shipped To:{' '}
                      <span
                        style={{ color: 'rgb(30, 136, 229)', fontSize: '15px' }}
                      >
                        {rowData?.shippedTo
                          ? `${rowData?.shippedTo?.street} ${rowData?.shippedTo?.city} ${rowData?.shippedTo?.state} ${rowData?.shippedTo?.zip}
                          ${rowData?.shippedTo?.country}`
                          : 'N/A'}{' '}
                      </span>
                    </Typography>

                    {/* <p  className="font-bold break-words text-base">{rowData?.message}</p> */}
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
          ]}
        />
      </div>
    </AdminLayout>
  )
}

export default withAdmin(b2bOrders)
