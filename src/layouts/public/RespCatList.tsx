import * as React from 'react'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'
import CategoryType from 'types/category'
import useSWRAPI from 'hooks/useSWRAPI'
const catListArr = [
  {
    id: 1,
    name: 'AYUSH Products',
  },
  {
    id: 2,
    name: 'Gourmet Foods',
  },
  {
    id: 3,
    name: 'Personal Care',
  },
  {
    id: 4,
    name: 'Home Care',
  },
  {
    id: 5,
    name: 'Sweets',
  },
]

export default function RespCatList() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const handleClick = () => {
    setOpen(!open)
  }
  const { data, isValidating } = useSWRAPI('categories')
  if (isValidating && !data) return <div>Loading...</div>
  if (!data) return null

  return (
    <div className="w-full">
      <div onClick={handleClick} className="flex items-center text-theme">
        <MenuIcon className="!text-base" />
        <p className="m-2">All Category</p>
        {open ? (
          <ExpandLess className="!text-base" />
        ) : (
          <ExpandMore className="!text-base" />
        )}
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="flex w-full flex-col items-center">
          {data?.data?.data?.data.map((curElm: CategoryType, index: any) => (
            <React.Fragment key={index}>
              <p
                className="flex w-full border-b-2 p-3 text-sm"
                onClick={() =>
                  router.push({
                    pathname: `/products/`,
                    query: { id: curElm._id },
                  })
                }
              >
                {curElm.name}
              </p>
            </React.Fragment>
          ))}
        </div>
      </Collapse>
    </div>
  )
}
