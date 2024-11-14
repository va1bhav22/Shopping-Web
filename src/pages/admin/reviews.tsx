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
import { remove } from 'api'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import Swal from 'sweetalert2'
import { MuiTblOptions } from 'utils'

const reviews = () => {
  const { data, mutate, isValidating } = useSWRAPI(`/review/all/reviews`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const reviews = data?.data?.data?.data

  return (
    <AdminLayout title="Admin | Reviews">
      <div className="m-auto px-8 py-4">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <h1 className="text-lg font-bold text-[#f15a24]">Manage Reviews</h1>
          }
          isLoading={isValidating}
          data={
            reviews === null
              ? []
              : reviews?.map((review: any, i: number) => ({
                  ...review,
                  sl: i + 1,
                  userType: review?.order?.product?.type,
                  productName: review?.order?.product?.title,
                  productQuantity: review?.order?.quantity,
                  userName: review?.order?.user?.displayName,
                  userEmail: review?.order?.user?.email,
                  userPhone: review?.order?.user?.phoneNumber,
                  timestamp: review?.createdAt
                    ? moment(review?.createdAt).format('LLL')
                    : 'Not available',
                }))
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
              title: 'Profile',
              tooltip: 'Profile',
              searchable: true,
              width: '2%',
              field: 'userName',
              render: ({ order }) => (
                <>
                  <ListItem sx={{ paddingLeft: '0px' }}>
                    <ListItemAvatar>
                      <Avatar src={order?.user?.photoURL} alt={'img'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography component="span" variant="body2">
                          {order?.user?.displayName}
                        </Typography>
                      }
                      // secondary={email}
                      secondary={
                        <>
                          <div>{order?.user?.phoneNumber}</div>
                          <div>{order?.user?.email}</div>
                        </>
                      }
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },
            {
              title: 'Email',
              field: 'userEmail',
              searchable: true,
              export: true,
              hidden: true,
            },
            {
              title: 'Phone',
              field: 'userPhone',
              searchable: true,
              export: true,
              hidden: true,
            },

            {
              title: 'Product',
              tooltip: 'Product',
              searchable: true,
              width: '2%',
              field: 'productName',
              emptyValue: '--',
              render: ({ order }) => (
                <>
                  <ListItem sx={{ paddingLeft: '0px' }}>
                    {/* <ListItemAvatar>
                      <Avatar src={order?.user?.photoURL} alt={'img'} />
                    </ListItemAvatar> */}
                    <ListItemText
                      primary={
                        <Typography component="span" variant="body2">
                          {order?.product?.title}
                        </Typography>
                      }
                      // secondary={email}
                      secondary={
                        <>
                          <div>{`${order?.quantity} ${order?.product?.measureType}`}</div>
                          {/* <div>{order?.user?.email}</div> */}
                        </>
                      }
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },
            {
              title: 'Quantity',
              field: 'productQuantity',
              export: true,
              hidden: true,
              searchable: true,
            },
            {
              title: 'Type',
              field: 'userType',
              searchable: true,
              export: true,
              emptyValue: '--',
            },
            {
              title: 'Title',
              field: 'title',
              searchable: true,
            },
            {
              title: 'Ratings',
              field: 'rating',
              searchable: true,
              emptyValue: '--',
            },
            {
              title: 'Reviews',
              field: 'comment',
              searchable: true,
              hidden: true,
              export: true,
            },
            {
              title: 'Timestamp',
              field: 'timestamp',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
            },
          ]}
          editable={{
            onRowDelete: async (oldData) => {
              try {
                const response = await remove({
                  path: `/review/${oldData?._id}`,
                  token: 'CGHAccessToken',
                })

                response?.status === 200
                  ? Swal.fire({
                      text: response?.message,
                      icon: 'success',
                    })
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
                    <h1 className="mb-[5px] text-lg text-theme">Reviews </h1>
                    <p className="break-words text-base font-bold">
                      {rowData?.comment}
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
          ]}
        />
      </div>
    </AdminLayout>
  )
}

export default reviews
