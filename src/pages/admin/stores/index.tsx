import MaterialTable from '@material-table/core'
import { AddLocation, Delete, Edit, ManageAccounts } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { SendReply } from 'components/admin/dialog'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import { useState } from 'react'
import { MuiTblOptions } from 'utils'

import { remove } from 'api'
import {
  AddAddressDrawer,
  AddStoreDrawer,
  EditStoreDrawer,
  StoreManagerDrawer,
} from 'components/admin/drawer'
import PhotoUpload from 'components/core/PhotoUpload'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import Swal from 'sweetalert2'

const stores = () => {
  const { data, error, mutate } = useSWRAPI(`/store/all/stores`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })

  const stores = data?.data?.data

  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const [openAddStoreDrawer, setOpenAddStoreDrawer] = useState(false)
  const [openEditStoreDrawer, setOpenEditStoreDrawer] = useState(false)
  const [openAddAddressDrawer, setOpenAddAddressDrawer] = useState(false)
  const [openStoreManagerDrawer, setOpenStoreManagerDrawer] = useState(false)
  const handleDeleteStore = async (row: any) => {
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
            path: `/store/${row?._id}`,
            token: 'CGHAccessToken',
            isImage: true,
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
  }

  return (
    <AdminLayout title="Admin | Manage Stores ">
      <div className="m-auto px-4 py-4">
        <AddStoreDrawer
          open={openAddStoreDrawer}
          mutate={mutate}
          onClose={() => setOpenAddStoreDrawer(false)}
        />
        <EditStoreDrawer
          open={openEditStoreDrawer}
          onClose={() => setOpenEditStoreDrawer(false)}
          mutate={mutate}
        />
        <AddAddressDrawer
          open={openAddAddressDrawer}
          onClose={() => setOpenAddAddressDrawer(false)}
          mutate={mutate}
        />
        <StoreManagerDrawer
          open={openStoreManagerDrawer}
          onClose={() => setOpenStoreManagerDrawer(false)}
        />
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div className="text-lg font-bold text-theme">Manage Stores</div>
          }
          isLoading={!data}
          data={
            stores === null
              ? []
              : stores?.map((store: any, i: number) => {
                  return {
                    ...store,
                    sl: i + 1,
                    timestamp: store?.createdAt
                      ? moment(store?.createdAt).format('LLL')
                      : 'Not available',
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
              title: 'Store',
              tooltip: 'Store',
              searchable: true,
              field: 'displayName',
              render: ({ displayName, phoneNumber, email }) => (
                <>
                  <ListItem sx={{ paddingLeft: '0px' }}>
                    {/* <ListItemAvatar>
                        <Avatar src={photoURL} alt={"img"} />
                    </ListItemAvatar> */}
                    <ListItemText
                      primary={
                        <Typography component="span" variant="body2">
                          {displayName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component="div" variant="body2">
                            {email}
                          </Typography>
                          <Typography component="div" variant="body2">
                            {phoneNumber}
                          </Typography>
                        </>
                      }
                      //   secondary={phoneNumber}
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },
            // {
            //   title: 'Name',
            //   field: 'displayName',
            //   export: true,
            //   searchable: true,
            //   hidden: true,
            // },
            {
              title: 'Email',
              field: 'email',
              export: true,
              searchable: true,
              hidden: true,
            },
            {
              title: 'Phone',
              field: 'phoneNumber',
              export: true,
              searchable: true,
              hidden: true,
            },
            {
              title: 'Image',
              field: 'imageURL',
              export: false,
              render: (rowData) => (
                <Avatar
                  src={rowData?.imageURL}
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
              title: 'Timestamp',
              field: 'timestamp',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
            },
            {
              title: 'Actions',
              headerStyle: {
                textAlign: 'center',
              },
              export: false,
              width: '18%',
              // field: "pick",
              render: (row) => (
                <>
                  <div className="flex">
                    <Tooltip title="Edit Store Details">
                      <Avatar
                        variant="rounded"
                        onClick={() => setOpenEditStoreDrawer(row as any)}
                        className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"

                        // sx={{
                        //   mr: ".4vw",
                        //   padding: "0px !important",
                        //   backgroundColor: "gray",
                        //   cursor: "pointer",
                        // }}
                      >
                        <Edit className="!p-0" />
                      </Avatar>
                    </Tooltip>
                    <Tooltip title="Add Store Address">
                      <Avatar
                        variant="rounded"
                        onClick={() => setOpenAddAddressDrawer(row as any)}
                        className="!mr-1 !cursor-pointer !bg-indigo-700 !p-0"
                      >
                        <AddLocation className="!p-0" />
                      </Avatar>
                    </Tooltip>
                    <Tooltip title="Managers">
                      <Avatar
                        variant="rounded"
                        onClick={() => setOpenStoreManagerDrawer(row as any)}
                        className="!mr-1 !cursor-pointer !bg-sky-700 !p-0"
                      >
                        <ManageAccounts className="!p-0" />
                      </Avatar>
                    </Tooltip>
                    <Tooltip title="Delete Store">
                      <Avatar
                        variant="rounded"
                        onClick={() => handleDeleteStore(row)}
                        className=" !mr-1 !cursor-pointer !bg-red-700"
                      >
                        <Delete className="!p-0" />
                      </Avatar>
                    </Tooltip>
                  </div>
                </>
              ),
            },
          ]}
          detailPanel={[
            {
              render: ({ rowData }) => {
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
                        <h1 className="mb-[5px] text-lg text-theme">
                          Location
                        </h1>
                        <Typography
                          variant="body1"
                          component="p"
                          gutterBottom
                          align="left"
                        >
                          Street:{' '}
                          <span
                            style={{
                              color: 'rgb(30, 136, 229)',
                              fontSize: '15px',
                            }}
                          >
                            {rowData?.address?.street
                              ? rowData?.address?.street
                              : '--'}
                          </span>
                        </Typography>
                        <Typography variant="body1" gutterBottom align="left">
                          City/District/Town:{' '}
                          <span
                            style={{
                              color: 'rgb(30, 136, 229)',
                              fontSize: '15px',
                            }}
                          >
                            {rowData?.address?.city
                              ? rowData?.address?.city
                              : '--'}
                          </span>
                        </Typography>

                        <Typography variant="body1" gutterBottom align="left">
                          State:{' '}
                          <span
                            style={{
                              color: 'rgb(30, 136, 229)',
                              fontSize: '15px',
                            }}
                          >
                            {rowData?.address?.state
                              ? rowData?.address?.state
                              : '--'}
                          </span>
                        </Typography>
                        <Typography variant="body1" gutterBottom align="left">
                          Landmark:{' '}
                          <span
                            style={{
                              color: 'rgb(30, 136, 229)',
                              fontSize: '15px',
                            }}
                          >
                            {rowData?.address?.landmark
                              ? rowData?.address?.landmark
                              : '--'}
                          </span>
                        </Typography>
                        <Typography variant="body1" gutterBottom align="left">
                          Pin:{' '}
                          <span
                            style={{
                              color: 'rgb(30, 136, 229)',
                              fontSize: '15px',
                            }}
                          >
                            {rowData?.address?.zip
                              ? rowData?.address?.zip
                              : '--'}
                          </span>
                        </Typography>
                        {/* <p  className="font-bold break-words text-base">{rowData?.message}</p> */}
                      </CardContent>
                    </Card>
                  </div>
                )
              },
            },
          ]}
          actions={[
            {
              icon: 'add',
              tooltip: 'Add Store',
              isFreeAction: true,
              onClick: (event, rowData) => {
                setOpenAddStoreDrawer(true)
              },
            },
          ]}
        />
        <SendReply
          selectedUsers={selectedUsers}
          handleClose={() => setSelectedUsers({} as any)}
        />
      </div>
    </AdminLayout>
  )
}

export default withAdmin(stores)
