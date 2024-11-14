import { LoadingButton } from '@mui/lab'
import { Alert, AlertTitle } from '@mui/material'
import { empty_notification } from 'assets/home'
import CommonBanner from 'components/CommonBanner'
import Pagination from 'components/core/pagination'
import useAuthFetch from 'hooks/useAuthFetch'
import useSWRAPI from 'hooks/useSWRAPI'
import { PrivateRoute, PublicLayout } from 'layouts'
import MyAccountNavLayout from 'layouts/myAccountNavbar'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import NotificationType from 'types/notification'

const Notifications = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="Notifications | Prizen">
        <CommonBanner title="Notifications" />
        <MyAccountNavLayout>
          <AllNotifications />
        </MyAccountNavLayout>
      </PublicLayout>
    </PrivateRoute>
  )
}

const AllNotifications = () => {
  const [limit, setLimit] = React.useState<number>(10)
  const [chunk, setChunk] = React.useState<number>(0)
  const { data, isValidating, mutate } = useSWRAPI(
    `notifications/?limit=${limit}&chunk=${chunk}`,
    {
      revalidateOnFocus: false,
    }
  )

  const {
    isLoading: isDeletingNotifications,
    mutate: fetchDeleteNotifications,
  } = useAuthFetch()
  const { isLoading: isMarkAsReadAllLoading, mutate: fetchMarkAsReadAll } =
    useAuthFetch()
  const { mutate: fetchMarkAsRead } = useAuthFetch()

  const deleteNotifications = async () => {
    await fetchDeleteNotifications({
      path: 'notifications',
      method: 'DELETE',
    })
    setChunk(0)
    mutate()
  }
  const markAsReadNotifications = async () => {
    await fetchMarkAsReadAll({
      path: `notifications/mark-as-read`,
      method: 'PUT',
    })
    mutate()
  }
  const markAsReadOne = async (id: string) => {
    const data = await fetchMarkAsRead({
      path: `notification/mark-as-read/${id}`,
      method: 'PUT',
    })
    mutate()
  }
  if (isValidating)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-white p-10 text-center">
        <div className="flex w-full flex-row justify-end gap-2 p-2">
          <Skeleton height={40} width={110} />
          <Skeleton height={40} width={110} />
        </div>
        {Array(6)
          .fill(0)
          ?.map((_, index) => (
            <div
              key={index}
              className="flex min-h-[5rem] w-full flex-col items-start gap-2 rounded-md border-2 border-gray-200 p-2"
            >
              <Skeleton height={25} width={80} />
              <Skeleton height={15} width={235} />
            </div>
          ))}
      </div>
    )
  if (!data?.data?.data?.data?.length && !chunk) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 bg-white p-10 text-center">
        <img src={empty_notification.src} alt="notifications" />
        <h1 className="mt-4 mb-2 text-lg font-semibold tracking-wide">
          All caught up!
        </h1>
        <p className="text-sm text-slate-800">
          There are no new notifications for you.
        </p>
      </div>
    )
  }
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 bg-white p-10 text-center">
      <div
        className="flex w-full flex-row justify-end gap-2 
      p-2"
      >
        <LoadingButton
          className="rounded-lg bg-gray-100 px-5 py-1 text-black hover:bg-blue-200"
          color="info"
          size="small"
          onClick={markAsReadNotifications}
          loading={isMarkAsReadAllLoading}
          disabled={isMarkAsReadAllLoading}
        >
          Mark All As Read
        </LoadingButton>
        <LoadingButton
          className="rounded-lg bg-gray-100 px-5 py-1 text-black hover:bg-red-200"
          color="error"
          size="small"
          loading={isDeletingNotifications}
          disabled={isDeletingNotifications}
          onClick={deleteNotifications}
        >
          Delete All
        </LoadingButton>
      </div>
      {data?.data?.data?.data?.map((notification: NotificationType) => (
        <div
          key={notification._id}
          className="flex w-full flex-row items-center "
        >
          <Alert
            className="w-full cursor-pointer text-left"
            onClick={() => markAsReadOne(notification._id)}
            variant={!notification?.isRead ? 'filled' : 'outlined'}
          >
            <AlertTitle>{notification?.title}</AlertTitle>
            {notification?.message}
          </Alert>
        </div>
      ))}
      <Pagination
        chunk={chunk}
        setChunk={setChunk}
        isLastChunk={data?.data?.data?.isLastChunk}
        isLoading={isValidating}
      />
    </div>
  )
}

export default Notifications
