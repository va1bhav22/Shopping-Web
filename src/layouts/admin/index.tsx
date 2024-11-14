import {
  Avatar,
  Badge,
  Chip,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import { ICONS } from 'assets'
import { useAuth, useFetch } from 'hooks'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { NotificationType } from 'types'
import { useRouter } from 'next/router'
import { useMenuItems } from 'hooks'
import Drawer from './drawer'
import { Logout, Settings } from '@mui/icons-material'
import useSWRAPI from 'hooks/useSWRAPI'
type Props = {
  children: JSX.Element
  title?: string
}
export default ({ children, title = 'Prizen' }: Props) => {
  const { data, mutate } = useSWRAPI('/notifications')

  const router = useRouter()
  const MenuItems = useMenuItems()
  const [isOpen, setIsOpen] = useState(true)
  const [chatCount, setChatCount] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { user, logOut } = useAuth()
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/main_logo.png" />
      </Head>
      <Drawer open={isOpen} onToggle={() => setIsOpen(!isOpen)} />

      <main
        className={`min-h-screen bg-white ${
          isOpen
            ? 'ml-[calc(100vw-calc(100vw-240px))] w-[calc(100vw-240px)]'
            : 'ml-[calc(100vw-calc(100vw-72px))] w-[calc(100vw-72px)]'
        } dashboard-main `}
      >
        <header className={`h-16 bg-white`}>
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl uppercase lg:block">
              {user?.role === 'MANAGER' ? `${user?.role} / ` : ''}
              {MenuItems.find((item) => item.route === router.pathname)?.title}
              {
                MenuItems.find((item) =>
                  item?.submenus?.find(
                    (submenus) => submenus.route === router?.pathname
                  )
                )?.title
              }
              {MenuItems.find((item) =>
                item?.submenus?.find(
                  (submenus) => submenus.route === router?.pathname
                )
              )?.title ? (
                <span> / </span>
              ) : (
                <span> </span>
              )}
              {
                MenuItems.find((item) =>
                  item?.submenus?.find(
                    (submenus) => submenus.route === router?.pathname
                  )
                )?.submenus?.find(
                  (submenus) => submenus.route === router?.pathname
                )?.title
              }
            </h1>
            <div className="flex items-center gap-6">
              <Badge
                badgeContent={
                  data?.data?.data?.data?.filter(
                    (notification: NotificationType) =>
                      notification?.isRead === false
                  ).length
                }
                color="warning"
              >
                <Link legacyBehavior href="/admin/notifications">
                  <a className="cursor-pointer rounded-lg bg-theme p-2 shadow-md">
                    <ICONS.Notification className="h-6 w-6 text-white" />
                  </a>
                </Link>
              </Badge>

              {/* <Badge
                color="success"
                variant="dot"
                invisible={!Boolean(chatCount)}
              >
                <Link legacyBehavior  href="/admin/messages">
                  <a className="cursor-pointer rounded-lg bg-theme p-2 shadow-md">
                    <ICONS.Chat className="h-6 w-6 text-white" />
                  </a>
                </Link>
              </Badge> */}
              <div className="flex w-fit min-w-[8rem]  items-center justify-start gap-2 overflow-hidden rounded-full bg-white">
                <Avatar
                  src=""
                  className="cursor-pointer !bg-theme"
                  onClick={handleClick}
                />
                <span
                  className="flex cursor-pointer flex-col gap-1"
                  onClick={handleClick}
                >
                  <h2 className="cursor-pointer text-lg font-medium tracking-wide text-black">
                    Profile
                  </h2>
                  {/* <h5 className="text-xs font-medium tracking-wide text-black">
                    superadmin@gmail.com
                  </h5> */}
                </span>
                {/* <Chip
                className=''
            onClick={handleClick}
            avatar={<Avatar alt="" src="" />}
            label="Profile"
            variant="outlined"
          /> */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem>
                    {/* <Avatar alt="" src="" /> */}
                    <ListItemText
                      // primary={`Super Admin`}
                      primary={`${user?.displayName}`}
                      secondary={user?.email}
                    />
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => router?.push('/admin/change-password')}
                  >
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={() => logOut()}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </header>
        {children}
      </main>
    </>
  )
}
