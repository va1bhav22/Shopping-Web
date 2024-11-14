import { advertisement, app_store, play_store } from "assets/home";

const MobileAppAd = () => {
  return (
    <article className="bg-[#CEE7DB] py-12">
      <section className="main-container flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between md:gap-6">
        <aside className="flex w-full flex-col items-center gap-6 text-center md:items-start md:gap-8 md:text-left">
          <h1 className="text-2xl font-bold tracking-wide md:text-4xl">
            Make your online shop easier with our{" "}
            <span className="text-theme"> mobile app</span>
          </h1>
          <p className="tracking-wide text-gray-500">
            Prizen makes online shopping fast and easy. Get 100% genuine
            products delivered.
          </p>
          <div className="flex items-center justify-start gap-4">
            <img
              src={app_store.src}
              alt="apple-store"
              className="w-36 cursor-pointer rounded-md object-cover"
            />
            <a
              href="https://play.google.com/store/apps/details?id=com.prizenapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={play_store.src}
                alt="play-store"
                className="w-36 cursor-pointer rounded-md object-cover"
              />
            </a>
          </div>
        </aside>
        <aside className="w-full">
          <img src={advertisement.src} alt="man-with-veggies" />
        </aside>
      </section>
    </article>
  );
};

export default MobileAppAd;
