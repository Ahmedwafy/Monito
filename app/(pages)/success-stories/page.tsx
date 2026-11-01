// app/success-stories/page.tsx
import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { successStories } from "@/app/mock-data/mockSuccessStories";
import BottomCTA from "@/components/molecules/BottomCTA";
import TopPageBanner from "@/components/molecules/TopPageBanner";

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-(--page-bg) pb-20">
      {/* === Banner Section === */}
      <section className="pt-1">
        <TopPageBanner
          title="Success Stories"
          description="Every story here is proof that love and patience can change both an animal's life and a human's forever."
        />
      </section>

      {/* Stories Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="
                group bg-(--success-card-bg) rounded-2xl shadow-xl overflow-hidden
                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
                w-full max-w-md flex flex-col border border-transparent
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
                  <h3 className="text-2xl font-bold text-(--success-pet-name-color)">
                    {story.petName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-(--success-subtitle-color) shrink-0">
                    <icons.Heart className="w-5 h-5 fill-current" />
                    <span className="font-medium text-sm">
                      {story.heartCount}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-(--success-description-color) mb-4">
                  {story.petType} • Adopted by {story.adoptedBy} • {story.date}
                </p>

                <p className="text-(--success-description-color) leading-relaxed mb-6 flex-1">
                  {story.story}
                </p>

                <div className="mt-auto">
                  <Link href="/available-pets">
                    <Button variant="outline" className="w-full">
                      Find Your Next Friend
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === Bottom CTA === */}
      <BottomCTA
        title="Your Story Starts Here"
        description="The next success story could be yours — help an animal find a home full of love today."
        btnName="See Available Pets Now"
        href1="/available-pets"
      />
    </div>
  );
}
