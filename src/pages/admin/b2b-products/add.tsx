import { AddProductForm } from 'components/admin'
import { withAdmin } from 'components/hoc'
import { AdminLayout } from 'layouts'

const add = () => {
  return (
    <AdminLayout title="Admin | Add B2B Product">
      <>
        <AddProductForm businessType={'B2B'} />
        {/* </div> */}
      </>
    </AdminLayout>
  )
}

export default withAdmin(add)
