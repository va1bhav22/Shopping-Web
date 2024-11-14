import { AddProductForm } from 'components/admin'
import { withAdmin } from 'components/hoc'
import { AdminLayout } from 'layouts'

const add = () => {
  return (
    <AdminLayout title="Admin | Add B2C Product">
      <>
        {' '}
        <AddProductForm businessType={'B2C'} />
      </>
    </AdminLayout>
  )
}

export default withAdmin(add)
