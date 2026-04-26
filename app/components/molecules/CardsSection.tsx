import Link from "next/link";
import Button from "../atoms/Button";
import HeroCard from "./Card";
import type { StaticImageData } from "next/image";
import * as icons from "@/assets/icons";

interface HeroCardsAreaProps {
  type: "pets" | "products";
  question?: string;
  title?: string;
  images?: StaticImageData[];
}

const HeroCardsArea = ({
  type,
  question,
  title,
  images = [],
}: HeroCardsAreaProps) => {
  // build mock data using images
  const cardInfo = images.map((image, index) => {
    // 🐶 PETS
    if (type === "pets") {
      return {
        id: index + 1,
        name: `${index + 1}`,
        breed:
          index < 4
            ? ["Black & White", "Tabby Cat", "White Persian", "Calico Cat"][
                index
              ]
            : [
                "Bernese Mountain",
                "Border Collie",
                "Golden Retriever",
                "Puppy Mix",
              ][index - 4],
        gender: "Male",
        age: "2 months",
        image,
      };
    }

    // 🛒 PRODUCTS
    return {
      id: index + 1,
      name: [
        "Dog Food Premium",
        "Cat Scratcher",
        "Pet Shampoo",
        "Pet Carrier",
        "Dog Leash",
        "Cat Toy",
        "Pet Bed",
        "Pet Bowl",
      ][index],
      price: ["$20", "$15", "$10", "$30", "$12", "$8", "$25", "$7"][index],
      image,
    };
  });

  // split rows
  const firstRow = cardInfo.slice(0, 4);
  const secondRow = cardInfo.slice(4, 8);

  return (
    <section className="py-20 dark:bg-gray-950">
      <div className="container mx-auto">
        <div className="w-full mx-auto flex justify-between mb-10 px-4 md:px-2">
          <div>
            <p className="dark:text-(--color-secondary-monYellow)">
              {question}
            </p>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>

          <div className="relative hidden sm:flex">
            <Link
              href="/explore"
              className="group flex items-center gap-2 text-(--color-primary-darkBlue) transition-colors hover:text-(--color-secondary-monYellow)"
            >
              <Button
                variant="outline"
                className="flex items-center gap-2 pr-6 transition-all duration-300 dark:border-(--color-primary-darkBlue)! 
                 dark:hover:text-(--color-secondary-monYellow)! dark:text-(--color-secondary-monYellow)! dark:border-none"
              >
                View More
                <icons.ChevronRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 scale-125" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-10 justify-center">
          {/* first row */}
          <div className="flex flex-wrap gap-2 md:gap-0 lg:gap-20 justify-center items-stretch w-full">
            {firstRow.map((card) => (
              <div
                key={card.id}
                className="md:w-1/2 lg:w-auto flex p-2 rounded-2xl sm:bg-transparent shadow-lg h-full"
              >
                <HeroCard card={card} type={type} />
              </div>
            ))}
          </div>

          {/* second row */}
          <div className="flex flex-wrap gap-2 md:gap-0 lg:gap-20 justify-center items-stretch w-full">
            {secondRow.map((card) => (
              <div
                key={card.id}
                className="md:w-1/2 lg:w-auto flex p-2 rounded-2xl sm:bg-transparent shadow-lg h-full"
              >
                <HeroCard card={card} type={type} />
              </div>
            ))}
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
