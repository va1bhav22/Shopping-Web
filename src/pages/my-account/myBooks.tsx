import CommonBanner from 'components/CommonBanner'
import useSWRAPI from 'hooks/useSWRAPI'
import { PrivateRoute, PublicLayout } from 'layouts'
import MyAccountNavLayout from 'layouts/myAccountNavbar'
import { useState } from 'react'

const MyBooksStore = () => {
  const [pdfSrc, setPdfSrc] = useState<any | Blob>()

  const handleClick = () => {
    const pdfPath = 'path/to/your/f'
    setPdfSrc(pdfPath)
  }
  return (
    <PrivateRoute>
      <PublicLayout title="My Books | Prizen">
        <CommonBanner title="My Books" />
        <MyAccountNavLayout>
          <MyBooks />
        </MyAccountNavLayout>
      </PublicLayout>
    </PrivateRoute>
  )
}

const MyBooks = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const openPopup = () => {
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  const { data, isValidating, mutate } = useSWRAPI('products/user/virtual')

  const VirtualData = data?.data?.data?.data

  // console.log('Cat==>', VirtualData)

  return (
    <div className=" grid h-full   justify-center gap-4 bg-white p-5 md:grid-cols-2 md:gap-0 xl:grid-cols-4">
      {VirtualData?.map((item: any) => (
        <div className=" h-[18rem] w-48 rounded-lg bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className="flex flex-col items-center justify-center gap-1 p-4">
            <h3 className="text-lg font-bold text-gray-700">{item?.title}</h3>
            <img
              src={item.category?.imageURL}
              alt={item.category?.imageURL}
              className=" h-44 rounded"
            />

            <button
              onClick={openPopup}
              className="mt-2 rounded-md bg-blue-500 px-3 py-2 text-sm text-white"
            >
              View PDF
            </button>
          </div>
          {isPopupOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 ">
              <div className="h-[600px] rounded-lg bg-white p-4 shadow-md">
                <button
                  onClick={closePopup}
                  className="absolute top-0 right-0 m-4 rounded-md bg-red-600 py-1 px-3 text-white"
                >
                  Close
                </button>
                {/* <PDFViewer /> */}
                <iframe
                  src={item?.pdf?.url}
                  width="600"
                  height="570"
                  title="PDF Viewer"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MyBooksStore
