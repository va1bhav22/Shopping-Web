import dynamic from 'next/dynamic'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function AreaLine({ type }: { type: 'bar' | 'area' | 'line' }) {
  const options = {
    series: [
      {
        name: 'Funding Agencies',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'Departments',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
      {
        name: 'Financial Years',
        data: [1, 24, 23, 11, 22, 16, 25],
      },
    ],
    options: {
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
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      tooltip: {
        x: {
          format: 'day',
        },
      },
    },
  }

  return (
    <div className="rounded-md bg-white p-6 shadow-lg">
      <ApexCharts
        options={{
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
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          tooltip: {
            x: {
              format: 'day',
            },
          },
        }}
        series={options.series}
        type={type}
      />
    </div>
  )
}
