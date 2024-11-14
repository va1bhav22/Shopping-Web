import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material'
import { FC, UIEvent, useRef, useState } from 'react'
import CardHolderStyle from 'styles/core/CardHolder.module.css'

type Props = {
  title?: string
  children: React.ReactNode
  viewMoreLink?: boolean
  gap?: string
  scrollStep?: number
}

const CardHolder: FC<Props> = ({
  title,
  children,
  viewMoreLink,
  gap,
  scrollStep,
}) => {
  const [ScrollPosition, setScrollPosition] = useState(0)
  const childWarper = useRef<HTMLSpanElement | null>(null)
  const Scrollable = useRef<HTMLDivElement | null>(null)
  const ScrollLeft = () => {
    if (scrollStep) {
      const scroll_by =
        (childWarper.current &&
          childWarper.current.children[0].scrollWidth * scrollStep) ||
        0
      return Scrollable?.current?.scrollBy(scroll_by, 0)
    }
    Scrollable?.current?.scrollBy(Scrollable?.current?.clientWidth, 0)
  }
  const ScrollRight = () => {
    if (scrollStep) {
      const scroll_by =
        (childWarper.current &&
          childWarper.current.children[0].scrollWidth * scrollStep) ||
        0
      return Scrollable?.current?.scrollBy(-scroll_by, 0)
    }
    Scrollable?.current?.scrollBy(-Scrollable?.current?.clientWidth, 0)
  }
  return (
    <div className={CardHolderStyle.layout}>
      <div className={CardHolderStyle.container}>
        {/* for the title and view all button */}
        <span className={CardHolderStyle.titleWarper}>
          {title && <span>{title}</span>}
          {viewMoreLink && <button>View</button>}
        </span>
        {/* for the cards */}
        <div
          ref={Scrollable}
          className={CardHolderStyle.CardWarper}
          onScroll={(e: UIEvent<HTMLDivElement>) =>
            setScrollPosition(
              e.currentTarget.offsetWidth + e.currentTarget.scrollLeft
            )
          }
          id="one"
        >
          {/* children component render place */}
          <span
            style={{ display: 'flex', gap: gap || '0' }}
            id="two"
            ref={childWarper}
          >
            {children}
          </span>
          {/* arrows for scroll */}
          {Scrollable.current &&
            ScrollPosition - Scrollable.current.offsetWidth !== 0 &&
            ScrollPosition !== 0 && (
              <span onClick={ScrollRight} className={CardHolderStyle.leftArrow}>
                <ArrowBackIosNewRounded />
              </span>
            )}
          {ScrollPosition !== Scrollable?.current?.scrollWidth && (
            <span onClick={ScrollLeft} className={CardHolderStyle.rightArrow}>
              <span className="material-icons-round md-18">
                <ArrowForwardIosRounded />
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardHolder
