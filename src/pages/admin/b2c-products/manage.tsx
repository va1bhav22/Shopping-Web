import MaterialTable from '@material-table/core'
import {
  AddAPhotoRounded,
  ControlPointDuplicate,
  Delete,
  Edit,
  Info,
  Visibility,
} from '@mui/icons-material'
import { Avatar, Chip, Grid, Paper, Tooltip } from '@mui/material'
import { put, remove } from 'api'
import { VariantType } from 'components/admin'
import { ProductInfo } from 'components/admin/dialog'
import { EditProductDrawer } from 'components/admin/drawer'
import { ImgUpload } from 'components/core'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { MuiTblOptions } from 'utils'

const manage = () => {
  const { data, mutate } = useSWRAPI('/products?type=b2c', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const uploadNewPhoto = async (file: any, product: any) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('images', file)
    try {
      const response = await put({
        path: `/product/${product?._id}`,
        body: formData,
        isImage: true,
        token: 'CGHAccessToken',
      })
      if (response?.status === 200) {
        mutate()

        Swal.fire({ text: response?.message, icon: 'success' })
      } else {
        Swal.fire({ text: response?.error, icon: 'error' })
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const products = data?.data?.data?.data
  const [editProductDrawer, setEditProductDrawer] = useState(false)
  const [openProductInfo, setOpenProductInfo] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDeleteProduct = async (row: any) => {
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
          setLoading(true)
          const response = await remove({
            path: `/product/${row?._id}`,
            token: 'CGHAccessToken',
          })
          response?.status === 200
            ? Swal.fire({
                text: response?.message,
                icon: 'success',
              })
            : Swal.fire({ text: response?.error, icon: 'error' })
          mutate()
          setLoading(false)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AdminLayout title="Admin | Manage Products">
      <div className="m-auto px-4 py-4">
        <EditProductDrawer
          mutate={mutate}
          businessType="B2C"
          open={editProductDrawer}
          onClose={() => setEditProductDrawer(false)}
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
            <h1 className="text-lg font-bold text-[#f15a24]">
              Manage Products
            </h1>
          }
          isLoading={!data || loading}
          data={products?.map((product: any, i: number) => {
            return {
              ...product,
              sl: i + 1,
              imageURL: product?.displayImage?.url,
              productCategory: product?.category?.name,
              timestamp: product?.createdAt
                ? moment(product?.createdAt).format('LLL')
                : 'Not available',
            }
          })}
          options={{ ...MuiTblOptions(), pageSize: 10 }}
          columns={[
            {
              title: '#',
              field: 'sl',
              editable: 'never',
              width: '2%',
            },
            {
              export: false,
              title: 'Image',
              field: 'imageURL',
              render: (rowData) => (
                <Avatar
                  src={rowData.imageURL}
                  variant="square"
                  sx={{ width: 120, height: 70 }}
                />
              ),
            },
            {
              title: 'Title',
              field: 'title',
              searchable: true,
            },
            {
              title: 'Category',
              field: 'productCategory',
              searchable: true,
            },
            // {
            //   title: 'MOQ',
            //   field: 'moq',
            // },
            {
              title: 'Featured',
              field: 'isFeatured',
              render: (rowData) => (
                <Chip
                  variant="filled"
                  label={rowData?.isFeatured ? 'Yes' : 'No'}
                  color={rowData?.isFeatured ? 'success' : 'secondary'}
                />
              ),
              searchable: true,
              lookup: { true: 'Yes', false: 'No' },
            },

            {
              title: 'Timestamp',
              field: 'createdAt',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
              export: false,
            },
            {
              export: true,
              hidden: true,
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
                    {' '}
                    <Tooltip title="View Product Info">
                      <Avatar
                        variant="rounded"
                        onClick={() => setOpenProductInfo(row)}
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
                    <Tooltip title="Edit Product Details">
                      <Avatar
                        variant="rounded"
                        onClick={() => setEditProductDrawer(row as any)}
                        className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
                      >
                        <Edit className="!p-0" />
                      </Avatar>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <Avatar
                        variant="rounded"
                        onClick={() => handleDeleteProduct(row)}
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
              tooltip: 'Add Product Images',
              icon: () => <AddAPhotoRounded />,
              openIcon: () => <Visibility />,
              render: ({ rowData }) => {
                return (
                  <div className="p-5">
                    <Grid container spacing={2}>
                      {rowData?.images?.map((item: any) => (
                        <Grid item key={item?._id} lg={3} className="!mr-1">
                          <ImgUpload
                            uri={item?.url}
                            onDelete={async () => {
                              setLoading(true)
                              try {
                                const response = await remove({
                                  path: `/product/${rowData?._id}/image`,
                                  token: 'CGHAccessToken',
                                  body: JSON.stringify({
                                    imagePath: item?.path,
                                  }),
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                })

                                response?.status === 200
                                  ? Swal.fire({
                                      text: response?.message,
                                      icon: 'success',
                                    })
                                  : Swal.fire({
                                      text: response?.error,
                                      icon: 'error',
                                    })
                                mutate()
                                setLoading(false)
                              } catch (error) {
                                console.log(error)
                                Swal.fire({
                                  // text: error.message,
                                  icon: 'error',
                                })
                              }
                            }}
                            // onChange={(e) =>
                            //   uploadNewPhoto(e.target.files[0], id)
                            // }
                          />
                        </Grid>
                      ))}
                      <Grid item lg={2} className="!ml-2">
                        <ImgUpload
                          onChange={(e: any) =>
                            uploadNewPhoto(e.target.files[0], rowData)
                          }
                        />
                      </Grid>
                    </Grid>
                  </div>
                )
              },
            },
            {
              tooltip: 'Add Product Variant',
              icon: () => <ControlPointDuplicate />,
              openIcon: () => <Visibility />,
              render: ({ rowData }) => {
                return (
                  <div className="p-5">
                    <VariantType rowData={rowData} />
                  </div>
                )
              },
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
        />
      </div>
    </AdminLayout>
  )
}

export default manage
