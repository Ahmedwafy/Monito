"use client";

import Link from "next/link";
import Button from "@/components/atoms/Button";
import { exploreTopics, exploreVideos } from "@/app/mock-data/mockExplore";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* === Hero === */}
      <section className="px-4 py-12 md:py-24">
        <div className="container relative mx-auto flex flex-col items-center text-center overflow-hidden rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-0)/50 py-16 md:py-32 px-6 md:px-16">
          {/* Decorative rotated blobs */}
          <div className="dark:opacity-50 absolute -left-40 -top-60 h-[600px] w-[600px] rotate-12 rounded-full bg-(--color-secondary-monYellow-80) dark:bg-(--color-secondary-monYellow-80)/20 md:h-[900px] md:w-[900px]"></div>
          <div className="dark:opacity-50 absolute -right-80 bottom-0 h-[700px] w-[700px] rotate-25 rounded-full bg-(--color-secondary-monYellow-80) dark:bg-(--color-secondary-monYellow-80)/20 md:h-[1000px] md:w-[1000px]"></div>

          <div className="relative z-10 max-w-4xl">
            <h1 className="text-4xl font-bold text-(--color-primary-darkBlue)! md:text-5xl lg:text-6xl">
              Explore & Learn
            </h1>

            <p className="mt-8 text-lg text-(--color-primary-darkBlue)! md:text-xl leading-relaxed">
              Guides, tips, and videos to help you prepare for adoption and care
              for your new friend.
            </p>
          </div>
        </div>
      </section>

      {/* === Topics === */}
      <section className="container mx-auto px-4 py-14 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-8 text-center">
          Where do you want to start?
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {exploreTopics.map((topic) => (
            <Link
              key={topic.href}
              href={topic.href}
              className="block w-full max-w-sm bg-white dark:bg-(--color-neutral-5) rounded-2xl shadow-lg p-6 border border-transparent dark:border-(--color-card-border) hover:-translate-y-1 transition-transform duration-300"
            >
              <h3 className="text-xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow)">
                {topic.title}
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {topic.description}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-(--color-primary-darkBlue) dark:text-yellow-400">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* === Videos === */}
      <section className="container mx-auto px-4 py-10 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-3 text-center">
          Watch & learn
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Short videos about settling in, daily care, and what adoption looks
          like in real life.
        </p>

        <div className="flex flex-col gap-10">
          {exploreVideos.map((video) => (
            <article
              key={video.id}
              className="bg-white dark:bg-(--color-neutral-5) rounded-3xl shadow-lg overflow-hidden border border-transparent dark:border-(--color-card-border)"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Embed — 16:9 */}
                <div className="relative w-full lg:w-1/2 aspect-video bg-black">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 md:p-8 lg:w-1/2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-(--color-secondary-monYellow-80) mb-2">
                    {video.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100">
                    {video.title}
                  </h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === CTA Bottom === */}
      <section className="px-4 py-16 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) py-12 px-8 transition-colors duration-300 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) mb-4">
            Ready to meet a pet?
          </h3>
          <p className="text-lg text-(--color-primary-darkBlue)/90 dark:text-gray-300 mb-8">
            Explore our available pets and start your adoption journey today.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Link href="/available-pets">
              <Button variant="primary" className="px-8 py-4 text-lg">
                See Available Pets
              </Button>
            </Link>
            <Link href="/how-to-adopt">
              <Button
                variant="outline"
                className="px-8 py-4 text-lg border-(--color-primary-darkBlue) text-(--color-primary-darkBlue)"
              >
                Adoption Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
