import { formatCurrency } from '@ashirbad/js-core'
import MaterialTable from '@material-table/core'
import {
  Business,
  ConnectWithoutContact,
  People,
  PictureAsPdf,
  ShowChart,
  Visibility,
} from '@mui/icons-material'
import {
  Button,
  Card,
  CardContent,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { InfoCards } from 'components/admin'
import { BillingDrawer } from 'components/admin/drawer'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import { DateRangePicker } from 'materialui-daterange-picker'
import moment from 'moment'
import { useState } from 'react'
import { downloadPdf, MuiTblOptions } from 'utils'
const Reports = () => {
  const [dateRange, setDateRange] = useState({
    startDate: moment().toDate(),
    endDate: moment().add(1, 'days').toDate(),
  })
  console.log(dateRange?.endDate.toISOString().split('T')[0])
  console.log(dateRange?.startDate.toISOString().split('T')[0])
  const { data, mutate, isValidating } = useSWRAPI(
    `/admin/statement-report?to=${
      dateRange?.endDate.toISOString().split('T')[0]
    }&from=${dateRange?.startDate.toISOString().split('T')[0]}`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true, // If false, undefined data gets cached against the key.
      dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
    }
  )

  const statement = data?.data?.data

  const [openBillingDrawer, setOpenBillingDrawer] = useState(false)
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  return (
    <AdminLayout title="Admin | Reports">
      <div className="m-auto px-4 py-4">
        {' '}
        <Button
          variant="contained"
          className=" !text-bold !bg-theme !text-sm"
          onClick={() => {
            setOpen(true)
          }}
        >
          Choose Date Range
        </Button>
        <div className="mt-4">
          <DateRangePicker
            wrapperClassName="date-range-picker-wrapper"
            closeOnClickOutside={true}
            open={open}
            toggle={toggle}
            onChange={(range: any) => setDateRange(range)}
            definedRanges={[
              // {
              //   label: "Today",
              //   startDate: new Date(),
              //   endDate: new Date(),
              // },
              {
                label: 'Yesterday',
                startDate: moment().subtract(1, 'day').toDate(),
                endDate: moment().subtract(1, 'day').toDate(),
              },
              {
                label: 'Last 7 Days',
                startDate: moment().subtract(7, 'days').toDate(),
                endDate: moment().toDate(),
              },
              {
                label: 'Last 15 Days',
                startDate: moment().subtract(15, 'days').toDate(),
                endDate: moment().toDate(),
              },
              {
                label: 'Last 30 Days',
                startDate: moment().subtract(30, 'days').toDate(),
                endDate: moment().toDate(),
              },
              {
                label: 'This Month',
                startDate: moment().startOf('month').toDate(),
                endDate: moment().endOf('month').toDate(),
              },
              {
                label: 'Last Month',
                startDate: moment()
                  .subtract(1, 'month')
                  .startOf('month')
                  .toDate(),

                endDate: moment().subtract(1, 'month').endOf('month').toDate(),
              },
              {
                label: 'Last 365 Days',
                startDate: moment().subtract(365, 'days').toDate(),

                endDate: moment().toDate(),
              },
            ]}
          />
        </div>
        <div className="mt-8 grid grid-cols-12 content-between gap-4 ">
          <InfoCards
            title="Total Gross Sales"
            content={
              statement?.grossB2CSell
                ? `${formatCurrency(statement?.grossB2CSell)}`
                : '0'
            }
            iconClassName="bg-theme"
            titleClassName="text-theme text-lg"
            contentClassName="text-theme"
            className="col-span-12 w-full bg-orange-200 sm:col-span-12 md:col-span-6 lg:col-span-4"
            icon={
              <ConnectWithoutContact className="h-8 w-8 rounded-md  text-white" />
            }
          />
          {/* <InfoCards
            title="B2B Gross Sales"
            content={
              statement?.grossB2BSell
                ? `${formatCurrency(statement?.grossB2BSell)}`
                : '0'
            }
            iconClassName="bg-green-700"
            titleClassName="text-green-800 text-lg"
            contentClassName="text-green-800"
            className="col-span-12 w-full bg-orange-200 sm:col-span-12 md:col-span-6 lg:col-span-3"
            icon={<Business className="h-8 w-8 rounded-md  text-white" />}
          /> */}
          <InfoCards
            title="Total Customers"
            content={
              statement?.totalCustomers ? statement?.totalCustomers : '0'
            }
            iconClassName="bg-theme"
            titleClassName="text-theme text-lg"
            contentClassName="text-theme"
            className="col-span-12 w-full bg-orange-200 sm:col-span-12 md:col-span-6 lg:col-span-4"
            icon={<People className="h-8 w-8 rounded-md  text-white" />}
          />
          <InfoCards
            title="Total Stocks Report"
            content={statement?.totalStock ? statement?.totalStock : '0'}
            iconClassName="bg-theme"
            titleClassName="text-theme text-lg"
            contentClassName="text-theme"
            className="col-span-12 w-full bg-orange-200 sm:col-span-12 md:col-span-6 lg:col-span-4"
            icon={<ShowChart className="h-8 w-8 rounded-md  text-white" />}
          />
        </div>
        <div className="mt-8 w-full px-1">
          <BillingDrawer
            open={openBillingDrawer}
            onClose={() => setOpenBillingDrawer(false)}
            setRealtime={() => {}}
          />

          <MaterialTable
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={
              <h1 className="text-[##f15a24] text-lg font-bold">Orders</h1>
            }
            isLoading={isValidating}
            data={
              statement?.data === null
                ? []
                : statement?.data?.map((order: any, i: number) => ({
                    ...order,
                    sl: i + 1,
                    productCost: order?.billing?.totalPrice,
                    productName: order?.product?.title,
                    unit: order?.product?.measureType,
                    cost: formatCurrency(order?.product?.totalPrice),
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
                title: 'cost',
                field: 'productCost',
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
                title: 'Price',
                field: 'totalPrice',
                render: (rowData) =>
                  formatCurrency(
                    rowData?.productCost ? rowData?.productCost : 0
                  ),
                editable: 'never',
                searchable: true,
              },

              {
                export: false,
                title: 'Quantity',
                field: 'quantity',
                render: (rowData) => `${rowData?.quantity} ${rowData?.unit}`,
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
                title: 'Timestamp',
                field: 'timestamp',
                render: ({ createdAt }: any) =>
                  moment(new Date(createdAt)).format('LLL'),
                editable: 'never',
              },
              {
                export: false,
                title: 'Actions',
                // field: "pick",
                render: (rowData) => (
                  <>
                    <div className="flex">
                      {' '}
                      <Tooltip title="View Details">
                        {/* <Avatar
                          variant="rounded"
                          sx={{
                            padding: " 0px !important",
                            backgroundColor: "blueViolet",
                            mr: ".4vw",
                            cursor: "pointer",
                          }}
                          // onClick={() => setOpenAddressDrawer(row)}
                        > */}
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
                      <Tooltip title="Download Invoice">
                        {/* <Avatar
                          variant="rounded"
                          sx={{
                            padding: " 0px !important",
                            backgroundColor: "#1877f2",
                            mr: ".4vw",
                            cursor: "pointer",
                          }}
                        > */}
                        <IconButton onClick={() => downloadPdf(rowData)}>
                          <PictureAsPdf className="!text-theme" />
                        </IconButton>

                        {/* </Avatar> */}
                      </Tooltip>
                    </div>
                  </>
                ),
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
                        Shipped To:
                        <span
                          style={{
                            color: 'rgb(30, 136, 229)',
                            fontSize: '15px',
                          }}
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
      </div>
    </AdminLayout>
  )
}

export default withAdmin(Reports)
