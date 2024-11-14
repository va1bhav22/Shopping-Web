import { formatCurrency } from '@ashirbad/js-core'
import { LocalShipping, Money, Person, ShoppingBag } from '@mui/icons-material'

import { InfoCards } from 'components/admin'
import { NarrowLineGraph, YearlyGraph } from 'components/admin/analytics'
import { withAdmin } from 'components/hoc'
import { useIsMounted } from 'hooks'
import useSWRAPI from 'hooks/useSWRAPI'
import { AdminLayout } from 'layouts'
import { useEffect, useState } from 'react'

const dashboard = () => {
  const { data } = useSWRAPI('/admin/total-dashboard-data', {})
  const CardData = data?.data?.data
  const monthlyRevenue = useSWRAPI('admin/monthly-revenue', {})
  const monthlyReport = useSWRAPI('/admin/monthly-report', {})
  const [allTimeLine, setAllTimeLine] = useState<any[]>([])
  const [productValue, setProductValue] = useState<any[]>([])
  const [customersValue, setCustomersValue] = useState<any[]>([])
  const [ordersValue, setOrdersValue] = useState<any[]>([])
  const isMounted = useIsMounted()
  useEffect(() => {
    if (
      !monthlyReport?.data?.data?.data?.productReport?.timeLine ||
      !monthlyReport?.data?.data?.data?.userReport?.timeLine ||
      !monthlyReport?.data?.data?.data?.orderReport?.timeLine ||
      !monthlyReport?.data?.data?.data?.productReport?.value
    )
      return
    const allTimeline = Array.from(
      new Set([
        ...monthlyReport?.data?.data?.data?.productReport?.timeLine,
        ...monthlyReport?.data?.data?.data?.userReport?.timeLine,
        ...monthlyReport?.data?.data?.data?.orderReport?.timeLine,
      ])
    )
    setAllTimeLine(allTimeline)

    const productValue = allTimeline?.map((item) => {
      const findIndexNumber =
        monthlyReport?.data?.data?.data?.productReport?.timeLine.findIndex(
          (item2: string) => item2 === item
        )
      if (findIndexNumber === -1) {
        return 0
      }
      return monthlyReport?.data?.data?.data?.productReport?.value?.[
        findIndexNumber
      ]
    })
    setProductValue(productValue)
    if (
      !monthlyReport?.data?.data?.data?.productReport?.timeLine ||
      !monthlyReport?.data?.data?.data?.userReport?.timeLine ||
      !monthlyReport?.data?.data?.data?.orderReport?.timeLine ||
      !monthlyReport?.data?.data?.data?.userReport?.value
    )
      return
    const customersValue = allTimeline?.map((item) => {
      const findIndexNumber =
        monthlyReport?.data?.data?.data?.userReport?.timeLine.findIndex(
          (item2: string) => item2 === item
        )
      if (findIndexNumber === -1) {
        return 0
      }
      return monthlyReport?.data?.data?.data?.userReport?.value?.[
        findIndexNumber
      ]
    })
    setCustomersValue(customersValue)

    if (
      !monthlyReport?.data?.data?.data?.productReport?.timeLine ||
      !monthlyReport?.data?.data?.data?.userReport?.timeLine ||
      !monthlyReport?.data?.data?.data?.orderReport?.timeLine ||
      !monthlyReport?.data?.data?.data?.orderReport?.value
    )
      return
    const ordersValue = allTimeline?.map((item) => {
      const findIndexNumber =
        monthlyReport?.data?.data?.data?.orderReport?.timeLine.findIndex(
          (item2: string) => item2 === item
        )
      if (findIndexNumber === -1) {
        return 0
      }
      return monthlyReport?.data?.data?.data?.orderReport?.value?.[
        findIndexNumber
      ]
    })
    setOrdersValue(ordersValue)
    return () => {
      isMounted.current = false
    }
  }, [monthlyReport?.data?.data?.data])

  // console.log({ allTimeline })
  return (
    <AdminLayout>
      <section className="m-8">
        <div className="grid grid-cols-12 content-between gap-4 ">
          <InfoCards
            title="Orders"
            content={CardData?.totalOrders}
            iconClassName="bg-orange-500"
            titleClassName=" text-lg"
            contentClassName=""
            className="col-span-12 w-full bg-orange-100 sm:col-span-12 md:col-span-6 lg:col-span-3"
            icon={<LocalShipping className="h-8 w-8 rounded-md  text-white" />}
            clickableRoute="/admin/orders/b2c-orders"
          />
          <InfoCards
            title="Products"
            content={CardData?.totalProducts}
            icon={<ShoppingBag className="h-8 w-8 rounded-md  text-white" />}
            iconClassName="bg-orange-500"
            titleClassName=" text-lg"
            contentClassName=""
            className="col-span-12 w-full bg-orange-100 sm:col-span-12 md:col-span-6 lg:col-span-3"
            clickableRoute="/admin/b2c-products/manage"
          />
          <InfoCards
            title="Customers"
            content={CardData?.totalCustomers}
            icon={<Person className="h-8 w-8 rounded-md  text-white" />}
            iconClassName="bg-orange-500"
            titleClassName=" text-lg"
            contentClassName=""
            className="col-span-12 w-full bg-orange-100 sm:col-span-12 md:col-span-6 lg:col-span-3"
            clickableRoute="/admin/customers"
          />
          <InfoCards
            title="Revenue"
            content={`${formatCurrency(CardData?.totalSales)}`}
            icon={<Money className="h-8 w-8 rounded-md  text-white" />}
            iconClassName="bg-orange-500"
            titleClassName=" text-lg"
            contentClassName=""
            className="col-span-12 w-full bg-orange-100 sm:col-span-12 md:col-span-6 lg:col-span-3"
            clickableRoute="/admin/reports"
          />
          <div className="col-span-12 mt-4 w-full rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:col-span-12 lg:col-span-6">
            {' '}
            <h1
              className="mt-5 pl-7 text-lg font-bold text-theme
            "
            >
              Monthly Report
            </h1>
            <NarrowLineGraph
              type="area"
              // text="Monthly Report"
              productsArray={productValue || []}
              customersArray={customersValue || []}
              ordersArray={ordersValue || []}
              categories={allTimeLine || []}
            />
          </div>
          <div className="col-span-12 mt-4 w-full rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:col-span-12 lg:col-span-6">
            {' '}
            <h1
              className="mt-5 pl-7 text-lg font-bold text-theme
            "
            >
              Monthly Revenue
            </h1>
            <YearlyGraph
              type="bar"
              // text="Monthly Revenue"
              monthlyData={monthlyRevenue?.data?.data?.data?.value || []}
              Categories={monthlyRevenue?.data?.data?.data?.timeLine || []}
            />
          </div>
        </div>
      </section>
    </AdminLayout>
  )
}

export default withAdmin(dashboard)
