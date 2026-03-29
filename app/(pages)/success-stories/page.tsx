// app/success-stories/page.tsx
import * as images from "@/assets/images/images";
import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";
import { successStories } from "@/app/mock-data/mockSuccessStories";

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 bg-(--color-primary-darkBlue) dark:bg-(--color-neutral-5)! text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-secondary-monYellow) rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="relative container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-6">
            Success Stories
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Every story here is proof that love and patience can change both an
            animal’s life and a human’s forever.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="
                group bg-white dark:bg-(--color-neutral-10) rounded-2xl shadow-xl overflow-hidden 
                hover:shadow-2xl transition-all duration-300
                w-full max-w-md flex flex-col
              "
            >
              {/* Before / After Images */}
              <div className="relative h-64 flex">
                <div className="flex-1 relative">
                  <Image
                    src={story.beforeImage}
                    alt={`Before - ${story.petName}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-lg px-4 py-2 bg-black/50 rounded-full">
                      Before Adoption
                    </span>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <Image
                    src={story.afterImage}
                    alt={`After - ${story.petName}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-lg px-4 py-2 bg-black/50 rounded-full">
                      After Adoption
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-(--color-primary-darkBlue)">
                    {story.petName}
                  </h3>
                  <div className="flex items-center gap-1 text-(--color-secondary-monYellow)">
                    <icons.Heart className="w-5 h-5 fill-current" />
                    <span className="font-medium">{story.heartCount}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {story.petType} • Adopted by {story.adoptedBy} • {story.date}
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 flex-1">
                  {story.story}
                </p>

                <div className="mt-auto">
                  <Link href="/AvailablePets">
                    <Button
                      variant="outline"
                      className="w-full border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) hover:bg-(--color-primary-darkBlue) hover:text-white dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-(--color-neutral-0)"
                    >
                      Find Your Next Friend
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-[#FFB775] dark:bg-(--color-neutral-10) dark:border dark:border-(--color-secondary-monYellow) dark:shadow-xl py-12 px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) mb-4">
            Your Story Starts Here
          </h3>
          <p className="text-lg text-(--color-primary-darkBlue)/90 dark:text-(--color-secondary-monYellow)/90 mb-8">
            The next success story could be yours — help an animal find a home
            full of love today.
          </p>
          <Link href="/availablePets">
            <Button
              variant="primary"
              className="text-xl px-12 py-5 hover:scale-103 hover:text-white transition-all duration-300"
            >
              See Available Pets Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
