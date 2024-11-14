import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import PinterestIcon from '@mui/icons-material/Pinterest'
import TwitterIcon from '@mui/icons-material/Twitter'
import { IconButton } from '@mui/material'
import { MAIN_LOGO } from 'assets/home'
import useSWRAPI from 'hooks/useSWRAPI'
import Link from 'next/link'
import CategoryType from 'types/category'

const footerArr = [
  {
    id: 1,
    heading: 'Quick Links',
    list: [
      {
        title: 'Home',
        path: '/',
      },
      {
        title: 'About Us',
        path: '/about',
      },

      {
        title: 'Products',
        path: '/products',
      },
    ],
  },
  {
    id: 2,
    heading: 'Category',
    list: [],
  },
  {
    id: 3,
    heading: 'Account',
    list: [
      {
        title: 'My Account',
        path: '/my-account/profile',
      },
      {
        title: 'Order History',
        path: '/my-account/my-order',
      },
      {
        title: 'Wishlist',
        path: '/wishlist',
      },
    ],
  },

  {
    id: 4,
    heading: 'Support',
    list: [
      {
        title: 'Contact Us',
        path: '/contact',
      },
      {
        title: 'Privacy Policy',
        path: '/privacy-policy',
      },
      {
        title: 'Terms & Conditions',
        path: '/terms-and-conditions',
      },
      {
        title: 'Shipping Policy',
        path: '/shipping-policy',
      },
      {
        title: 'Refund Policy',
        path: '/refund-policy',
      },
    ],
  },
]

const Footer = () => {
  const { isValidating, data } = useSWRAPI('/categories?limit=5&chunk=0')
  return (
    <footer className="">
      <article className="main-container py-10 md:py-16">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          <aside className="">
            <div className="flex flex-col gap-4">
              <Link legacyBehavior href="/">
                <img
                  src={MAIN_LOGO.src}
                  alt="logo"
                  className="w-44 cursor-pointer"
                />
              </Link>
              <p className="text-sm tracking-wider text-gray-600">
                The variety of products available at our store at the moment is
                vast, but we still continue to widen our assortment.
              </p>
              <div className="flex gap-1">
                <a
                  href="https://www.facebook.com/people/Prizen-Brand/pfbid0nHPPMgUqRBqQju8YMHNDtsvt1FvyviSjcbh5zE2RGFaMgpmXLvQ78cY9EGMqf787l/?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <IconButton className="!text-facebook transition-all duration-300 ease-in-out hover:-translate-y-1 hover:!bg-theme hover:!text-white">
                    <Facebook />
                  </IconButton>
                </a>
                <a
                  href="https://www.instagram.com/prizenbusiness/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <IconButton className="!text-instagram transition-all duration-300 ease-in-out hover:-translate-y-1 hover:!bg-theme hover:!text-white">
                    <Instagram />
                  </IconButton>
                </a>
                <a
                  href="https://twitter.com/PrizenBusiness"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <IconButton className="!text-twitter transition-all duration-300 ease-in-out hover:-translate-y-1 hover:!bg-theme hover:!text-white">
                    <Twitter />
                  </IconButton>
                </a>
                <a
                  href="https://www.linkedin.com/company/prizen-business"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <IconButton className="!text-linkedin transition-all duration-300 ease-in-out hover:-translate-y-1 hover:!bg-theme hover:!text-white">
                    <LinkedIn />
                  </IconButton>
                </a>
              </div>
            </div>
          </aside>
          {footerArr.map((curElm, index) => (
            <aside className="" key={index}>
              <div>
                <h1 className="mb-2 text-xl font-bold text-theme">
                  {curElm.heading}
                </h1>
                <ul className="flex flex-col">
                  {curElm?.heading?.toUpperCase() === 'CATEGORY'
                    ? data?.data?.data?.data?.map(
                        (category: CategoryType, index: number) => (
                          <li key={index}>
                            <Link
                              legacyBehavior
                              href={`/products?id=${category?._id}`}
                              passHref
                            >
                              <a className="footer-li relative mt-4 flex w-fit cursor-pointer list-none items-center text-sm capitalize tracking-wide text-gray-800 transition-all duration-500 ease-in-out hover:ml-[8px] hover:text-theme   ">
                                <ChevronRightIcon className="text-base" />
                                {category?.name}
                              </a>
                            </Link>
                          </li>
                        )
                      )
                    : curElm.list.map((curElm, index: number) => (
                        <Link
                          legacyBehavior
                          href={curElm?.path || '/'}
                          key={index}
                        >
                          <li className="footer-li relative mt-4 flex w-fit cursor-pointer list-none items-center text-gray-800 transition-all duration-500 ease-in-out hover:ml-[8px] hover:text-theme">
                            <ChevronRightIcon className="text-base" />
                            <a className="text-sm tracking-wide  transition-all duration-500 ease-in-out ">
                              {curElm.title}
                            </a>
                          </li>
                        </Link>
                      ))}
                </ul>
              </div>
            </aside>
          ))}
        </section>
      </article>
      <article className="bg-theme">
        <div className="main-container flex flex-col py-4 md:flex-row md:justify-between">
          <p className="text-center text-sm text-white md:text-left">
            &copy; {new Date().getFullYear()}{' '}
            <span className="text-shadow"> Prizen. </span> All Rights Reserved.
          </p>
          <p className="flex flex-col text-center text-sm text-white md:flex-row md:text-left">
            Designed and Developed by
            <span className="ml-2 text-[#FFE5B3] hover:text-blue-300">
              <a href="https://searchingyard.com/">
                SearchingYard Software Private Limited
              </a>
            </span>
          </p>
        </div>
      </article>
    </footer>
  )
}

export default Footer
