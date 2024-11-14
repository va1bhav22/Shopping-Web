import { Options } from '@material-table/core'
import { ExportCsv, ExportPdf } from '@material-table/exporters'
import { BASE_URL } from 'api'
import { CartItemType } from 'types'

export const MuiTblOptions = () => {
  const options: Options<any> = {
    headerStyle: {
      whiteSpace: 'nowrap',
      backgroundColor: '#f15a24',
      color: '#fff',
      fontWeight: '',
      fontSize: '0.9rem',
      fontFamily: 'inherit',
    },
    rowStyle: { backgroundColor: '#fff', color: '#2e2929', fontSize: '0.9rem' },
    actionsColumnIndex: -1,
    addRowPosition: 'first',
    pageSize: 5,
    detailPanelColumnAlignment: 'right',
    exportAllData: true,
    headerSelectionProps: { color: 'secondary' },
    selectionProps: () => ({
      color: 'secondary',
    }),
    exportMenu: [
      {
        label: 'Export All Data In CSV',
        exportFunc: (cols: any, data: any) => ExportCsv(cols, data, 'AllData'),
      },
      {
        label: 'Export All Data In PDF',
        exportFunc: (cols: any, data: any) => ExportPdf(cols, data, 'AllData'),
      },
    ],
  }
  return options
}

//------------------
//TODO: Calculation of TOTAL_PRICE_BEFORE_DISCOUNT, DISCOUNT_AMOUNT, and TOTAL_PRICE_AFTER_DISCOUNT
//------------------

export const getPrice = (catchArray: CartItemType[]) => {
  const totalProductPriceWithDiscount = catchArray?.reduce((acc, curr) => {
    return acc + (curr?.weight?.currentPrice || 0) * curr?.quantity
  }, 0)
  const TotalProductPriceWithoutDiscount = catchArray?.reduce((acc, curr) => {
    return +(
      acc +
      (curr?.weight?.currentPrice || 0) *
      curr?.quantity *
      (1 + (curr?.weight?.discount || 0) / 100)
    ).toFixed(2)
  }, 0)
  const totalDiscountAmount = +(
    TotalProductPriceWithoutDiscount - totalProductPriceWithDiscount
  ).toFixed(2)
  const deliveryCharge = 50
  const sumTotalPriceCustomerWillPay =
    totalProductPriceWithDiscount + deliveryCharge

  return {
    totalProductPriceWithDiscount,
    TotalProductPriceWithoutDiscount,
    totalDiscountAmount,
    sumTotalPriceCustomerWillPay,
    deliveryCharge,
  }
}

export const getLocalStorageItem = (key: any) => {
  return typeof window !== 'undefined'
    ? localStorage.getItem(key) ?? null
    : null
}

export const saveToLocalStorage = (key: any, value: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value)
  }
}

export const removeFromLocalStorage = (key: any) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}
export const downloadPdf = async (rowData: any) => {
  const authToken = getLocalStorageItem('CghRefreshToken')
  const accessToken = getLocalStorageItem('CghAccessToken')
  const res = await fetch(`${BASE_URL}/invoice-html/${rowData?._id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (res?.status === 401) {
    const getResponse = await fetch(`${BASE_URL}/auth/get-access-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        refresh_token: authToken,
      }),
    })
    const getResponseData = await getResponse.json()
    const response = await fetch(`${BASE_URL}/invoice-html/${rowData?._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getResponseData?.ACCESS_TOKEN}`,
      },
    })

    const data = await response.blob()

    const url = window.URL.createObjectURL(data)
    window.open(url, '', 'width=800,height=500')?.print()
  }
  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)
  window.open(url, '', 'width=800,height=500')?.print()
}

export const getDiscountValue = (MRP: number, salePrice: number) =>
  (((MRP - salePrice) / MRP) * 100).toFixed(0)

// get days from seconds
export const getDaysFromSeconds = (seconds: number) =>
  Math.floor(seconds / 86400)

export const currencyFormatter = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value)
}
