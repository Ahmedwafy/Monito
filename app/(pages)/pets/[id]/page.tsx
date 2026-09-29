// app/(pages)/pets/[id]/page.tsx
import * as icons from "@/assets/icons";
import * as images from "@/assets/images/images";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import Button from "@/components/atoms/Button";
import PetFavoriteControl from "@/components/atoms/PetFavoriteControl";
import { petsData } from "@/app/mock-data/mockPets";
import { AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

const getPetById = (id: number) => {
  return petsData.find((pet) => pet.id === id) || null;
};

const isPetFavorite = async (petId: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload) return false;

  await connectDB();
  const user = await User.findById(payload.userId).select("favorites");
  return user?.favorites.includes(petId) ?? false;
};

interface PetPageProps {
  params: Promise<{ id: string }>;
}

const SinglePetPage = async ({ params }: PetPageProps) => {
  const resolvedParams = await params;
  const petId = Number(resolvedParams.id);
  const pet = getPetById(petId);

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0)">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100">
            Pet not found
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            The pet you&apos;re looking for might have found a home already!
          </p>
          <Link href="/available-pets" className="mt-8 inline-block">
            <Button variant="primary">Back to Available Pets</Button>
          </Link>
        </div>
      </div>
    );
  }

  const favorite = await isPetFavorite(pet.id);

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* ========== Hero Image ========== */}
      <section className="relative h-[50vh] md:h-[65vh] lg:h-[70vh] w-full overflow-hidden">
        <Image
          src={images.petsCover}
          alt={pet.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-10 md:pb-16">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-(--color-secondary-monYellow) text-(--color-primary-darkBlue) font-semibold text-sm mb-4">
              {pet.type} • {pet.gender}
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                {pet.name}
              </h1>

              {favorite && (
                <icons.Heart className="w-8 h-8 md:w-10 md:h-10 text-red-500 fill-red-500 drop-shadow" />
              )}
            </div>
            <p className="mt-3 text-lg md:text-xl text-white/90">
              {pet.breed} • {pet.age} • {pet.size}
            </p>
          </div>
        </div>
      </section>

      {/* ========== Main Content ========== */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Column */}
          <div className="flex-1 space-y-8 order-2 lg:order-1">
            {/* Gallery */}
            <div className="bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) rounded-2xl shadow-xl p-5 md:p-6">
              <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-4">
                Gallery
              </h2>
              <div className="flex flex-wrap gap-3">
                {pet.gallery.map((img, index) => (
                  <div
                    key={index}
                    className="relative flex-1 min-w-[130px] sm:min-w-40 aspect-square rounded-xl overflow-hidden border-2 border-(--color-secondary-monYellow)/30 hover:border-(--color-secondary-monYellow) transition-all"
                  >
                    <Image
                      src={img}
                      alt={`${pet.name} - ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-5">
                About {pet.name}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {pet.description}
              </p>

              <div className="mt-8 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-3">
                    Personality & Traits
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.traits.map((trait, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-(--color-secondary-monYellow)/20 text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-3">
                    Health & Care
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• {pet.health}</li>
                    {pet.specialNeeds && pet.specialNeeds !== "None" && (
                      <li>• Special needs: {pet.specialNeeds}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-96 lg:min-w-[360px] order-1 lg:order-2 lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-6">
                Quick Info
              </h2>

              <div className="space-y-3">
                {[
                  { label: "Age", value: pet.age },
                  { label: "Gender", value: pet.gender },
                  { label: "Size", value: pet.size },
                  { label: "Weight", value: pet.weight },
                  { label: "Breed", value: pet.breed },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between py-2.5 border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.label}
                    </span>
                    <span className="font-medium text-(--color-primary-darkBlue) dark:text-gray-200">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="mb-4">
                  <PetFavoriteControl
                    petId={pet.id}
                    initialIsFavorite={favorite}
                  />
                </div>
                <Link href="/adopt-form" className="flex w-full justify-center">
                  <Button
                    variant="primary"
                    className="group w-fit gap-0 whitespace-nowrap py-4 text-lg bg-(--color-primary-darkBlue) hover:bg-(--color-primary-darkBlue)/90 transition-[background-color] duration-500 ease-in-out"
                  >
                    Apply to Adopt {pet.name}
                    <icons.Heart className="h-5 w-0 shrink-0 overflow-hidden opacity-0 group-hover:ml-2 group-hover:w-5 group-hover:opacity-100 transition-[width,margin,opacity] duration-500 ease-in-out" />
                  </Button>
                </Link>
                <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                  This will start the adoption process
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) rounded-2xl p-6 text-center shadow-lg">
              <p className="text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) font-medium">
                Have questions about {pet.name}?
              </p>
              <Link href="/contact" className="mt-3 inline-block">
                <Button
                  variant="outline"
                  className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow)"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Bottom CTA ========== */}
      <section className="mt-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) py-12 px-8 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow)">
            Ready to give {pet.name} a forever home?
          </h3>
          <p className="mt-4 text-lg text-(--color-primary-darkBlue)/90 dark:text-gray-300">
            Start your adoption journey today — we can&apos;t wait to help you!
          </p>

          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <Link href="/adopt-form">
              <Button
                variant="outline"
                className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow)"
              >
                Apply Now
              </Button>
            </Link>
            <Link href="/available-pets">
              <Button
                variant="outline"
                className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow)"
              >
                See More Pets
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SinglePetPage;
