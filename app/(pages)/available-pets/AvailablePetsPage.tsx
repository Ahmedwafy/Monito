"use client";

// Note : Do not use >>> "use client" in page.tsx files, So page.tsx should be server components that wrap the client components with Suspense to enable loading
// states while fetching data or performing client-side operations. The actual UI and logic for the Available Pets page is implemented in AvailablePetsPage.tsx,
// which is a client component that can use hooks and manage state.

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // ← أضفنا ده
// import * as images from "@/assets/images/images";
import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";
import { petsData } from "@/app/mock-data/mockPets";

const AvailablePetsPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [typeFilter, setTypeFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filter: Type + Age + Gender + Search by name
  const filteredPets = petsData.filter((pet) => {
    const matchType = typeFilter === "All" || pet.type === typeFilter;
    const matchAge = ageFilter === "All" || pet.age === ageFilter;
    const matchGender = genderFilter === "All" || pet.gender === genderFilter;
    const matchSearch =
      !searchQuery || pet.name.toLowerCase().includes(searchQuery);

    return matchType && matchAge && matchGender && matchSearch;
  });

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0)/50 pb-20">
      {/* Hero Section */}
      <section className="px-4 py-12 md:py-20">
        <div className="container relative mx-auto overflow-hidden rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-0)/50 py-16 md:py-24 px-6 md:px-12 text-center">
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--color-primary-darkBlue)">
              Available Pets
            </h1>
            <p className="mt-6 text-lg md:text-xl text-(--color-primary-darkBlue)/90">
              Meet your new best friend! These wonderful animals are looking for
              loving homes.
            </p>
          </div>
          {/* Decorative blobs */}
          <div className="dark:opacity-50 absolute -right-40 -top-40 h-[500px] w-[500px] rotate-12 rounded-full bg-(--color-secondary-monYellow-60) dark:bg-(--color-secondary-monYellow-60)/20 md:h-[700px] md:w-[700px]" />
          <div className="dark:opacity-50 absolute -left-60 bottom-10 h-[600px] w-[600px] rotate-25 rounded-full bg-(--color-secondary-monYellow-80) dark:bg-(--color-secondary-monYellow-80)/20 md:h-[800px] md:w-[800px]" />
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-10 md:py-12">
        <div className="bg-white dark:bg-(--color-neutral-0)/50 rounded-3xl shadow-xl p-6 md:p-8 border border-(--color-secondary-monYellow)/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue)">
              Find Your Perfect Match
            </h2>

            {(typeFilter !== "All" ||
              ageFilter !== "All" ||
              genderFilter !== "All") && (
              <button
                onClick={() => {
                  setTypeFilter("All");
                  setAgeFilter("All");
                  setGenderFilter("All");
                }}
                className="text-sm font-medium text-(--color-primary-darkBlue) hover:text-(--color-secondary-monYellow) transition-colors flex items-center gap-1"
              >
                <icons.CircleX className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {/* Pet Type */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-base font-semibold text-(--color-primary-darkBlue)">
                <icons.PawPrint className="w-5 h-5 text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow)" />
                Pet Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 bg-white text-gray-800 focus:border-(--color-secondary-monYellow) focus:ring-2 focus:ring-(--color-secondary-monYellow)/30 transition-all duration-200 appearance-none cursor-pointer hover:border-(--color-secondary-monYellow)/50 dark:bg-(--color-neutral-0) dark:text-(--color-secondary-monYellow)"
              >
                <option value="All">All Types</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-base font-semibold text-(--color-primary-darkBlue)">
                <icons.CalendarHeart className="w-5 h-5 text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow)" />
                Age
              </label>
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="dark:bg-(--color-neutral-0) dark:text-(--color-secondary-monYellow) w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 bg-white text-gray-800 focus:border-(--color-secondary-monYellow) focus:ring-2 focus:ring-(--color-secondary-monYellow)/30 transition-all duration-200 appearance-none cursor-pointer hover:border-(--color-secondary-monYellow)/50"
              >
                <option value="All">All Ages</option>
                <option value="Puppy">Puppy / Kitten</option>
                <option value="Young">Young</option>
                <option value="Adult">Adult</option>
                <option value="Senior">Senior</option>
              </select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-base font-semibold text-(--color-primary-darkBlue)">
                <icons.Venus className="w-5 h-5 text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow)" />
                Gender
              </label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="dark:bg-(--color-neutral-0) dark:text-(--color-secondary-monYellow) w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 bg-white text-gray-800 focus:border-(--color-secondary-monYellow) focus:ring-2 focus:ring-(--color-secondary-monYellow)/30 transition-all duration-200 appearance-none cursor-pointer hover:border-(--color-secondary-monYellow)/50"
              >
                <option value="All">Any Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="mt-8 text-center md:text-left">
            <p className="text-base font-medium text-gray-700">
              <span className="text-(--color-primary-darkBlue) font-bold">
                {isLoading ? "..." : filteredPets.length}
              </span>{" "}
              pets found
              {!isLoading && filteredPets.length !== petsData.length && (
                <span className="text-gray-500"> out of {petsData.length}</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Pets List / Skeleton */}
      <section className="container mx-auto px-4 py-8">
        {isLoading ? (
          // Skeleton Loading State
          <div className="flex flex-wrap justify-center gap-8 transition-opacity duration-300">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className=" bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[380px] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] animate-pulse"
                aria-busy="true"
                aria-label="Loading pet card"
              >
                <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="h-8 bg-gray-200 rounded w-3/4" />
                    <div className="h-5 bg-gray-200 rounded w-16" />
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-20" />
                    <div className="h-6 bg-gray-200 rounded-full w-24" />
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                  </div>
                  <div className="h-16 bg-gray-200 rounded" />
                  <div className="h-12 bg-gray-300 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPets.length === 0 ? (
          // Empty State with Clear Filters button
          <div className="text-center py-20">
            <div className="text-7xl mb-6 opacity-70">😿</div>
            <h3 className="text-2xl md:text-3xl font-semibold text-(--color-primary-darkBlue) mb-4">
              No pets match your filters
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Try changing the filters or reset them to see all available pets!
            </p>

            <button
              onClick={() => {
                setTypeFilter("All");
                setAgeFilter("All");
                setGenderFilter("All");
              }}
              className="
          inline-flex items-center gap-2 px-8 py-4 
          bg-(--color-primary-darkBlue) text-white 
          rounded-xl font-medium text-lg
          hover:bg-(--color-primary-darkBlue)/90 transition
        "
            >
              <icons.RefreshCw className="w-5 h-5" />
              Reset Filters
            </button>
          </div>
        ) : (
          // Real pets list with fade-in transition
          <div className="flex flex-wrap justify-center gap-8 transition-opacity duration-500 opacity-100">
            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="
            group relative rounded-2xl overflow-hidden shadow-lg 
            hover:shadow-2xl transition-all duration-300 bg-white
            w-full max-w-[380px] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)]
            animate-fade-in
          "
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pet.mainImage}
                    alt={pet.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4 bg-(--color-secondary-monYellow) text-(--color-primary-darkBlue) px-3 py-1 rounded-full font-medium text-sm shadow">
                    {pet.gender}
                  </div>
                </div>

                <div className="p-6 dark:bg-(--color-neutral-0)">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-(--color-primary-darkBlue)">
                      {pet.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-600">
                      {pet.age}
                    </span>
                  </div>

                  <p className="mt-1 text-(--color-primary-darkBlue) font-medium">
                    {pet.type}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {pet.traits.map((trait, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-(--color-secondary-monYellow)/20 text-(--color-primary-darkBlue) rounded-full text-xs font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-gray-600 line-clamp-2">
                    {pet.description}
                  </p>

                  <div className="mt-6">
                    <Link href={`/pets/${pet.id}`}>
                      <Button
                        variant="primary"
                        className="w-full bg-(--color-primary-darkBlue) text-white hover:bg-(--color-primary-darkBlue)/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        View Details
                        <icons.ChevronRight className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-card-bg) border border-transparent dark:border-(--color-card-border) py-12 px-8 transition-colors duration-300 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) transition-colors duration-300">
            Ready to meet your new friend?
          </h3>
          <p className="mt-4 text-lg text-(--color-primary-darkBlue)/90 dark:text-[#ebeeef] transition-colors duration-300">
            Contact us or start the adoption process today!
          </p>
          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <Link href="/contact">
              <Button
                variant="primary"
                className="dark:bg-(--color-secondary-monYellow) dark:text-[#00171f] dark:hover:bg-[#eec77e] transition-colors duration-300 sm:text-(--color-secondary-monYellow) flex w-full!"
              >
                Get in Touch
              </Button>
            </Link>
            <Link href="/how-to-adopt">
              <Button
                variant="outline"
                className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-[#00171f] transition-colors duration-300"
              >
                Adoption Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AvailablePetsPage;
