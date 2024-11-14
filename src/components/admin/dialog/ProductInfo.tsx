import { formatCurrency } from '@ashirbad/js-core'
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import useSWRAPI from 'hooks/useSWRAPI'
type Props = {
  open?: any
  handleClose: () => void
}
const ProductInfo = ({ open, handleClose }: Props) => {
  const { data, mutate } = useSWRAPI(`product/${open?._id}/info`, {})
  const productInfo = data?.data?.data
  return (
    <>
      <Dialog
        open={Boolean(open)}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="!text-xl  !font-bold !text-orange-700">
          Product Info
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            className="!text-theme"
          >
            Product Name:{' '}
            <span style={{ color: 'black', fontSize: '15px' }}>
              {productInfo?.title}
            </span>
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            className="!text-theme"
          >
            Category:
            <span style={{ color: 'black', fontSize: '15px' }}>
              {open?.category?.name}
            </span>
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            className="!text-theme"
          >
            Short Desc:{' '}
            <span style={{ color: 'black', fontSize: '15px' }}>
              {productInfo?.shortDescription}
            </span>
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            className="!text-theme"
          >
            Description:{' '}
            <span style={{ color: 'black', fontSize: '15px' }}>
              {productInfo?.description}
            </span>
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            className="!text-theme"
          >
            Measure Type:{' '}
            <span style={{ color: 'black', fontSize: '15px' }}>
              {productInfo?.measureType}
            </span>
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            className="!text-theme"
          >
            Measure Unit:{' '}
            <span style={{ color: 'black', fontSize: '15px' }}>
              {productInfo?.measureUnit}
            </span>
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            className="!text-theme"
          >
            MRP:{' '}
            <span style={{ color: 'black', fontSize: '15px' }}>
              {productInfo?.mrp ? formatCurrency(productInfo?.mrp) : '--'}
            </span>
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            className="!text-theme"
          >
            Sale Price:{' '}
            <span style={{ color: 'black', fontSize: '15px' }}>
              {productInfo?.salePrice
                ? formatCurrency(productInfo?.salePrice)
                : '--'}
            </span>
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            className="!text-theme"
          >
            Stock:{' '}
            <span style={{ color: 'black', fontSize: '15px' }}>
              {' '}
              {productInfo?.stock ? productInfo?.stock : '--'}
            </span>
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProductInfo
