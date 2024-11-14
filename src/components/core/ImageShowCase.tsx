import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material'
import { useRef, useState } from 'react'
import ImageShowCaseStyle from 'styles/core/ImageShowCase.module.css'
import CardHolder from './CardHolder'

const ImageShowCase = ({ Images }: { Images: string[] }) => {
  const HeroImage = useRef<any>()
  const [activeImage, setActiveImage] = useState(0)

  const handelImageClick = (img: string, index: number) => {
    setActiveImage(index)
    HeroImage.current.style.backgroundImage = `url(${img})`
  }

  const ScrollRight = () => {
    const prev = activeImage ? activeImage - 1 : Images.length - 1
    setActiveImage(prev)
    HeroImage.current.style.backgroundImage = `url(${Images[prev]})`
  }

  const ScrollLeft = () => {
    const next = activeImage === Images.length - 1 ? 0 : activeImage + 1
    setActiveImage(next)
    HeroImage.current.style.backgroundImage = `url(${Images[next]})`
  }

  return (
    <div className={ImageShowCaseStyle.container}>
      <div
        ref={HeroImage}
        className={ImageShowCaseStyle.HeroElementWarper}
        style={{ backgroundImage: `url(${Images[0]})` }}
      >
        <span className={ImageShowCaseStyle.imageIndex}>
          {activeImage + 1}/{Images.length}
        </span>
        <span onClick={ScrollRight} className={ImageShowCaseStyle.leftArrow}>
          <ArrowBackIosNewRounded />
        </span>
        <span onClick={ScrollLeft} className={ImageShowCaseStyle.rightArrow}>
          <ArrowForwardIosRounded />
        </span>
      </div>
      <CardHolder>
        {Images.map((item, index) => {
          return (
            <div
              onClick={() => handelImageClick(item, index)}
              key={index}
              className={`${ImageShowCaseStyle.SliderImage} ${
                activeImage === index && ImageShowCaseStyle.active
              }`}
              style={{ backgroundImage: `url(${item})` }}
            ></div>
          )
        })}
      </CardHolder>
    </div>
  )
}

export default ImageShowCase
