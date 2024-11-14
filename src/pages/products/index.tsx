import CommonBanner from 'components/CommonBanner'
import FilterLayout from 'components/products/FilterLayout'
import { PublicLayout } from 'layouts'

const product = () => {
  return (
    <PublicLayout title="Products | Prizen">
      <CommonBanner title="All Products" />
      <FilterLayout />
    </PublicLayout>
  )
}

export default product
