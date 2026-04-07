import * as icons from "@/assets/icons";
import * as images from "@/assets/images/images";
import Button from "../atoms/Button";
import Link from "next/link";
import KnowledgeCard from "./KnowledgeCard";

const Knowledge = () => {
  return (
    <section className="">
      <div className="container flex flex-col mx-auto pt-15 pb-10 px-4">
        <div className="flex justify-between">
          <div>
            <p className="dark:text-(--color-secondary-monYellow)">
              You already know ?
            </p>
            <h3>Useful pet knowledge</h3>
          </div>
          <Link
            href="/explore"
            className="group flex items-center gap-2 text-(--color-primary-darkBlue) transition-colors hover:text-(--color-secondary-monYellow)"
          >
            <Button
              variant="outline"
              className="flex items-center gap-2 pr-6 transition-all duration-300 dark:border-(--color-primary-darkBlue)! hidden sm:flex
                dark:text-(--color-primary-darkBlue)! dark:hover:text-(--color-secondary-monYellow)! dark:text-(--color-secondary-monYellow)! dark:border-none"
            >
              View More
              <icons.ChevronRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 scale-125" />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row justify-between py-10 gap-5">
          <KnowledgeCard
            image={images.knowledge1}
            title="Dog Diet You Need To Know"
            description="Dividing a dog's diet may seem simple at first, but there are some rules you should know so that your dog can easily absorb the nutrients in the diet. For those who are just starting to raise dogs, especially newborn puppies with relatively weak resistance."
          />
          <KnowledgeCard
            image={images.knowledge2}
            title="What is a Pomeranian? How to Identify Pomeranian Dogs"
            description="The Pomeranian, also known as the Pomeranian (Pom dog), is always in the top of the cutest pets. Not only that, the small, lovely, smart, friendly, and skillful circus dog breed."
          />
        </div>
        <Link
          href="/"
          className="group sm:hidden flex items-center gap-2 text-(--color-primary-darkBlue) transition-colors hover:text-(--color-secondary-monYellow) w-full"
        >
          <Button
            variant="outline"
            className="flex items-center gap-2 pr-6 transition-all duration-300 w-full dark:border-none dark:text-(--color-secondary-monYellow)!"
          >
            View More
            <icons.ChevronRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 scale-125" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Knowledge;
