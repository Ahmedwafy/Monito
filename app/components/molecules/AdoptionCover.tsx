import * as images from "@/assets/images/images";
import * as icons from "@/assets/icons";
import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";

const AdoptionCover = () => {
  return (
    <section className="container mx-auto px-4 sm:px-0 my-6">
      <div className="relative bg-(--color-secondary-monYellow-40) dark:bg-[#002a48] rounded-[20px] overflow-hidden flex flex-col-reverse md:flex-row items-stretch justify-between shadow-sm min-h-[280px]">
        {/* Decorative Background Elements */}
        {/* Top Right Shape */}
        <div className="absolute -top-[20%] -right-[10%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-[50px] rotate-[25deg] bg-(--color-secondary-monYellow-80) dark:bg-[#00528c] opacity-40 dark:opacity-40 z-0 pointer-events-none transition-colors duration-300"></div>
        {/* Bottom Left Shape */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-[30px] -rotate-[15deg] bg-(--color-primary-darkBlue) dark:bg-[#00171f] opacity-10 dark:opacity-30 z-0 pointer-events-none transition-colors duration-300"></div>

        {/* Content Section (Text) */}
        <div className="order-1 md:order-2 relative z-10 w-full md:w-1/2 px-6 py-6 md:px-10 md:py-8 text-center md:text-left flex flex-col justify-center items-center md:items-start transition-colors duration-300">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) transition-colors duration-300">
              Adoption
            </h1>
            <Image
              src={images.adoptionLogo}
              alt="Adoption-Logo"
              className="h-8 w-auto hidden sm:block drop-shadow-md dark:invert"
            />
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-3 text-(--color-primary-darkBlue-80) dark:text-[#fdfdfd] transition-colors duration-300">
            We Need Help. So Do They.
          </h3>

          <p className="text-sm md:text-base font-medium mb-6 max-w-md text-(--color-neutral-80) dark:text-[#ebeeef] transition-colors duration-300">
            Adopt a pet and give it a home, and it will love you back
            unconditionally.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <Link href="/" className="inline-block">
              <Button
                variant="primary"
                className="group transition-all duration-300 flex items-center gap-2
            sm:text-(--color-secondary-monYellow) dark:bg-[#002a48]
            dark:text-(--color-secondary-monYellow) dark:border-1
            dark:border-(--color-primary-darkBlue)!
            dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-(--color-neutral-0) dark:border dark:border-(--color-secondary-monYellow)! dark:hover:border-(--color-neutral-0)!
            "
              >
                View Intro
                <icons.CircleArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-115" />
              </Button>
            </Link>

            <Link href="/adopt-form" className="inline-block">
              <Button
                variant="outline"
                className="transition-all duration-300 dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-[#002a48]"
              >
                Explore Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex order-2 md:order-1 relative z-10 w-full md:w-1/2 justify-end items-end pt-0 px-0">
          <div className="relative w-full h-full">
            <Image
              src={images.Adoption}
              alt="Adopt a pet"
              fill
              className="object-contain object-bottom md:object-right-bottom drop-shadow-xl z-20 md:scale-105 md:origin-bottom transition-transform duration-500 hover:scale-110"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptionCover;
