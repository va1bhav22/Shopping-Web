import {
  ayush_2,
  food_category,
  home_category,
  personal_care_category,
  sweets_category,
} from 'assets/home'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const categoryArr = [
  {
    img: ayush_2.src,
    name: 'AYUSH Products',
    path: '/ayush-products',
  },
  {
    img: personal_care_category.src,
    name: 'Personal Care',
    path: '/personal-care',
  },
  {
    img: food_category.src,
    name: 'Gourmet Foods',
    path: '/gourmet-foods',
  },
  {
    img: home_category.src,
    name: 'Home Care',
    path: '/home-care',
  },
  {
    img: sweets_category.src,
    name: 'Sweets',
    path: '/sweets',
  },
]

const CategoryHeader = () => {
  return (
    <section className="border-b bg-white">
      <section className="main-container relative flex items-center justify-between gap-4">
        {categoryArr.map((curElm, index) => (
          <div className="group">
            <div
              key={index}
              className="flex cursor-pointer flex-col items-center gap-2 py-3"
            >
              <img src={curElm.img} alt="logo" className="h-16 w-28" />
              <span className="flex items-center gap-2 text-xs tracking-wider group-hover:text-theme">
                {curElm.name}
                <ExpandMoreIcon className="" />
              </span>
            </div>

            <div className="absolute left-1/2 top-full z-10 hidden h-80 w-[90vw] -translate-x-1/2 items-center justify-center border-2 border-black bg-white group-hover:flex">
              <p>You can see all product here soon..</p>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}

export default CategoryHeader
