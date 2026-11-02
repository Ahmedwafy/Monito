"use client";

import Link from "next/link";
import Button from "@/components/atoms/Button";
import { exploreTopics, exploreVideos } from "@/app/mock-data/mockExplore";
import TopPageBanner from "@/components/molecules/TopPageBanner";
import BottomCTA from "@/components/molecules/BottomCTA";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-(--page-bg) pb-20">
      {/* === Banner === */}
      <section className="pt-1">
        <TopPageBanner
          title="Explore & Learn"
          description="Guides, tips, and videos to help you prepare for adoption and care for your new friend."
        />
      </section>

      {/* === Topics === */}
      <section className="container mx-auto px-4 py-14 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-(--explore-title) mb-8 text-center">
          Where do you want to start?
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {exploreTopics.map((topic) => (
            <Link
              key={topic.href}
              href={topic.href}
              className="block w-full max-w-sm bg-(--explore-card-bg) rounded-2xl shadow-lg p-6 border border-transparent hover:-translate-y-1 transition-transform duration-300"
            >
              <h3 className="text-xl font-bold text-(--explore-card-title)">
                {topic.title}
              </h3>
              <p className="mt-3 text-(--explore-card-description) text-sm leading-relaxed">
                {topic.description}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-(--explore-card-title)">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* === Videos === */}
      <section className="container mx-auto px-4 py-10 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-(--explore-title) mb-3 text-center">
          Watch & learn
        </h2>
        <p className="text-center text-(--explore-description) mb-10 max-w-2xl mx-auto">
          Short videos about settling in, daily care, and what adoption looks
          like in real life.
        </p>

        <div className="flex flex-col gap-10">
          {exploreVideos.map((video) => (
            <article
              key={video.id}
              className="bg-(--explore-card-bg) rounded-3xl shadow-lg overflow-hidden border border-transparent"
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
                  <span className="text-xs font-semibold uppercase tracking-wide text-(--explore-accent) mb-2">
                    {video.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-(--explore-card-title)">
                    {video.title}
                  </h3>
                  <p className="mt-3 text-(--explore-card-description) leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === CTA Bottom === */}
      <BottomCTA
        title="Ready to meet a pet?"
        description=" Explore our available pets and start your adoption journey today."
        btnName="See Available Pets"
        href1="/available-pets"
        btnName2="Adoption Guide"
        href2="/how-to-adopt"
      />
    </div>
  );
}
