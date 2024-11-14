import { Delete } from '@mui/icons-material'
import { put, remove } from 'api'
import { ICONS } from 'assets'
import { NOT_FOUND } from 'assets/animations'
import { Empty } from 'components/core'
import { withAdmin } from 'components/hoc'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import moment from 'moment'
import { Fragment } from 'react'
import Swal from 'sweetalert2'

const notifications = () => {
  const { data, mutate } = useSWRAPI('/notifications', {
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
    // revalidateOnMount: true, // If false, undefined data gets cached against the key.
    // dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const notifications = data?.data?.data?.data
  console.log(notifications)
  const readAllNotifications = async () => {
    const res = await put({
      path: '/notifications/mark-as-read',
      token: 'CGHAccessToken',
    })

    if (res.status === 200) {
      Swal.fire({
        title: 'Success',
        text: 'All notifications read',
        icon: 'success',
        confirmButtonText: 'Ok',
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    }
    mutate()
  }
  const deleteAllNotifications = async () => {
    // console.log('delete all notification')
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.value) {
          const Response = await remove({
            path: '/notifications',
            token: 'CGHAccessToken',
          })
          mutate()
          Response?.status === 200
            ? Swal.fire(
                'Deleted!',
                'Your notifications have been deleted',
                'success'
              )
            : Swal.fire('Error!', 'Something went wrong.', 'error')
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  const handleDeleteNotification = async (id: any) => {
    // console.log('delete all notification')
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.value) {
          const Response = await remove({
            path: `/notification/${id}`,
            token: 'CGHAccessToken',
          })
          mutate()
          Response?.status === 200
            ? Swal.fire(
                'Deleted!',
                'Your notification has been deleted.',
                'success'
              )
            : Swal.fire('Error!', 'Something went wrong.', 'error')
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <AdminLayout title="Notifications | Admin Panel">
      <>
        <section className="px-4 py-4">
          {/* <div className="flex items-center justify-between"> */}
          {/* <p className="text-2xl font-semibold leading-6 text-gray-800">
            Notifications
          </p> */}
          {notifications?.length > 0 && (
            <div className="text-right">
              <button
                className="mr-2 rounded-md bg-green-300 px-4 py-2 text-right shadow-md"
                onClick={readAllNotifications}
              >
                Read All
              </button>
              <button
                className="rounded-md bg-red-300 px-4 py-2 text-right shadow-md"
                onClick={deleteAllNotifications}
              >
                Delete All
              </button>
            </div>
          )}
          {/* </div> */}

          {/* <Empty title={'No notifications yet'} src={NOT_FOUND.src} /> */}
          {notifications?.length ? (
            <>
              {notifications?.map(
                ({ _id, title, message, createdAt, isRead }: any) => (
                  <Fragment key={_id}>
                    <div className="mt-4 flex w-full cursor-pointer items-center rounded bg-white p-3 shadow duration-300 hover:shadow-lg">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                        <ICONS.Notification
                          className={`h-6 w-6 ${
                            isRead ? 'text-black' : 'text-sky-700'
                          }`}
                        />
                      </div>
                      <div className="flex w-full items-center justify-between pl-3">
                        <div className="grid w-4/5 gap-2">
                          <h4
                            className={`text-lg leading-none ${
                              isRead ? 'text-black' : 'text-sky-700'
                            }`}
                          >
                            {title}
                          </h4>
                          <p className="text-sm leading-5 text-gray-500">
                            {moment(new Date(createdAt)).fromNow()}
                          </p>
                        </div>
                        <p className="flex cursor-pointer text-xs leading-3">
                          <ICONS.ChevronRight
                            className={`mr-2 h-6 w-6 text-black`}
                            onClick={() => {
                              Swal.fire({
                                title: title,
                                html: message,
                                showCloseButton: true,
                              })
                              put({
                                path: `notification/mark-as-read/${_id}`,
                                body: JSON.stringify({ isRead: true }),
                                token: 'CGHAccessToken',
                              })
                              mutate()
                              // database
                              //   .ref(`notifications/${user?.uid}/${id}`)
                              //   .update({ isRead: true })
                            }}
                          />
                          <Delete
                            className={`h-6 w-6 text-red-500`}
                            onClick={() => handleDeleteNotification(_id)}
                          />
                        </p>
                      </div>
                    </div>
                  </Fragment>
                )
              )}
            </>
          ) : (
            <Empty title={'No notifications yet'} src={NOT_FOUND.src} />
          )}
        </section>
      </>
    </AdminLayout>
  )
}

export default withAdmin(notifications)
