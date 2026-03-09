import Button from "../atoms/Button";
import * as icons from "@/assets/icons";
import * as images from "@/assets/images/images";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-[#FDECCE] w-full overflow-hidden md:h-[600px]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-10 md:py-20 gap-10 md:gap-16">
        {/* Left Section (Text + Buttons) */}
        <div className="flex flex-col items-start sm:items-center text-center md:text-left w-full md:w-1/2">
          <div className="relative mb-6">
            <div className="absolute -top-2 -left-3 w-10 h-10 rotate-25 bg-[--color-secondary-monYellow] rounded-[30%] z-0"></div>

            <h1 className="relative flex text-4xl sm:text-5xl md:text-5xl font-bold z-10">
              One More Friend
            </h1>

            <h2 className="relative flex text-2xl sm:text-3xl md:text-4xl font-semibold mt-2 z-10">
              Thousands More Fun!
            </h2>

            <p className="mt-6 text-[#555] leading-relaxed max-w-md mx-auto md:mx-0">
              Having a pet means you have more joy, a new friend, a happy person
              who will always be with you to have fun. We have 200+ different
              pets that can meet your needs!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6 z-10 w-full sm:w-auto pb-20">
            {/* <Button variant="outline" className="flex items-center gap-2">
              View Intro <icons.CircleArrowRight />
            </Button> */}

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

        {/* Right Section (Image + Shapes) */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center md:mr-10 md:top-10">
          {/* Background Shapes */}
          <div className="absolute bg-(--color-primary-darkBlue) -top-10 sm:-top-16 left-10 sm:left-20 w-64 sm:w-96 h-64 sm:h-96 md:h-125 md:w-125 md:-left-10 md:top-5 rotate-10 rounded-[20%] z-0"></div>
          <div className="absolute bg-(--color-secondary-monYellow) top-0 sm:-top-8 left-20 sm:left-32 w-64 sm:w-96 h-64 sm:h-96 md:h-160 md:w-125 md:-left-2 md:-top-10 rotate-25 rounded-[20%] z-0"></div>

          {/* Girl Carrying Her Pet Image */}
          <div className="relative z-10 -top-8 sm:top-0">
            <Image
              src={images.homeCover1}
              alt="homeCover1"
              className="w-[220px] sm:w-[280px] md:w-[350px] h-auto mx-auto scale-200 md:scale-250"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
