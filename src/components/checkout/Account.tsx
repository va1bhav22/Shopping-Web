import CheckIcon from '@mui/icons-material/Check'
import { useAuth } from 'hooks'

const Account = () => {
  const { user } = useAuth()
  const { logOut } = useAuth()
  return (
    <div className="flex flex-col">
      <div className="flex-roe flex justify-between">
        <span className="mb-2 flex items-center gap-2">
          <h1 className="font-semibold uppercase text-gray-600">LOGIN</h1>
          <CheckIcon className="text-theme" />
        </span>
        <button
          className="border border-gray-200 px-6 py-2 text-sm tracking-wide text-theme"
          onClick={() => logOut()}
        >
          CHANGE
        </button>
      </div>
      <div>
        <span className="flex flex-row flex-wrap gap-2">
          <p className="text-sm">{user?.displayName}</p>
          <p className="text-sm">
            {user?.phoneNumber && (
              <span className="ml-2 text-gray-500">
                {user?.country?.phone && `+${user?.country?.phone}`}
                {user?.phoneNumber}
              </span>
            )}
          </p>
          <p className="text-sm">
            {user?.email && (
              <span className="ml-2 text-gray-500">{user?.email}</span>
            )}
          </p>
        </span>
      </div>
    </div>
  )
}

export default Account
