"use client";

// Note : Do not use >>> "use client" in page.tsx files, So page.tsx should be server components that wrap the client components with Suspense to enable loading
// states while fetching data or performing client-side operations. The actual UI and logic for the Available Pets page is implemented in AvailablePetsPage.tsx,
// which is a client component that can use hooks and manage state.

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import FavoriteButton from "@/components/atoms/FavoriteButton";
import { petsData } from "@/app/mock-data/mockPets";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/useFavorites";
// import { useQueryClient } from "@tanstack/react-query";
import BottomCTA from "@/components/molecules/BottomCTA";
import TopPageBanner from "@/components/molecules/TopPageBanner";

const AvailablePetsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const queryClient = useQueryClient();

  // Read search query from URL → if exists
  const searchQuery = (searchParams.get("search")?.trim() || "").toLowerCase();
  const rawSearch = searchParams.get("search")?.trim() || "";

  const categoryFromUrl = searchParams.get("type")?.trim() || "All"; // if no searchParams → Set filter to default "All"

  const [typeFilter, setTypeFilter] = useState(categoryFromUrl);
  const [ageFilter, setAgeFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  // const [searchQuery, setSearchQuery] = useState(urlSearchQuery); // Sync with URL

  // used new Set() coz → O(1)
  //  using Array [1, 5, 8] then check if pet's id exists: favorites.includes(5) will cause → O(n)
  // Set<number> : Generic Type → Set of Numbers Only
  // const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set()); // ex: Set {1,5,8}

  const { data: favoriteIds = [], isLoading, isSuccess } = useFavorites();

  // keep / save the loading IDs ( Currently Adding / Removing from Favorites )
  const [favoriteLoadingIds, setFavoriteLoadingIds] = useState<Set<number>>(
    new Set(),
  );

  const handleFavoriteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    petId: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (favoriteLoadingIds.has(petId)) return;

    setFavoriteLoadingIds((current) => new Set(current).add(petId));

    // const isFavorite = favoriteIds.includes(petId); // Array → O(n)

    const favoriteSet = new Set(favoriteIds); // used Set coz → O(1)
    const isFavorite = favoriteSet.has(petId);

    try {
      if (isFavorite) {
        const res = await fetch("/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ petId }),
        });

        if (res.status === 401) {
          toast.error("Please log in to manage favorites");
          router.push("/Login");
          return;
        }

        if (!res.ok) {
          toast.error("Could not remove from favorites");
          return;
        }
        toast.success("Removed from favorites");
      } else {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ petId }),
        });

        if (res.status === 401) {
          toast.error("Please log in to add favorites");
          router.push("/Login");
          return;
        }

        if (!res.ok) {
          toast.error("Could not add to favorites");
          return;
        }
        toast.success("Added to favorites");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setFavoriteLoadingIds((current) => {
        const next = new Set(current);
        next.delete(petId);
        return next;
      });
    }
  };

  // edit filter according to category type from url if exist.
  useEffect(() => {
    setTypeFilter(categoryFromUrl);
  }, [categoryFromUrl]);

  // Combined filtering: Type + Age + Gender + Search by name
  const filteredPets = petsData.filter((pet) => {
    const matchType = typeFilter === "All" || pet.type === typeFilter;
    const matchAge = ageFilter === "All" || pet.age === ageFilter;
    const matchGender = genderFilter === "All" || pet.gender === genderFilter;
    const matchSearch =
      !searchQuery || pet.name.toLowerCase().includes(searchQuery);

    return matchType && matchAge && matchGender && matchSearch;
  });

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    const qs = params.toString();
    router.replace(qs ? `/available-pets?${qs}` : "/available-pets", {
      scroll: false,
    });
  };

  // Clear all filters and search
  const clearAll = () => {
    setTypeFilter("All");
    setAgeFilter("All");
    setGenderFilter("All");
    router.push("/available-pets", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* === Banner Section === */}
      <section className="pt-1">
        <TopPageBanner
          title="Available Pets"
          description="Meet your new best friend! These wonderful animals are looking for loving homes."
        />
      </section>

      {/* === Filters Section === */}
      <section className="container mx-auto px-4 py-10 md:py-12">
        <div className="bg-(--filter-card-bg) rounded-3xl shadow-xl p-6 md:p-8 border border-(--filter-card-border)">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-(--filter-card-title)">
              Find Your Perfect Match
            </h2>

            {(typeFilter !== "All" ||
              ageFilter !== "All" ||
              genderFilter !== "All" ||
              rawSearch) && (
              <button
                onClick={clearAll}
                className="text-sm font-medium text-(--filter-card-clearAll) transition-colors flex items-center gap-1"
              >
                <icons.CircleX className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {/* === Pet Type Filter === */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-base font-semibold text-(--filter-card-sub-title)">
                <icons.PawPrint className="w-5 h-5 text-(--filter-card-sub-title)" />
                Pet Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full rounded-xl border-2 border-(--filter-input-border) px-4 py-3.5 
                focus:border-(--filter-input-focus-border) 
                focus:ring-2 
                focus:ring-(--filter-input-focus-border)/30 
                transition-all
                bg-(--filter-select-dropdown-bg)
                "
              >
                <option value="All">All Types</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* === Age Filter ===*/}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-base font-semibold text-(--filter-card-sub-title)">
                <icons.CalendarHeart className="w-5 h-5 text-(--filter-card-sub-title)" />
                Age
              </label>
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="w-full rounded-xl border-2 border-(--filter-input-border) px-4 py-3.5 
                focus:border-(--filter-input-focus-border) 
                focus:ring-2 
                focus:ring-(--filter-input-focus-border)/30 
                transition-all
                bg-(--filter-select-dropdown-bg)
                "
              >
                <option value="All">All Ages</option>
                <option value="Puppy">Puppy / Kitten</option>
                <option value="Young">Young</option>
                <option value="Adult">Adult</option>
                <option value="Senior">Senior</option>
              </select>
            </div>

            {/* === Gender Filter === */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-base font-semibold text-(--filter-card-sub-title)">
                <icons.Venus className="w-5 h-5 text-(--filter-card-sub-title)" />
                Gender
              </label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full rounded-xl border-2 
                border-(--filter-input-border)! px-4 py-3.5 
                focus:border-(--filter-input-focus-border) 
                focus:ring-2 
                focus:ring-(--filter-input-focus-border)/30 
                transition-all
                bg-(--filter-select-dropdown-bg)
                "
              >
                <option value="All">Any Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {rawSearch && (
            <div className="mt-6 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-(--filter-card-sub-title)/30 px-4 py-1.5 text-sm font-medium text-(--filter-card-title)">
                Search: “{rawSearch}”
                <button onClick={clearSearch} aria-label="Clear search">
                  <icons.CircleX className="w-4 h-4" />
                </button>
              </span>
            </div>
          )}

          <div className="mt-8 text-center md:text-left">
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
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

      {/* === Pets List / Skeleton === */}
      <section className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-wrap justify-center gap-8">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-(--color-neutral-10) rounded-2xl shadow-lg overflow-hidden w-full max-w-[380px] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] animate-pulse"
              >
                <div className="h-64 bg-gray-200 dark:bg-gray-700" />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                  </div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24" />
                  </div>
                  <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPets.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-6 opacity-70">😿</div>
            <h3 className="text-2xl md:text-3xl font-semibold text-(--color-primary-darkBlue) mb-4">
              No pets match your search and filters
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Try changing the search term or filters.
            </p>
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-2 px-8 py-4 bg-(--color-primary-darkBlue) text-white rounded-xl font-medium text-lg hover:bg-(--color-primary-darkBlue)/90 transition"
            >
              <icons.RefreshCw className="w-5 h-5" />
              Clear All
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
                  max-h-[800px] overflow-hidden flex flex-col
                  bg-(--available-pet-card-bg) 
                  w-full max-w-[380px] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)]"
              >
                {/* Pet Image */}
                <div className="relative h-96">
                  <Image
                    src={pet.mainImage}
                    alt={pet.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent group-hover:scale-105 transition-transform duration-500" />
                  <div
                    className="absolute top-4 left-4 
                    bg-(--available-pet-gender-bg) 
                    text-(--available-pet-gender-text) 
                    px-3 py-1
                   rounded-full font-medium text-sm shadow "
                  >
                    {pet.gender}
                  </div>

                  {/* Favorite indicator + quick toggle on image -------------- */}
                  <button
                    type="button"
                    onClick={(e) => handleFavoriteClick(e, pet.id)}
                    disabled={!isSuccess || favoriteLoadingIds.has(pet.id)}
                    className="absolute top-4 right-4 z-10 rounded-full bg-white/90 dark:bg-(--color-neutral-0)/90 
                    p-2.5 shadow-md hover:scale-105 transition disabled:opacity-50"
                    aria-label={
                      favoriteIds.includes(pet.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <icons.Heart
                      className={`w-5 h-5 ${
                        favoriteIds.includes(pet.id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6 flex flex-col gap-4 justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold text-(--available-pet-name) ">
                        {pet.name}
                      </h3>
                      <span className="text-sm font-medium text-(--available-pet-age)">
                        {pet.age}
                      </span>
                    </div>

                    <p className="mt-1 text-(--available-pet-type) font-medium">
                      {pet.type}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {pet.traits.map((trait, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 
                          text-(--available-pet-trait-text)
                          bg-(--available-pet-trait-bg) 
                          rounded-full text-xs font-medium"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 line-clamp-2 text-(--available-pet-details)">
                      {pet.description}
                    </p>
                  </div>

                  {/* === Buttons === */}
                  <div className="flex flex-col gap-2 h-auto">
                    <div className="w-full">
                      <FavoriteButton
                        petId={pet.id}
                        isFavorite={favoriteIds.includes(pet.id)}
                        isLoading={favoriteLoadingIds.has(pet.id)}
                        checked={isSuccess}
                        onClick={(event) => handleFavoriteClick(event, pet.id)}
                        className="w-full"
                      />
                    </div>
                    <Link href={`/pets/${pet.id}`}>
                      <Button
                        variant="outline"
                        className="w-full transition-all duration-300 hover:-translate-y-0.5"
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

      {/* === CTA === */}
      <BottomCTA
        title="Ready to meet your new friend?"
        description=" Contact us or start the adoption process today!"
        btnName="Get in Touch"
        btnName2="Adoption Guide"
        href1="/contact"
        href2="/how-to-adopt"
      />
    </div>
  );
};

export default AvailablePetsPage;
