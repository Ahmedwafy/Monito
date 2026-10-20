// components/pages/Profile/ProfilePage.tsx
// GET /api/auth/me → GET /api/favorites
// if not logged in → /Login
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { petsData } from "@/app/mock-data/mockPets";
import * as icons from "@/assets/icons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";
import { useMe } from "@/hooks/useMe";
import { useToggleFavorite } from "@/hooks/useToggleFavorite";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useOrders } from "@/hooks/useOrders";
import { ChevronDown } from "lucide-react";

const ProfilePage = () => {
  const router = useRouter();
  const toggleFavorite = useToggleFavorite();
  const updateProfile = useUpdateProfile();
  const { data: user, isLoading: isUserLoading } = useMe();
  const { data: orders = [], isLoading: isOrdersLoading } = useOrders();
  const { data: favoriteIds = [], isLoading: isFavoritesLoading } =
    useFavorites();

  const favoritePets = petsData.filter((pet) => favoriteIds.includes(pet.id));

  const [openSections, setOpenSections] = useState({
    profile: false,
    favorites: false,
    orders: false,
  });
  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [openOrderId, setOpenOrderId] = useState<string | null>(null);
  const toggleOrder = (id: string) => {
    setOpenOrderId((prev) => (prev === id ? null : id));
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    setForm({
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
    });
  }, [user]);

  const handleRemoveFavorite = (petId: number) => {
    toggleFavorite.mutate(
      {
        petId,
        isFavorite: true, // true = currently favorite → DELETE
      },
      {
        onSuccess: () => toast.success("Removed from favorites"),
        onError: (error) => {
          if (error.message === "Unauthorized") {
            toast.error("Please log in to manage favorites");
            router.push("/Login");
            return;
          }
          toast.error(error.message);
        },
      },
    );
  };

  // Handle Save Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(
      {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      },
      {
        onSuccess: () => toast.success("Profile updated"),
        onError: (error) => toast.error(error.message),
      },
    );
  };

  if (isUserLoading || isFavoritesLoading) {
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
      {/* ========== Header ==========*/}
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
              {user.phone && (
                <p className="text-sm text-gray-500">{user.phone}</p>
              )}
              {user.address && (
                <p className="text-sm text-gray-500">{user.address}</p>
              )}
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

      {/* ========== Edit Profile ========== */}
      <section className="container mx-auto px-4 max-w-5xl mb-12">
        <div
          className="bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) 
        rounded-3xl shadow-xl p-6 md:p-8"
        >
          <button
            type="button"
            onClick={() => toggleSection("profile")}
            className="w-full flex items-center justify-between p-6 md:p-8 text-left"
          >
            <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100">
              Edit Profile
            </h2>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                border border-gray-200 bg-gray-50
                dark:border-gray-600 dark:bg-white/5
                transition-all duration-300 ease-in-out 
                ${
                  openSections.profile
                    ? "rotate-180 bg-(--color-secondary-monYellow)/30 border-(--color-secondary-monYellow)/50"
                    : "rotate-0"
                }`}
            >
              <ChevronDown
                className={`h-5 w-5 text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) transition-transform duration-300`}
                strokeWidth={2.5}
              />
            </span>
          </button>

          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
              openSections.profile ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <form
                  onSubmit={handleSaveProfile}
                  className="space-y-5 max-w-xl"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2 text-(--color-primary-darkBlue) dark:text-gray-200">
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent px-4 py-3 focus:border-(--color-secondary-monYellow) focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-(--color-primary-darkBlue) dark:text-gray-200">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-3 opacity-70 cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-(--color-primary-darkBlue) dark:text-gray-200">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="01xxxxxxxxx"
                      className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent px-4 py-3 focus:border-(--color-secondary-monYellow) focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-(--color-primary-darkBlue) dark:text-gray-200">
                      Address
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, address: e.target.value }))
                      }
                      placeholder="Your city / address"
                      className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent px-4 py-3 focus:border-(--color-secondary-monYellow) focus:outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={updateProfile.isPending}
                  >
                    {updateProfile.isPending ? "Saving..." : "Save changes"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== My Favorites ========== */}
      <section className="container mx-auto px-4 max-w-5xl mb-12">
        <div
          className="bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) 
        rounded-3xl shadow-xl p-6 md:p-8"
        >
          <button
            type="button"
            onClick={() => toggleSection("favorites")}
            className="w-full flex items-center justify-between p-6 md:p-8 text-left"
          >
            <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100">
              My Favorites ({favoritePets.length})
            </h2>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                border border-gray-200 bg-gray-50
                dark:border-gray-600 dark:bg-white/5
                transition-all duration-300 ease-in-out 
                ${
                  openSections.favorites
                    ? "rotate-180 bg-(--color-secondary-monYellow)/30 border-(--color-secondary-monYellow)/50"
                    : "rotate-0"
                }`}
            >
              <ChevronDown
                className={`h-5 w-5 text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) transition-transform duration-300`}
                strokeWidth={2.5}
              />
            </span>
          </button>

          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
              openSections.favorites ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-6 md:px-8 pb-6 md:pb-8">
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
                              className="w-full border-red-300 text-red-600 ..."
                              disabled={
                                toggleFavorite.isPending &&
                                toggleFavorite.variables?.petId === pet.id
                              }
                              onClick={() => handleRemoveFavorite(pet.id)}
                            >
                              {toggleFavorite.isPending &&
                              toggleFavorite.variables?.petId === pet.id
                                ? "Removing..."
                                : "Remove"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== My Orders ========== */}
      <section className="container mx-auto px-4 max-w-5xl mt-16">
        <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-6">
          My Orders ({orders.length})
        </h2>

        {isOrdersLoading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            You haven&apos;t placed any orders yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => {
              const isOpen = openOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white dark:bg-(--color-neutral-5) rounded-2xl shadow-lg overflow-hidden border border-transparent dark:border-(--color-card-border)"
                >
                  {/* Header — always visible */}
                  <button
                    type="button"
                    onClick={() => toggleOrder(order.id)}
                    // onClick={() => toggleSection("orders")}
                    className="w-full flex flex-wrap items-center justify-between gap-3 p-5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500 font-mono truncate">
                        #{order.id}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : ""}
                        {" · "}
                        {order.totalItems} item
                        {order.totalItems !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-(--color-secondary-monYellow)/40 text-(--color-primary-darkBlue) capitalize">
                        {order.status}
                      </span>
                      <span
                        className={`text-(--color-primary-darkBlue) transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                  </button>

                  {/* Body — accordion panel */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pt-0 border-t border-gray-100 dark:border-gray-700">
                        <ul className="space-y-2 my-4">
                          {order.items.map((item, idx) => (
                            <li
                              key={`${order.id}-${item.productId}-${idx}`}
                              className="flex justify-between text-sm text-(--color-primary-darkBlue)"
                            >
                              <span>
                                {item.name} × {item.quantity}
                              </span>
                              <span className="text-gray-500">
                                {item.price}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.fullName} · {order.phone}
                          <br />
                          {order.address}, {order.city}
                        </p>

                        {order.notes ? (
                          <p className="mt-2 text-sm text-gray-500 italic">
                            Note: {order.notes}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
