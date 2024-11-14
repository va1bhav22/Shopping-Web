import dynamic from 'next/dynamic'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function LineGraphMonth({
  type,
}: {
  type: 'bar' | 'area' | 'line'
}) {
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
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
          },
          tooltip: {
            x: {
              format: 'month',
            },
          },
        }}
        series={[
          {
            name: 'Funding Agencies',
            data: [31, 40, 28, 51, 42, 109, 100, 86, 90, 101, 25, 30],
          },
          {
            name: 'Departments',
            data: [11, 32, 45, 32, 34, 52, 41, 60, 30, 120, 80, 90],
          },
          {
            name: 'Financial Years',
            data: [1, 24, 23, 11, 22, 16, 25, 40, 30, 50, 40, 60],
          },
        ]}
        type={type}
      />
    </div>
  )
}
