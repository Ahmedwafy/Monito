import * as images from "@/assets/images/images";
import * as icons from "@/assets/icons";
import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";

// Hero Cover Component [ Dog with Cat Image ]
const HeroCover = () => {
  return (
    <section className="container mx-auto px-4 sm:px-0 my-6">
      <div className="relative bg-[#fceed5] dark:bg-[#00171f] rounded-[20px] overflow-hidden flex flex-col-reverse md:flex-row items-stretch justify-between shadow-sm min-h-[350px] transition-colors duration-300">
        {/* Decorative Background Elements */}
        {/* Top Right Shape */}
        <div className="absolute -top-[20%] -right-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-[50px] rotate-[25deg] bg-[#f7dba7] dark:bg-[#12212a] opacity-50 dark:opacity-80 z-0 pointer-events-none transition-colors duration-300"></div>
        {/* Bottom Left Shape */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-[40px] -rotate-[15deg] bg-[#003459] dark:bg-[#f7dba7] opacity-10 dark:opacity-5 z-0 pointer-events-none transition-colors duration-300"></div>

        {/* Content Section (Text) */}
        <div className="order-1 md:order-2 relative z-10 w-full md:w-1/2 px-6 py-10 md:px-12 md:py-14 text-center md:text-left flex flex-col justify-center items-center md:items-start transition-colors duration-300">
          <h1 className="text-4xl md:text-5xl font-extrabold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) mb-2 transition-colors duration-300">
            One More Friend
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#002a48] dark:text-[#fdfdfd] transition-colors duration-300">
            Thousands more fun!
          </h2>

          <p className="text-base md:text-lg font-medium mb-8 max-w-lg text-[#242b33] dark:text-[#ebeeef] transition-colors duration-300">
            Having a pet means you have more joy, a new friend, a happy person
            who will always be with you to have fun. We have 200+ different pets
            that can meet your needs!
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link href="/" className="inline-block">
              <Button
                variant="primary"
                className="group transition-all duration-300 flex items-center gap-2
            sm:text-(--color-secondary-monYellow) dark:bg-(--color-neutral-0)
            dark:text-(--color-secondary-monYellow) dark:border-1
            dark:border-(--color-primary-darkBlue)!
            dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-(--color-neutral-0) dark:border dark:border-(--color-secondary-monYellow)! dark:hover:border-(--color-neutral-0)!
            "
              >
                View Intro
                <icons.CircleArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-115" />
              </Button>
            </Link>

            <Link href="/AvailablePets" className="inline-block">
              <Button
                variant="outline"
                className="transition-all duration-300 dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-[#00171f]"
              >
                Explore Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex order-2 md:order-1 relative z-10 w-full md:w-1/2 justify-center md:justify-end items-end pt-0 px-0">
          <div className="relative w-full h-full">
            <Image
              src={images.homeCover2}
              alt="pets"
              fill
              className="object-contain object-bottom md:object-right-bottom drop-shadow-2xl z-20 md:scale-105 md:origin-bottom transition-transform duration-500 hover:scale-110"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCover;
