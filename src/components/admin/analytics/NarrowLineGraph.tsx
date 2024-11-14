import dynamic from 'next/dynamic'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  type: 'line' | 'bar' | 'area'
  text?: string
  productsArray?: any[]
  customersArray?: any[]
  ordersArray?: any[]
  categories: any[]
}

export default function NarrowLineGraph({
  type,
  text = '',
  productsArray = [],
  customersArray = [],
  ordersArray = [],
  categories = [],
}: Props) {
  return (
    <div className="rounded-md bg-white p-6 shadow-lg">
      <ApexCharts
        options={{
          title: {
            text: text,
          },
          chart: {
            height: 350,
            type: type,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            type: 'category',
            categories: categories,
          },
          tooltip: {
            x: {
              format: 'month',
            },
          },
        }}
        series={[
          {
            name: 'Products',
            data: productsArray,
          },
          {
            name: 'Customers',
            data: customersArray,
          },
          {
            name: 'Orders',
            data: ordersArray,
          },
        ]}
        type={type}
      />
    </div>
  )
}
