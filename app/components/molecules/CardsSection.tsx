import Link from "next/link";
import Button from "../atoms/Button";
import HeroCard from "./Card";
import type { StaticImageData } from "next/image";
import * as icons from "@/assets/icons";
// import * as images from "@/assets/images/images";

interface HeroCardsAreaProps {
  question?: string;
  title?: string;
  images?: StaticImageData[];
}
// const CardsSection: React.FC<HeroCardsAreaProps> = ({ question, title, image }) => {
// normalize to array for rendering
// const images = Array.isArray(image) ? image : image ? [image] : [];

const HeroCardsArea = ({
  question,
  title,
  images = [],
}: HeroCardsAreaProps) => {
  // Split images into two rows
  const firstRow = images.slice(0, 4);
  const secondRow = images.slice(4, 8);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="w-full mx-auto flex justify-between mb-10 px-4 md:px-2">
          <div>
            <p>{question}</p>
            <h3 className="text-2xl font-semibold text-[]">{title}</h3>
          </div>

          <div className="relative hidden sm:flex">
            <Link
              href="/"
              className="group flex items-center gap-2 text-(--color-primary-darkBlue) transition-colors hover:text-(--color-secondary-monYellow)"
            >
              <Button
                variant="outline"
                className="flex items-center gap-2 pr-6 transition-all duration-300"
              >
                View More
                <icons.ChevronRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 scale-125" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-10 justify-center">
          {/* 1st row */}
          <div className="flex flex-wrap gap-2 md:gap-0 lg:gap-30 justify-center items-center w-full">
            {firstRow.map((image, index) => {
              return (
                <div
                  key={index}
                  className="md:w-1/2 lg:w-auto flex items-center justify-center p-2 rounded-2xl sm:bg-transparent shadow-lg"
                >
                  <HeroCard image={image} />
                </div>
              );
            })}
          </div>
          {/* 2nd row */}
          <div className="flex flex-wrap gap-2 md:gap-0 lg:gap-30 justify-center items-center w-full">
            {secondRow.map((image, index) => {
              return (
                <div
                  key={index}
                  className="md:w-1/2 lg:w-auto flex items-center justify-center p-2 rounded-2xl sm:bg-transparent shadow-lg"
                >
                  <HeroCard image={image} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative sm:hidden flex px-4 sm:px-0 w-full pt-6">
          <Link
            href="/"
            className="group w-full flex items-center gap-2 text-(--color-primary-darkBlue) transition-colors hover:text-(--color-secondary-monYellow)"
          >
            <Button
              variant="outline"
              className="flex items-center gap-2 pr-6 transition-all duration-300 w-full"
            >
              View More
              <icons.ChevronRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 scale-125" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroCardsArea;
