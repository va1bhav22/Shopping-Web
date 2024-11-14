import { PublicLayout } from 'layouts'

export default () => {
  return (
    <PublicLayout title="404 Not Found">
      <div className="flex min-h-screen w-full items-center justify-center bg-[#ffffff]">
        <img
          src="https://i.giphy.com/media/C21GGDOpKT6Z4VuXyn/200w.webp"
          //   src="https://i.giphy.com/media/9J7tdYltWyXIY/giphy.webp"
          alt="404"
        />
      </div>
    </PublicLayout>
  )
}
