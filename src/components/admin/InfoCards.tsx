import { useRouter } from 'next/router'

type Props = {
  title: string
  content?: string
  className?: string
  iconClassName?: string
  titleClassName?: string
  contain?: string
  contentClassName?: string
  clickableRoute?: string
  icon: React.ReactElement
}

export default function InfoCards({
  title,
  icon,
  content,
  className = '',
  iconClassName = '',
  titleClassName = '',
  contentClassName = '',

  clickableRoute = '',
}: Props) {
  const router = useRouter()
  return (
    <>
      <div
        onClick={() => router.push(`${clickableRoute}`)}
        className={` group flex cursor-pointer flex-row items-center gap-4  rounded-[1.5rem] border-b-4 border-[#f15a24] p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition duration-150 ease-in-out hover:bg-[#f15a24] ${className} `}
      >
        <div className={`rounded-xl  ${iconClassName}`}>
          <div className="h-full w-[20%] p-3 text-sm group-hover:text-white ">
            {icon}
          </div>
        </div>
        <div className="flex h-full w-2/3 flex-col ">
          <h4
            className={`text-lg font-semibold group-hover:text-white ${contentClassName}`}
          >
            {content}
          </h4>

          {/* <h4 className={`text-sm ${contentClassName}`}>{content}</h4> */}
          <h1
            className={`text-md font-medium group-hover:text-white ${titleClassName}`}
          >
            {title}
          </h1>
        </div>
      </div>
    </>
  )
}
