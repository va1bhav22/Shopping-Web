import { formatCurrency } from '@ashirbad/js-core'
import {
  Category,
  ExpandMore,
  MonetizationOn,
  Storefront,
} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Container,
  Divider,
  Drawer,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import moment from 'moment'
type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
}
const BillingDrawer = ({ open, onClose }: any) => {
  const Details = open
  console.log(Details)
  return (
    <>
      <Drawer
        anchor="right"
        open={Details}
        onClose={() => onClose && onClose()}
      >
        <Container
          style={{
            width: '32vw',
            marginTop: '5vh',
          }}
        >
          <Typography
            className="!text-theme"
            align="left"
            sx={{ fontWeight: 'bold', paddingLeft: '1.10vw' }}
            variant="h5"
          >
            View Order Details
          </Typography>
          <div>
            <Typography
              align="left"
              color=""
              sx={{
                fontWeight: '',
                marginTop: '2vh',
                paddingLeft: '1.5vw',
                paddingBottom: '0px',
                marginBottom: '2vh',
              }}
              variant="body1"
            >
              {Details?._id}
              <br />
              {moment(Details?.createdAt)?.format('llll')}
            </Typography>
          </div>
          <div>
            <Typography
              className="!text-theme"
              sx={{
                paddingLeft: '1.4vw',
                mb: 0,
                marginTop: '1vh',
                fontWeight: 'bold',
              }}
            >
              Product Details
            </Typography>

            <Tooltip title="Product Details">
              <ListItem sx={{ paddingLeft: '1.4vw', marginTop: '' }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    className="!bg-theme_extra_light"
                    src={Details?.rider?.photoURL}
                  >
                    <Category />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={Details?.productName}
                  secondary={
                    Details?.quantity
                      ? `${Details?.product?.measureUnit} ${Details?.product?.measureType} × ${Details?.quantity} `
                      : '--'
                  }
                />
              </ListItem>
            </Tooltip>
            {Details?.store && (
              <>
                <Typography
                  className="!text-theme"
                  sx={{
                    paddingLeft: '1.4vw',
                    mb: 0,
                    marginTop: '1vh',
                    fontWeight: 'bold',
                  }}
                >
                  Store Details
                </Typography>
                <Tooltip title="Store Details">
                  <ListItem sx={{ paddingLeft: '1.4vw' }}>
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        className="!bg-theme_extra_light"
                        src={Details?.driver?.photoURL}
                      >
                        <Storefront />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={Details?.store?.displayName}
                      secondary={Details?.store.email}
                    />
                  </ListItem>
                </Tooltip>
              </>
            )}
            <Divider />
            {/* <Tooltip title="Vehicle Type">
              <ListItem sx={{ paddingLeft: '1.4vw' }}>
                <ListItemAvatar>
                  <Avatar                     className="!bg-theme_extra_light"
>
                    <TwoWheeler />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={Details?.driver?.vehicle?.vehicleType?.name}
                  secondary={`${
                    Details?.driver?.vehicle?.make?.name
                      ? Details?.driver?.vehicle?.make?.name
                      : '--'
                  } ${
                    Details?.driver?.vehicle?.model?.name
                      ? Details?.driver?.vehicle?.model?.name
                      : ''
                  }`}
                />
              </ListItem>
            </Tooltip>
            <Divider /> */}
            {Details?.billing && (
              <Tooltip title="Amount">
                <ListItem sx={{ paddingLeft: '1.4vw' }}>
                  <ListItemAvatar>
                    <Avatar variant="rounded" className="!bg-theme_extra_light">
                      <MonetizationOn />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      Details?.billing?.totalPrice
                        ? formatCurrency(Details?.totalPrice)
                        : '--'
                    }
                    primary={'Total Price'}
                  />
                </ListItem>
              </Tooltip>
            )}
            <Divider />
            <Typography
              align="left"
              className="!text-theme"
              sx={{
                fontWeight: '',
                marginTop: '2vh',
                paddingLeft: '1.10vw',
                paddingBottom: '0px',
                marginBottom: '1.5vh',
              }}
              variant="body1"
            >
              {/* Pick: {Details?.pickAddress}{" "}
              {moment(Details?.pick)?.format("hh:mm a")} */}
              Shipped From:{' '}
              <span
                style={{
                  color: 'black',
                }}
              >
                {' '}
                {/* {Details?.pickupLocation?.address
                  ? Details?.pickupLocation?.address
                  : '--'} */}
                {Details?.shippedFrom
                  ? `${Details?.shippedFrom?.street} ${Details?.shippedFrom?.city} ${Details?.shippedFrom?.state} ${Details?.shippedFrom?.zip}
                          ${Details?.shippedFrom?.country}`
                  : 'N/A'}
              </span>
              <br />
              {/* Drop: {Details?.dropAddress}{" "}
              {moment(Details?.drop)?.format("hh:mm a")} */}
              Shipped To:{' '}
              <span
                style={{
                  color: 'black',
                }}
              >
                {/* {Details?.dropLocation?.address
                  ? Details?.dropLocation?.address
                  : '--'}{' '} */}
                {Details?.shippedTo
                  ? `${Details?.shippedTo?.street} ${Details?.shippedTo?.city} ${Details?.shippedTo?.state} ${Details?.shippedTo?.zip}
                          ${Details?.shippedTo?.country}`
                  : 'N/A'}
              </span>
            </Typography>
            {/* </Tooltip> */}
            <Divider />

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  className="!text-theme"
                  sx={{
                    fontWeight: 'bold',
                    // paddingLeft: "1.10vw",
                    // marginTop: "1vh",
                    marginBottom: '0vh',
                  }}
                >
                  Bill Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ marginTop: '0vh' }}>
                <ListItem
                  sx={{ marginBottom: '0vh' }}
                  // disableGutters
                  // secondaryAction={formatCurrency(Details?.billing?.baseFare)}
                  secondaryAction={
                    Details?.billing?.basePrice
                      ? formatCurrency(Details?.billing?.basePrice)
                      : '--'
                  }
                >
                  <ListItemText primary={'Base Price'} />
                </ListItem>
                <ListItem
                  sx={{ marginBottom: '0vh' }}
                  // disableGutters
                  // secondaryAction={formatCurrency(Details?.billing?.baseFare)}
                  secondaryAction={
                    Details?.billing?.deliveryCharge
                      ? formatCurrency(Details?.billing?.deliveryCharge)
                      : '--'
                  }
                >
                  <ListItemText primary={'Delivery Charge'} />
                </ListItem>
                <Divider />

                {/* <ListItem
                  sx={{
                    marginTop: "0vh",
                    marginBottom: "0vh",
                    padding: "0vh 1.11vw",
                  }}
                  // disableGutters
                  secondaryAction={formatCurrency(Details?.rideAmount)}
                >
                  <ListItemText primary={"Coupon Savings"} />
                </ListItem> */}
                {/* <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "0vh" }}
                  // disableGutters
                  secondaryAction={formatCurrency(Details?.billing?.roundedOff)}
                >
                  <ListItemText primary={"Rounded Off"} />
                </ListItem>
                <Divider /> */}
                <ListItem
                  sx={{ marginTop: '0vh', marginBottom: '0vh' }}
                  // disableGutters
                  // secondaryAction={formatCurrency(
                  //   Details?.billing?.baseFare + Details?.billing?.totalTax
                  // )}
                  secondaryAction={
                    Details?.billing?.totalPrice
                      ? formatCurrency(Details?.billing?.totalPrice)
                      : '--'
                  }
                >
                  {Details?.billing?.GST && (
                    <ListItemText
                      primary={'Total Bill'}
                      secondary={`includes ${formatCurrency(
                        Details?.billing?.GST
                      )} Taxes`}
                    />
                  )}
                </ListItem>

                <Divider />
                <ListItem
                  sx={{ marginTop: '0vh', marginBottom: '1vh' }}
                  // disableGutters
                  secondaryAction={formatCurrency(Details?.billing?.totalPrice)}
                >
                  <ListItemText
                    primary={'Total Payable'}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                {/* <div className="zigzag"> </div> */}
                <ListItem sx={{ marginTop: '1vh' }}>
                  <ListItemText
                    primary={'Payment'}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                <ListItem
                  sx={{ marginTop: '0vh', marginBottom: '1vh' }}
                  // disableGutters
                  secondaryAction={
                    Details?.billing?.totalPrice
                      ? formatCurrency(Details?.billing?.totalPrice)
                      : '--'
                  }
                >
                  <ListItemText
                    primary={
                      Details?.billing?.paymentMethod
                        ? Details?.billing?.paymentMethod
                        : '--'
                    }
                    // primary={'CASH'}
                  />
                </ListItem>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* <Typography
              align=" center"
              color="slategray"
              variant="h6"
              sx={{ marginTop: "2vh" }}
            >
              House No - Mmjdsrhet Sri Satya Sai Enclave,Lane-175, Khandagiri
              ,Bhubaneswar
            </Typography> */}
        </Container>
      </Drawer>
    </>
  )
}

export default BillingDrawer
