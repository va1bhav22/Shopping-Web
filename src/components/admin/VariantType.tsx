import MaterialTable from '@material-table/core'
import {
  AddAPhotoRounded,
  Delete,
  Edit,
  Info,
  Visibility,
} from '@mui/icons-material'
import { Avatar, Grid, Paper, Tooltip } from '@mui/material'
import { ProductInfo } from 'components/admin/dialog'
import moment from 'moment'
import { useState } from 'react'

import { ExportCsv, ExportPdf } from '@material-table/exporters'
import { put, remove } from 'api'
import { AddVariantDrawer, EditProductDrawer } from 'components/admin/drawer'
import { ImgUpload } from 'components/core'
import useSWRAPI from 'hooks/useSWRAPI'
import Swal from 'sweetalert2'

const VariantType = ({ rowData }: any) => {
  const { data, mutate } = useSWRAPI(`/product/${rowData?._id}/variants`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })

  const variants = data?.data?.data

  const [loading, setLoading] = useState(false)
  const [editProductDrawer, setEditProductDrawer] = useState(false)
  const [openProductInfo, setOpenProductInfo] = useState(false)
  const [openAddVariantDrawer, setOpenAddVariantDrawer] = useState(false)
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
    <div className="m-auto">
      <AddVariantDrawer
        businessType={rowData?.type}
        mutate={mutate}
        open={openAddVariantDrawer}
        onClose={() => setOpenAddVariantDrawer(false)}
      />
      <EditProductDrawer
        businessType={rowData?.type}
        open={editProductDrawer}
        onClose={() => setEditProductDrawer(false)}
        mutate={mutate}
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
          <div className="text-lg font-bold text-theme">{`Variants of ${rowData?.title}`}</div>
        }
        isLoading={!data || loading}
        data={variants?.map((product: any, i: number) => {
          return {
            ...product,
            sl: i + 1,
            imageURL: product?.displayImage?.url,
            productCategory: product?.category?.name,
          }
        })}
        options={{
          headerStyle: {
            fontWeight: 'bold',
          },
          detailPanelColumnAlignment: 'right',
          addRowPosition: 'first',
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: 'Export PDF',
              exportFunc: (cols, datas) => ExportPdf(cols, datas, 'All Data'),
            },
            {
              label: 'Export CSV',
              exportFunc: (cols, datas) => ExportCsv(cols, datas, 'All Data'),
            },
          ],
        }}
        columns={[
          {
            title: '#',
            field: 'sl',
            editable: 'never',
            width: '2%',
          },
          {
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

          // {
          //   title: 'MOQ',
          //   field: 'moq',
          // },

          {
            title: 'Timestamp',
            field: 'createdAt',
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
        ]}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add Variant',
            isFreeAction: true,
            onClick: () => {
              setOpenAddVariantDrawer(rowData)
            },
          },
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => mutate(),
          },
        ]}
      />
    </div>
  )
}

export default VariantType
