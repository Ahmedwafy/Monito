import * as images from "@/assets/images/images";
import * as icons from "@/assets/icons";
import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";

// Hero Cover Component [ Dog with Cat Image ]
const HeroCover = () => {
  return (
    <section className="px-4 sm:px-4 rounded-2xl h-auto flex items-center">
      <div className="container relative flex flex-col-reverse sm:flex-row justify-between mx-auto h-auto bg-(--color-primary-darkBlue) overflow-hidden rounded-2xl py-10">
        <div className="sm:w-1/2 relative z-99 mt-3 sm:mt-16">
          <Image
            src={images.homeCover2}
            alt="pets"
            className="scale-160 z-100 pt-18 sm:pt-0 sm:max-md:scale-160 sm:absolute sm:-top-10"
          />
        </div>
        <div className="sm:w-1/2 relative z-10 px-2 sm:px-3 lg:-mt-6 h-60 flex flex-col justify-center">
          <h1 className="text-3xl font-bold flex justify-center sm:max-md:text-(--color-secondary-monYellow)!">
            One More Friend
          </h1>
          <h2 className="text-xl flex justify-center font-semibold pt-4 pb-2 sm:max-md:text-(--color-secondary-monYellow)!">
            Thousands more fun!
          </h2>
          <p className="relative mb-4 sm:max-md:text-(--color-secondary-monYellow) md:text-(--color-primary-darkBlue) lg:w-full lg:px-10">
            Having a pet means you have more joy, a new friend, a happy person
            who will always be with you to have fun. We have 200+ different pets
            that can meet your needs!
          </p>
          <div className="flex gap-4 justify-center sm:justify-end mt-5 sm:mt-2 sm:px-2 relative md:mt-0">
            <Button
              // variant="outline"
              variant="primary"
              className="group transition-all duration-300 flex items-center gap-2 sm:text-(--color-secondary-monYellow)"
            >
              View Intro
              <icons.CircleArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-115" />
            </Button>

            <Link href="/AvailablePets">
              <Button className="sm:text-(--color-secondary-monYellow)">
                Explore Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="h-[600px] w-[600px] lg:h-[800px] lg:w-[800px] absolute -right-30 rotate-20 sm:rotate-30 -top-60 sm:-top-70 bg-[#fceed5] rounded-[60px]"></div>
        <div className="h-[700px] w-[700px] rotate-25 sm:rotate-30 sm:max-md:left-40 top-125 sm:max-md:top-10 absolute bg-(--color-primary-darkBlue-80) rounded-[60px]"></div>
      </div>
    </section>
  );
};

export default HeroCover;
