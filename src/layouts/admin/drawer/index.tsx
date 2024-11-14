import { Fragment, useState } from 'react'
import {
  Box,
  List,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  Button,
  ListItemButton,
  Collapse,
} from '@mui/material'
import {
  ExitToApp,
  ChevronLeft,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material'
import { CustomDrawer, CustomDrawerHeader } from './custom'
import { ICONS, LOGO } from 'assets'
import { useRouter } from 'next/router'
import { useAuth, useMenuItems } from 'hooks'
import { MAIN_LOGO } from 'assets/home'

type DrawerType = {
  onToggle?: () => void
  open?: boolean
}

const Drawer = ({ open, onToggle }: DrawerType) => {
  const router = useRouter()
  const { logOut, user } = useAuth()
  const [selectedSubMenu, setSelectedSubMenu] = useState('')
  const MenuItems = useMenuItems()
  return (
    <section className="dashboard-main">
      <CustomDrawer variant="permanent" open={open}>
        <CustomDrawerHeader>
          <div className="flex h-16 w-full items-center justify-between">
            <img
              src={MAIN_LOGO.src}
              alt=""
              className={`${open ? 'h-14 w-full pl-8' : 'hidden'}`}
            />
            <IconButton onClick={onToggle}>
              {open ? <ChevronLeft /> : <ICONS.Menu className="" />}
            </IconButton>
          </div>
        </CustomDrawerHeader>
        {/* <Divider /> */}
        {/* Render Menu Items */}

        <List sx={{ mt: '1px' }}>
          {MenuItems.map((item) => (
            <Fragment key={item.key}>
              <Tooltip
                title={item.title}
                followCursor
                arrow
                placement="top-end"
              >
                <ListItemButton
                  onClick={() => {
                    if (item?.route) return router?.push(item?.route)
                    item?.submenus &&
                      setSelectedSubMenu((prev) =>
                        prev === item.key ? '' : item.key
                      )
                  }}
                  className={
                    router.pathname === item.route
                      ? '!rounded-r-[25px] !bg-theme'
                      : ''
                  }
                  selected={
                    item?.submenus
                      ? selectedSubMenu === item?.key
                      : router?.pathname === item.route
                  }
                >
                  <ListItemIcon
                    className={
                      router.pathname === item.route ? '!bg-transparent' : ''
                    }
                    sx={{
                      minWidth: '42px',
                      background: 'transparent',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      variant="body1"
                      fontFamily={'"Helvetica", sans-serif'}
                    >
                      {item.title}
                    </Typography>
                  </ListItemText>
                  {item?.submenus &&
                    (selectedSubMenu === item?.key ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </ListItemButton>
              </Tooltip>
              {item?.submenus && (
                <Collapse
                  in={selectedSubMenu === item?.key}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item?.submenus?.map((submenu: any) => (
                      <ListItemButton
                        onClick={() => router.push(submenu.route)}
                        sx={{ pl: 4 }}
                        selected={router.pathname === submenu.route}
                        key={submenu?.key}
                        className={
                          router.pathname === submenu.route ? '!bg-theme' : ''
                        }
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: '42px',
                            background: 'transparent',
                          }}
                        >
                          {submenu?.icon}
                        </ListItemIcon>

                        <ListItemText
                          // primary={submenu?.title}
                          sx={{
                            whiteSpace: 'break-spaces',
                          }}
                        >
                          <Typography
                            variant="body2"
                            fontFamily={'"Helvetica", sans-serif'}
                          >
                            {submenu?.title}
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
              {/* <Divider /> */}
            </Fragment>
          ))}

          <Box hidden={open}>
            <Tooltip
              title={'Click Here To Logout'}
              followCursor
              arrow
              placement="top-end"
            >
              <ListItemButton onClick={() => logOut()}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItemButton>
            </Tooltip>
          </Box>
        </List>
        <Box
          sx={{ textAlign: 'center' }}
          className={`${
            open ? 'flex' : 'hidden'
          } flex-col items-center gap-2 pt-5`}
        >
          <Typography variant="body1" fontFamily={'"Helvetica", sans-serif'}>
            {`HI , ${user?.displayName}`}
          </Typography>
          <Typography variant="body2" fontFamily={'"Helvetica", sans-serif'}>
            Click Here To Logout
          </Typography>
          <div className="py-5">
            <Button
              variant="contained"
              onClick={() => logOut()}
              startIcon={<ExitToApp />}
              color="error"
              className="bg-red-500"
            >
              Logout
            </Button>
          </div>
        </Box>
      </CustomDrawer>
    </section>
  )
}

export default Drawer
