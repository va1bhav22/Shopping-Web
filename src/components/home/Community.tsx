import { Grid } from '@mui/material'
import {
  chawanprash,
  jamun,
  mahua,
  mahua_jam,
  premium_cashew,
  pure_honey,
  woman_1,
  woman_2,
  woman_3,
  woman_4,
  woman_5,
  woman_6,
} from 'assets/home'
import { CommunityProductCard } from 'components/cards'

const communityArr = [
  {
    img: woman_1.src,
    title: 'Pure Wildforest Honey',
    back_img: pure_honey.src,
  },
  {
    img: woman_2.src,
    title: 'Premium Cashews',
    back_img: premium_cashew.src,
  },
  {
    img: woman_3.src,
    title: 'Chyawan Prash',
    back_img: chawanprash.src,
  },
  {
    img: woman_4.src,
    title: 'Mahua Laddu',
    back_img: mahua_jam.src,
  },
  {
    img: woman_5.src,
    title: 'Mahua Cookies',
    back_img: mahua.src,
  },
  {
    img: woman_6.src,
    title: 'Amla Murabba',
    back_img: jamun.src,
  },
]

const Community = () => {
  return (
    <section className="main-container pt-16">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-5xl">The Community</h1>
        <p className="mt-8 w-full tracking-wide text-gray-500 md:w-3/4">
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right at the coast of the Semantics, a large
          language ocean. A small river named Duden flows by their place and
          supplies it with the necessary regelialia.
        </p>
      </div>
      <Grid container spacing={4} className="!my-16">
        {communityArr.map((curElm, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CommunityProductCard curElm={curElm} index={index} />
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

export default Community
