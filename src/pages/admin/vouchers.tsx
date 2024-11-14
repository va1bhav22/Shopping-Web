import { formatCurrency } from '@ashirbad/js-core'
import MaterialTable from '@material-table/core'
import { Chip, Paper, TextField } from '@mui/material'
import { post, put, remove } from 'api'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import Swal from 'sweetalert2'
import { MuiTblOptions } from 'utils'
const vouchers = () => {
  const { data, mutate, isValidating } = useSWRAPI('coupons?type=VOUCHER', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  console.log(data)

  return (
    <AdminLayout title="Admin | Vouchers">
      <div className="m-auto px-4 py-4">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div className="text-lg font-bold text-[#f15a24]">
              Manage Offers
            </div>
          }
          isLoading={isValidating}
          data={data?.data?.data?.data?.map((coupon: any, i: number) => ({
            ...coupon,
            sl: i + 1,
            valid_From: moment(coupon?.startDate).format('DD-MM-YYYY'),
            valid_Till: moment(coupon?.endDate).format('DD-MM-YYYY'),
            validFrom: coupon?.startDate,
            validTill: coupon?.endDate,
            status: coupon?.isActive ? 'Active' : 'Inactive',
            Timestamp: moment(coupon?.createdAt).format('LL'),
            cashback: formatCurrency(coupon?.minOrderAmount),
            Discount: `${coupon?.discount}%`,
            timestamp: coupon?.createdAt
              ? moment(coupon?.createdAt).format('LLL')
              : 'Not available',
          }))}
          options={{ ...MuiTblOptions() }}
          columns={[
            {
              title: '#',
              field: 'sl',
              editable: 'never',
              width: '2%',
            },
            {
              title: 'Offer Title',
              field: 'title',
              searchable: true,
              validate: (value) => {
                if (
                  value?.title?.length <= 0 ||
                  value?.title?.length === undefined ||
                  value?.title?.length === null
                ) {
                  return 'Required'
                }
                return true
              },
            },
            // {
            //   title: 'Description',
            //   field: 'description',
            //   searchable: true,
            //   validate: (value) => {
            //     if (
            //       value?.description?.length <= 0 ||
            //       value?.description?.length === undefined ||
            //       value?.description?.length === null
            //     ) {
            //       return 'Required'
            //     }
            //     return true
            //   },
            // },
            // {
            //   title: 'Valid From',
            //   field: 'valid_From',
            //   type: 'date',
            //   emptyValue: '--',
            //   export: true,
            //   hidden: true,
            // },
            // {
            //   title: 'Valid Till',
            //   field: 'valid_Till',
            //   type: 'date',
            //   emptyValue: '--',
            //   export: true,
            //   hidden: true,
            // },
            // {
            //   export: false,
            //   title: 'Valid From',
            //   field: 'validFrom',
            //   type: 'date',
            //   emptyValue: '--',
            //   render: (rowData) => moment(rowData?.validFrom).format('LL'),
            //   editComponent: ({ value, onChange, rowData }) => {
            //     return (
            //       <>
            //         <TextField
            //           id="date"
            //           type="date"
            //           value={value?.split('T')[0]}
            //           onChange={(e) => onChange(e.target.value)}
            //           InputLabelProps={{
            //             shrink: true,
            //           }}
            //           inputProps={{
            //             min: new Date().toISOString().split('T')[0],
            //           }}
            //           error={value === '' || value === undefined ? true : false}
            //           helperText={
            //             value === '' || value === undefined ? 'Required' : ''
            //           }
            //           // required={value === "" ? true : false}
            //           // error={value === "" ? true : false}
            //         />
            //       </>
            //     )
            //   },
            //   searchable: true,
            // },

            {
              title: 'Voucher Active Days',
              field: 'activeTillDays',
              type: 'numeric',
              export: true,
              searchable: true,
              emptyValue: '--',
            },
            {
              export: false,
              title: 'Offer Expiry Date',
              field: 'validTill',
              type: 'date',
              emptyValue: '--',
              render: (rowData) => moment(rowData.validTill).format('LL'),

              // validate: (rowData) => {
              //   if (rowData.validFrom > rowData.validTo) {
              //     return "Please select valid to date";
              //   }
              // },
              editComponent: ({ value, onChange, rowData }) => {
                // console.log(value);
                return (
                  <>
                    <TextField
                      id="date"
                      type="date"
                      inputProps={{
                        min: new Date().toISOString().split('T')[0],
                      }}
                      value={value?.split('T')[0]}
                      onChange={(e) => onChange(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={
                        value === '' || value === undefined
                          ? true
                          : new Date(value) < new Date(rowData?.validFrom)
                          ? true
                          : `${new Date(value)} === ${new Date(
                              rowData?.validFrom
                            )}`
                          ? false
                          : false
                      }
                      helperText={
                        value === '' || value === undefined
                          ? 'Required'
                          : new Date(value) < new Date(rowData?.validFrom)
                          ? 'Valid Till should be greater than Valid From '
                          : ''
                      }
                    />
                  </>
                )
              },
              // render: ({ endDate }) => moment(endDate).format("ll"),
            },

            {
              title: 'Min Order Amount',
              field: 'cashback',
              type: 'numeric',
              export: true,
              searchable: true,
              hidden: true,
            },
            {
              title: 'Discount (%)',
              field: 'Discount',
              type: 'numeric',
              export: true,
              searchable: true,
              hidden: true,
            },
            {
              title: 'Min Order Amount',
              field: 'minOrderAmount',
              type: 'numeric',
              emptyValue: '--',
              render: ({ minOrderAmount }) => formatCurrency(minOrderAmount),
              export: false,
              searchable: true,
            },
            {
              title: 'Discount',
              field: 'discount',
              type: 'numeric',
              render: ({ discount }) => formatCurrency(discount),
              emptyValue: '--',
              validate: (rowData) =>
                rowData?.discount > 0 ? true : 'Required',

              export: false,
              searchable: true,
            },
            // {
            //   title: 'Max Uses',
            //   field: 'maxUses',
            //   type: 'numeric',
            //   emptyValue: '--',
            // },
            {
              title: 'Status',
              field: 'isActive',
              export: false,
              emptyValue: '--',
              lookup: {
                true: 'Active',
                false: 'Inactive',
              },
              render: (row) => (
                <>
                  <Chip
                    size="small"
                    variant="outlined"
                    color="secondary"
                    label={row?.isActive ? 'Active' : 'Inactive'}
                  />
                </>
              ),
            },
            {
              title: 'Status',
              field: 'status',
              searchable: true,
              hidden: true,
              export: true,
            },
            {
              title: 'Timestamp',
              field: 'createdAt',
              render: ({ createdAt }: any) =>
                moment(new Date(createdAt)).format('LLL'),
              editable: 'never',
            },
            {
              title: 'Timestamp',
              // width: "70%",
              field: 'timestamp',
              editable: 'never',
              hidden: true,
              export: true,
              // render: ({ timestamp }) => moment(timestamp).format("lll"),
            },
          ]}
          editable={{
            onRowAdd: async (data) => {
              try {
                const response = await post({
                  path: 'coupon',
                  body: JSON.stringify({
                    type: 'VOUCHER',
                    startDate: new Date(),
                    endDate: data?.validTill,
                    title: data?.title,
                    description: data?.description,
                    discount: data?.discount,
                    maxDiscount: data?.maxDiscount,
                    maxUses: data?.maxUses,
                    activeTillDays: data?.activeTillDays,
                    isActive: data?.isActive,
                    minOrderAmount: data?.minOrderAmount,
                  }),
                  token: 'CGHAccessToken',
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
            onRowUpdate: async (newData, oldData) => {
              try {
                const response = await put({
                  path: `coupon/${oldData?._id}`,
                  body: JSON.stringify({
                    endDate: newData?.validTill,
                    title: newData?.title,
                    description: newData?.description,
                    discount: newData?.discount,
                    maxDiscount: newData?.maxDiscount,
                    maxUses: newData?.maxUses,
                    activeTillDays: newData?.activeTillDays,
                    isActive: newData?.isActive,
                    minOrderAmount: newData?.minOrderAmount,
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
            onRowDelete: async (oldData) => {
              try {
                const response = await remove({
                  path: `coupon/${oldData?._id}`,
                  token: 'CGHAccessToken',
                  headers: {
                    'Content-Type': 'application/json',
                  },
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
export default withAdmin(vouchers)
