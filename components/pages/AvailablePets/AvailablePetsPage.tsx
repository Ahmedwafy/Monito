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

const AvailablePetsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read search query from URL
  const urlSearchQuery = searchParams.get("search")?.trim() || "";
  const categoryFromUrl = searchParams.get("type")?.trim() || "All"; // if no searchParams → Set filter to default "All"

  const [typeFilter, setTypeFilter] = useState(categoryFromUrl);
  const [ageFilter, setAgeFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery); // Sync with URL
  const [isLoading, setIsLoading] = useState(true);

  // used new Set() coz → O(1)
  //  using Array [1, 5, 8] then check if pet's id exists: favorites.includes(5) will cause → O(n)
  // Set<number> : Generic Type → Set of Numbers Only
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set()); // ex: Set {1,5,8}
  const [favoritesChecked, setFavoritesChecked] = useState(false);

  // keep / save the loading IDs ( Currently Adding / Removing from Favorites )
  const [favoriteLoadingIds, setFavoriteLoadingIds] = useState<Set<number>>(
    new Set(),
  );
  // Load all favorite IDs once; individual cards read their state from this set.
  useEffect(() => {
    let cancelled = false; // for protection: if page closed during fetch

    const loadFavorites = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) return;

        const data = await res.json();
        if (!cancelled) {
          setFavoriteIds(new Set<number>(data.favorites ?? []));
        }
      } catch {
        if (!cancelled) setFavoriteIds(new Set());
      } finally {
        if (!cancelled) setFavoritesChecked(true);
      }
    };

    loadFavorites();
    // Cleanup Function
    return () => {
      cancelled = true;
    };
  }, []);

  const handleFavoriteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    petId: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (favoriteLoadingIds.has(petId)) return;

    setFavoriteLoadingIds((current) => new Set(current).add(petId));

    const isFavorite = favoriteIds.has(petId);

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

        setFavoriteIds((current) => {
          const next = new Set(current);
          next.delete(petId);
          return next;
        });
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

        setFavoriteIds((current) => new Set(current).add(petId));
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

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Sync searchQuery with URL when it changes
  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  // Combined filtering: Type + Age + Gender + Search by name
  const filteredPets = petsData.filter((pet) => {
    const matchType = typeFilter === "All" || pet.type === typeFilter;
    const matchAge = ageFilter === "All" || pet.age === ageFilter;
    const matchGender = genderFilter === "All" || pet.gender === genderFilter;
    const matchSearch =
      !searchQuery || pet.name.toLowerCase().includes(searchQuery);

    return matchType && matchAge && matchGender && matchSearch;
  });

  // Handle search input from Navbar or Mobile Search
  // const handleSearchChange = (value: string) => {
  //   setSearchQuery(value);
  //   if (value.trim() !== "") {
  //     router.push(
  //       `/available-pets?search=${encodeURIComponent(value.trim())}`,
  //       { scroll: false },
  //     );
  //   } else {
  //     router.push("/available-pets", { scroll: false });
  //   }
  // };

  // Clear all filters and search
  const clearAll = () => {
    setTypeFilter("All");
    setAgeFilter("All");
    setGenderFilter("All");
    setSearchQuery("");
    router.push("/available-pets", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
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

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-10 md:py-12">
        <div className="bg-white dark:bg-(--color-neutral-5) rounded-3xl shadow-xl p-6 md:p-8 border border-(--color-secondary-monYellow)/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue)">
              Find Your Perfect Match
            </h2>

            {(typeFilter !== "All" ||
              ageFilter !== "All" ||
              genderFilter !== "All" ||
              searchQuery) && (
              <button
                onClick={clearAll}
                className="text-sm font-medium text-(--color-primary-darkBlue) hover:text-(--color-secondary-monYellow) transition-colors flex items-center gap-1"
              >
                <icons.CircleX className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {/* Pet Type Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-base font-semibold text-(--color-primary-darkBlue)">
                <icons.PawPrint className="w-5 h-5 text-(--color-secondary-monYellow)" />
                Pet Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-10) dark:text-neutral-100 px-4 py-3.5 
                focus:border-(--color-secondary-monYellow) focus:ring-2 focus:ring-(--color-secondary-monYellow)/30 transition-all"
              >
                <option value="All">All Types</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Age Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-base font-semibold text-(--color-primary-darkBlue)">
                <icons.CalendarHeart className="w-5 h-5 text-(--color-secondary-monYellow)" />
                Age
              </label>
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-10) dark:text-neutral-100 px-4 py-3.5 focus:border-(--color-secondary-monYellow) focus:ring-2 focus:ring-(--color-secondary-monYellow)/30 transition-all"
              >
                <option value="All">All Ages</option>
                <option value="Puppy">Puppy / Kitten</option>
                <option value="Young">Young</option>
                <option value="Adult">Adult</option>
                <option value="Senior">Senior</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-base font-semibold text-(--color-primary-darkBlue)">
                <icons.Venus className="w-5 h-5 text-(--color-secondary-monYellow)" />
                Gender
              </label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-10) dark:text-neutral-100 px-4 py-3.5 focus:border-(--color-secondary-monYellow) focus:ring-2 focus:ring-(--color-secondary-monYellow)/30 transition-all"
              >
                <option value="All">Any Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

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

      {/* Pets List / Skeleton */}
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
                  bg-white dark:bg-(--color-neutral-10) 
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
                    className="absolute top-4 left-4 bg-(--color-secondary-monYellow) text-(--color-primary-darkBlue) px-3 py-1
                   rounded-full font-medium text-sm shadow "
                  >
                    {pet.gender}
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-4 justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100">
                        {pet.name}
                      </h3>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {pet.age}
                      </span>
                    </div>

                    <p className="mt-1 text-(--color-primary-darkBlue) dark:text-gray-300 font-medium">
                      {pet.type}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {pet.traits.map((trait, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-(--color-secondary-monYellow)/20 text-(--color-primary-darkBlue) dark:text-neutral-100 rounded-full text-xs font-medium"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-gray-600 dark:text-gray-400 line-clamp-2">
                      {pet.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 h-auto">
                    <div className="w-full">
                      <FavoriteButton
                        petId={pet.id}
                        isFavorite={favoriteIds.has(pet.id)}
                        isLoading={favoriteLoadingIds.has(pet.id)}
                        checked={favoritesChecked}
                        onClick={(event) => handleFavoriteClick(event, pet.id)}
                        className="w-full"
                      />
                    </div>
                    <Link href={`/pets/${pet.id}`}>
                      <Button
                        variant="outline"
                        className="w-full !dark:bg-(--color-primary-darkBlue) hover:bg-(--color-primary-darkBlue)/90 
                        dark:hover:bg-(--surface-page) dark:hover:text-(--color-neutral-80)
                        transition-all duration-300 hover:-translate-y-0.5"
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

      {/* CTA Section */}
      <section className="px-4 py-16 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) py-12 px-8 transition-colors duration-300 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100">
            Ready to meet your new friend?
          </h3>
          <p className="mt-4 text-lg text-(--color-primary-darkBlue)/90 dark:text-gray-300">
            Contact us or start the adoption process today!
          </p>
          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <Link href="/contact">
              <Button
                variant="primary"
                className="dark:bg-(--color-secondary-monYellow) dark:text-(--color-neutral-0) dark:hover:bg-(--color-secondary-monYellow-80) transition-colors duration-300"
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
