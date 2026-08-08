// app/success-stories/page.tsx
import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { successStories } from "@/app/mock-data/mockSuccessStories";

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 bg-(--color-primary-darkBlue) dark:bg-(--color-neutral-0) text-(--color-neutral-100) text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-secondary-monYellow) rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="relative container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white! dark:text- mb-6">
            Success Stories
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Every story here is proof that love and patience can change both an
            animal&apos;s life and a human&apos;s forever.
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
                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
                w-full max-w-md flex flex-col border border-transparent dark:border-(--color-card-border)
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
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-end justify-center pb-3">
                    <span className="text-white text-xs sm:text-sm font-semibold px-3 py-1 bg-black/55 rounded-full">
                      Before
                    </span>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <Image
                    src={story.afterImage}
                    alt={`After - ${story.petName}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-end justify-center pb-3">
                    <span className="text-white text-xs sm:text-sm font-semibold px-3 py-1 bg-black/55 rounded-full">
                      After
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-neutral-100)!">
                    {story.petName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-(--color-secondary-monYellow) shrink-0">
                    <icons.Heart className="w-5 h-5 fill-current" />
                    <span className="font-medium text-sm">
                      {story.heartCount}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {story.petType} • Adopted by {story.adoptedBy} • {story.date}
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 flex-1">
                  {story.story}
                </p>

                <div className="mt-auto">
                  <Link href="/available-pets">
                    <Button
                      variant="outline"
                      className="w-full border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) hover:bg-(--color-primary-darkBlue) hover:text-white dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-(--color-neutral-0) transition-colors"
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
        <div className="container mx-auto max-w-4xl rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-10) dark:border dark:border-(--color-card-border) py-12 px-8 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) mb-4">
            Your Story Starts Here
          </h3>
          <p className="text-lg text-(--color-primary-darkBlue)/90 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            The next success story could be yours — help an animal find a home
            full of love today.
          </p>
          <Link href="/available-pets">
            <Button
              variant="primary"
              className="text-lg px-10 py-4 hover:scale-[1.02] transition-transform duration-300"
            >
              See Available Pets Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
