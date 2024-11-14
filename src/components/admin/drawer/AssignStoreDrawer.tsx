import { Clear, Done, Store } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Avatar,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material'
import { put } from 'api'
import useSWRAPI from 'hooks/useSWRAPI'
import { useState } from 'react'
import Swal from 'sweetalert2'
type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const AssignStoreDrawer = ({ open, onClose, mutate }: Props) => {
  const [loading, setLoading] = useState<any[]>([])
  const { data } = useSWRAPI(`/store/all/stores`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, // If false, undefined data gets cached against the key.
    dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr)
  })

  const stores = data?.data?.data
  const addStore = async (store: any) => {
    setLoading((prev) => [...prev, store?._id])
    // const updatedStores = open?.store ? [...open.store, store] : [store?._id]
    try {
      const response = await put({
        path: `/store/manager/assign/${store?._id}`,
        body: JSON.stringify({
          managerId: open?._id,
        }),
        token: 'CGHAccessToken',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      onClose()
      setLoading([])
      response?.status === 200
        ? Swal.fire({ text: response?.message, icon: 'success' })
        : Swal.fire({ text: response?.error, icon: 'error' })
    } catch (error) {
      console.log(error)
    } finally {
      mutate()
    }
  }
  const removeStore = async (store: any) => {
    setLoading((prev) => [...prev, store?._id])
    // const updatedStores = open?.store ? [...open.store, store] : [store?._id]
    try {
      const response = await put({
        path: `/store/manager/remove/${store?._id}`,
        body: JSON.stringify({
          managerId: open?._id,
        }),
        token: 'CGHAccessToken',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      onClose()
      setLoading([])
      response?.status === 200
        ? Swal.fire({ text: response?.message, icon: 'success' })
        : Swal.fire({ text: response?.error, icon: 'error' })
    } catch (error) {
      console.log(error)
    } finally {
      mutate()
    }
  }
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: '30vw',
            marginTop: '5vh',
          }}
        >
          {stores?.length > 0 && (
            <Typography
              align="center"
              color="text.primary"
              variant="h6"
              sx={{ marginBottom: 1 }}
            >
              Assign Store
            </Typography>
          )}
          {stores?.length > 0
            ? stores?.map((store: any) => {
                const hasStore = open?.store
                  ? open?.store === store?._id
                  : false
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
                            <Store />
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
                        <ListItemSecondaryAction>
                          <LoadingButton
                            loading={loading.includes(store?._id)}
                            onClick={() =>
                              !hasStore ? addStore(store) : removeStore(store)
                            }
                          >
                            {!hasStore ? <Done /> : <Clear />}
                          </LoadingButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </div>
                )
              })
            : 'No Stores Found'}
        </Container>
      </Drawer>
    </>
  )
}

export default AssignStoreDrawer
