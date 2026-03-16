import * as images from "@/assets/images/images";
import * as icons from "@/assets/icons";
import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";

const AdoptionCover = () => {
  return (
    <section className="px-4 sm:px-0 rounded-2xl h-auto flex items-center">
      <div className="container relative flex flex-col-reverse sm:flex-row justify-between mx-auto h-auto sm:h-[300px] bg-[#FFB775]) overflow-hidden rounded-2xl py-10 gap-2 sm:gap-0">
        <div className="sm:w-1/2 relative z-99 mt-3">
          <Image
            src={images.Adoption}
            alt="pets"
            className="scale-160 z-100 pt-18 sm:pt-4 sm:max-md:scale-160 lg:scale-100 lg:pt-0 lg:absolute lg:-top-15"
          />
        </div>
        <div className="sm:w-1/2 relative z-10 px-2 sm:px-0 sm:max-md:px-2">
          <h1 className="text-3xl font-bold flex justify-center items-center gap-4 ">
            <p className="text-(--color-secondary-monYellow)! sm:text-(--color-secondary-monYellow)! lg:text-(--color-primary-darkBlue)!">
              Adoption
            </p>
            <Image
              src={images.adoptionLogo}
              alt="Adoption-Logo"
              className="h-10 my-auto sm:max-md:hidden hidden sm:flex"
            />
          </h1>

          <div className="flex flex-col items-center justify-center py-4 text-center gap-2">
            <h3 className="text-(--color-secondary-monYellow)! sm:text-(--color-secondary-monYellow)! lg:text-(--color-primary-darkBlue)!">
              We Need Help. So Do They.
            </h3>
            <p className="text-(--color-secondary-monYellow)! sm:text-(--color-secondary-monYellow)! lg:text-(--color-primary-darkBlue)!">
              Adopt a pet and give it a home, it will be love you back
              unconditionally.
            </p>
          </div>
          <div className="flex gap-4 justify-center sm:justify-end mt-5 sm:mt-10 relative md:mt-0 lg:justify-center">
            <Link href="/" className="relative">
              <Button
                // variant="outline"
                variant="primary"
                className="group transition-all duration-300 flex items-center gap-2 sm:text-(--color-secondary-monYellow)"
              >
                View Intro
                <icons.CircleArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-115" />
              </Button>
            </Link>

            <Link href="/adopt-form">
              <Button className="sm:text-(--color-secondary-monYellow)">
                Explore Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="h-[600px] w-[600px] lg:w-[2000px] lg:h-[2000px] absolute -right-30 rotate-20 sm:rotate-30 -top-60 sm:-top-70 bg-(--color-primary-darkBlue-80) lg:-left-200 rounded-[60px]"></div>
        <div className="h-[700px] w-[700px] lg:w-[1600px] lg:h-[2000px] rotate-25 sm:rotate-30 sm:max-md:left-40 top-125 sm:max-md:top-10 absolute rounded-[60px] lg:top-0 lg:-right-130  bg-[#fceed5]"></div>
      </div>
    </section>
  );
};

export default AdoptionCover;
