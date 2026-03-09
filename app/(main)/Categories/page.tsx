// app/category/page.tsx
import * as images from "@/assets/images/images";
import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";

// Mock data for categories ... TODO: Replace with real data fetching later
const categories = [
  {
    id: "dogs",
    title: "Dogs",
    description:
      "Loyal, playful, and full of love. Find your perfect companion!",
    image: images.dog,
    count: 124,
    bgColor: "bg-(--color-primary-darkBlue)",
    textColor: "text-(--color-primary-darkBlue)",
  },
  {
    id: "cats",
    title: "Cats",
    description: "Independent yet affectionate. Perfect for cozy moments.",
    image: images.cat,
    count: 89,
    bgColor: "bg-(--color-primary-darkBlue)",
    textColor: "text-(--color-primary-darkBlue)",
  },
  {
    id: "birds",
    title: "Birds",
    description: "Colorful, chirpy, and full of personality.",
    image: images.bird,
    count: 42,
    bgColor: "bg-(--color-primary-darkBlue)",
    textColor: "text-(--color-primary-darkBlue)",
  },
  {
    id: "rabbits",
    title: "Rabbits",
    description: "Soft, gentle, and super cute. Great for families!",
    image: images.rabbit,
    count: 31,
    bgColor: "bg-(--color-primary-darkBlue)",
    textColor: "text-(--color-primary-darkBlue)",
  },
  // أضف المزيد إذا أردت لاحقًا
];

const CategoryPage = () => {
  return (
    <div className="min-h-screen bg-[#fceed5] pb-20">
      {/* Hero / Cover Section */}
      <section className="px-4 py-12 md:py-20">
        <div className="container relative mx-auto overflow-hidden rounded-3xl bg-(--color-secondary-monYellow) py-16 md:py-24 px-6 md:px-12 text-center">
          {/* Decorative blobs */}
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rotate-12 rounded-full bg-(--color-secondary-monYellow-60) md:h-[700px] md:w-[700px]"></div>
          <div className="absolute -left-60 bottom-10 h-[600px] w-[600px] rotate-25 rounded-full bg-(--color-secondary-monYellow-80) md:h-[800px] md:w-[800px]"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Find Your Perfect Friend
            </h1>
            <p className="mt-6 text-lg md:text-xl text-(--color-primary-darkBlue)/90">
              Browse our categories and discover the pet that matches your
              lifestyle and heart!
            </p>

            <div className="mt-10">
              <Button
                variant="primary"
                className="group bg-(--color-primary-darkBlue) text-(--color-secondary-monYellow) hover:bg-(--color-primary-darkBlue)/90"
              >
                Explore All Pets
                <icons.CircleArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="
              group relative rounded-2xl overflow-hidden shadow-lg 
              hover:shadow-2xl transition-all duration-300 bg-white
              w-full max-w-[380px] sm:w-[calc(50%-1rem)] lg:w-1/5
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
                <div className="absolute top-4 right-4 bg-(--color-secondary-monYellow) text-(--color-primary-darkBlue) px-4 py-1 rounded-full font-semibold text-sm shadow-md">
                  {category.count} Available
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-2xl font-bold ${category.textColor}`}>
                  {category.title}
                </h3>
                <p className="mt-3 text-gray-600">{category.description}</p>

                <div className="mt-6">
                  <Link href={`/category/${category.id}`}>
                    <Button
                      variant="primary"
                      className="w-full bg-(--color-primary-darkBlue) text-white hover:bg-(--color-primary-darkBlue)/90 group-hover:translate-x-1 transition-transform"
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
      <section className="px-4 py-16 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-[#FFB775] py-12 px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue)">
            Can&apos;t decide? Let us help you!
          </h3>
          <p className="mt-4 text-lg text-(--color-primary-darkBlue)/90">
            Take our quick quiz and find the perfect pet match for you.
          </p>
          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <Button variant="primary">Take the Quiz</Button>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) hover:bg-(--color-primary-darkBlue) hover:text-white"
              >
                Ask for Help
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
