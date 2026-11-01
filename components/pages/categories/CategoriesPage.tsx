// app/category/page.tsx
import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { categories } from "@/app/mock-data/mockCategories";
import { petsData } from "@/app/mock-data/mockPets";
import BottomCTA from "@/components/molecules/BottomCTA";
import TopPageBanner from "@/components/molecules/TopPageBanner";

const CategoryPage = () => {
  const getCount = (type: string) =>
    petsData.filter((pet) => pet.type === type).length;

  return (
    <div className="min-h-screen bg-(--page-bg) pb-20">
      {/* Banner Section */}
      <section className="pt-1">
        <TopPageBanner
          title="Find Your Perfect Friend"
          description="Browse our categories and discover the pet that matches your lifestyle and heart!"
          btnTitle2="Explore All Pets"
          href="/available-pets"
        />
      </section>

      {/* Categories - Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="
              group relative rounded-2xl overflow-hidden shadow-lg 
              hover:shadow-2xl transition-all duration-300 bg-(--card-bg)
              w-full max-w-[380px] sm:w-[calc(50%-1rem)] lg:w-1/5 border border-transparent
              "
              // lg:w-[calc(33.333%-2rem)] or lg:w-1/5
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  fill
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                {/* Count badge */}
                <div className="absolute top-4 right-4 bg-(--card-badge-bg) text-(--badge-text-color) px-4 py-1 rounded-full font-semibold text-sm shadow-md">
                  {getCount(category.typeParam)} Available
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  // className={`text-2xl font-bold ${category.textColor}`}
                  className={`text-2xl font-bold text-(--card-title-color)`}
                >
                  {category.title}
                </h3>
                {/* <p className="mt-3 text-gray-600">{category.description}</p> */}
                <p className="mt-3 text-(--card-description-color)">
                  {category.description}
                </p>

                <div className="mt-6">
                  <Link href={`./available-pets?type=${category.typeParam}`}>
                    <Button
                      variant="primary"
                      className="w-full group-hover:translate-x-1 transition-all duration-300"
                    >
                      View {category.title}
                      <icons.ChevronRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <BottomCTA
        title="Can't decide? Let us help you!"
        description="Take our quick quiz and find the perfect pet match for you."
        btnName="Take the Quiz"
        btnName2="Ask for Help"
        href1="/"
        href2="/contact"
      />
    </div>
  );
};

export default CategoryPage;
