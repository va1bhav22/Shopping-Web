import { about_2, about_3, about_4, common_banner } from 'assets/home'
import { PublicLayout } from 'layouts'
const aboutArr = [
  {
    img: about_2.src,
    title: 'Who We Are',
    subTitle:
      'Prizen Business Private Limited services excellence in the digital business of micro payments of services and remittances in a ‘real time’ environment is India’s Largest Payments Solutions Provider. Its business involves service aggregation and distribution, utilizing mobile, PoS and web for online payment processing and money transfer services in pan india.',
  },
  {
    img: about_3.src,
    title: 'What We Do',
    subTitle:
      'Prizen Business Private Limited is India’s largest mobile payments and ecommerce platform. Its started with big vision in online marketplace. In a short span of time, we are fastest growing network in online, AEPS Banking, Payments & ecommerce market',
  },
]

const About = () => {
  return (
    <PublicLayout title="About Us | Prizen">
      {/* //?info Hero section */}
      <article
        style={{ backgroundImage: `url(${common_banner.src})` }}
        className="relative h-[32rem] w-full bg-cover bg-center before:absolute before:top-0 before:left-0 before:-z-0 before:h-full before:w-full before:bg-[rgba(0,0,0,.6)] before:content-[''] "
      >
        <div className="main-container flex w-full items-center justify-start">
          <div className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center gap-6 pr-6 text-center text-white md:w-1/2 md:items-start md:pr-0 md:text-left">
            <h1 className="text-3xl text-white md:text-7xl">About Prizen</h1>
            <p className="tracking-wide ">
              Prizen Business Private Limited is a Digital, Fintech & Ecommerce
              services provider registered company. We are work in many Sectors,
              by a team of professionals with experience in Digital Banking,
              Payments & Ecommerce industry.
            </p>
          </div>
        </div>
      </article>
      {/* //?info Feature section */}
      <article className="main-container flex flex-col gap-20 py-16">
        {aboutArr.map((curElm, index) => (
          <section className="flex w-full flex-col items-center" key={index}>
            <aside
              className={`flex w-full flex-col items-center gap-10 md:justify-between ${
                index === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <div className="w-full">
                <img src={curElm.img} alt="women-at-work" className="w-full" />
              </div>
              <div className="w-full">
                <h1 className="mb-4 text-2xl font-semibold md:text-4xl">
                  {curElm.title}
                </h1>
                <div className="mb-4 w-20 border-b-2 border-theme"></div>
                <p className="text-sm tracking-wider text-gray-500">
                  {curElm.subTitle}
                </p>
              </div>
            </aside>
          </section>
        ))}
      </article>
    </PublicLayout>
  )
}

export default About
