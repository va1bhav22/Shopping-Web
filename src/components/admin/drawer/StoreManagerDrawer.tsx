import {
  Avatar,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'

import { SupervisedUserCircle } from '@mui/icons-material'

import useSWRAPI from 'hooks/useSWRAPI'
// import { PhotoUpload } from "./core";
type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
}

const StoreManagerDrawer = ({ open, onClose, setRealtime }: Props) => {
  const { data } = useSWRAPI(`/store/${open?._id}/managers`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })
  const managers = data?.data?.data?.data

  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: '25vw',
            marginTop: '6vh',
          }}
        >
          {managers?.length > 0 && (
            <Typography
              className="!ml-5"
              align="left"
              color="text.primary"
              variant="h6"
              sx={{ marginBottom: 1 }}
            >
              Managers List
            </Typography>
          )}
          {managers?.length > 0 ? (
            managers?.map((store: any) => {
              const hasStore = open?.store ? open?.store === store?._id : false
              return (
                <div className="" key={store?.key}>
                  <List>
                    <ListItem
                      sx={{
                        paddingLeft: '1.4vw',
                        marginTop: '0vh',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={store?.imageURL}
                          sx={{ background: 'green' }}
                        >
                          <SupervisedUserCircle />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={store?.displayName}
                        secondary={
                          <>
                            <div>{store?.phoneNumber}</div>
                            <div> {store?.email}</div>
                          </>
                        }
                        primaryTypographyProps={{
                          fontWeight: 'bold',
                          fontSize: '1.3vw',
                          color: '#1877f2',
                        }}
                        secondaryTypographyProps={{
                          fontSize: '1vw',
                          marginTop: '1vh',
                        }}
                      />
                    </ListItem>
                  </List>

                  {/* <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt=""
                        src={vehicle?.photoURL || ""}
                        sx={{ background: "transparent" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={vehicle?.displayName}
                      secondary={
                        <Typography>
                          {driver?.phoneNumber}
                          <br />
                          {driver?.email}
                        </Typography>
                      }
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        fontSize: "1.5vw",
                        color: "#1877f2",
                      }}
                      secondaryTypographyProps={{
                        fontSize: "1.3vw",
                        marginTop: "1vh",
                      }}
                    />

                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                          !hasVehicle ? addDriver(vehicle) : ""
                        }
                      >
                        {!hasVehicle ? <Done /> : ""}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List> */}
                </div>
              )
            })
          ) : (
            <div className="mt-[10vh] flex justify-center text-center">
              No Manager Assigned
            </div>
          )}
          {/* <Typography
            align="center"
            color="text.primary"
            variant="h5"
            sx={{ marginBottom: 3 }}
          >
            Add Store
          </Typography> */}
        </Container>
      </Drawer>
    </>
  )
}

export default StoreManagerDrawer
