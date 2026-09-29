// components/pages/Profile/ProfilePage.tsx
// GET /api/auth/me → GET /api/favorites
// if not logged in → /Login
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { petsData } from "@/app/mock-data/mockPets";
import * as icons from "@/assets/icons";
import { toast } from "sonner";

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 1) Current user ( Check if user logged in or not - check if token valid )
        const meRes = await fetch("/api/auth/me");
        if (!meRes.ok) {
          router.push("/Login");
          return;
        }
        const meData = await meRes.json();
        setUser(meData.user);

        // 2) Favorites ids
        const favRes = await fetch("/api/favorites");
        if (favRes.ok) {
          const favData = await favRes.json();
          setFavoriteIds(favData.favorites ?? []);
        }
      } catch {
        toast.error("Could not load profile");
        router.push("/Login");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [router]);

  const favoritePets = petsData.filter((pet) => favoriteIds.includes(pet.id));

  const handleRemoveFavorite = async (petId: number) => {
    try {
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId }),
      });

      if (!res.ok) {
        toast.error("Could not remove from favorites");
        return;
      }

      setFavoriteIds((prev) => prev.filter((id) => id !== petId));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0)">
        <p className="text-lg font-medium text-(--color-primary-darkBlue) dark:text-gray-200 animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) return null;

  const initial = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* Header */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) rounded-3xl shadow-xl p-8 md:p-10 flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-(--color-primary-darkBlue) dark:bg-(--color-secondary-monYellow) flex items-center justify-center text-4xl md:text-5xl font-bold text-white dark:text-(--color-neutral-0) shadow-lg">
              {initial}
            </div>

            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow)">
                {user.name}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {user.email}
              </p>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {favoritePets.length} favorite
                {favoritePets.length === 1 ? "" : "s"}
              </p>
            </div>

            <Link href="/available-pets">
              <Button variant="primary">Browse Pets</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Favorites */}
      <section className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-8">
          My Favorites
        </h2>

        {favoritePets.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-(--color-neutral-0)/50 rounded-3xl border border-transparent dark:border-(--color-card-border)">
            <div className="text-6xl mb-4 opacity-70">🐾</div>
            <h3 className="text-xl font-semibold text-(--color-primary-darkBlue) dark:text-gray-200 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Save pets you love and find them here anytime.
            </p>
            <Link href="/available-pets">
              <Button variant="primary">Find Pets to Love</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {favoritePets.map((pet) => (
              <div
                key={pet.id}
                className="group relative rounded-2xl shadow-lg overflow-hidden flex flex-col bg-white dark:bg-(--color-neutral-10) w-full max-w-[340px] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
              >
                <div className="relative h-56">
                  <Image
                    src={pet.mainImage}
                    alt={pet.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-white/90 p-2 shadow">
                    <icons.Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100">
                      {pet.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {pet.type} • {pet.age} • {pet.gender}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-2">
                    <Link href={`/pets/${pet.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-400 dark:border-red-500/50 dark:text-red-400"
                      onClick={() => handleRemoveFavorite(pet.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
