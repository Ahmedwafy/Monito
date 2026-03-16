// app/(main)/Pets/[id]/page.tsx

// import * as images from "@/assets/images/images";
import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";
import { petsData } from "@/app/mock-data/mockPets";

const getPetById = (id: number) => {
  return petsData.find((pet) => pet.id === id) || null;
};

// if /pets/3 then params = { id: "3" }
// in Next.js app router, params are always strings
interface PetPageProps {
  params: Promise<{ id: string }>;
}

// const petId = 1; // For testing, replace with dynamic value from params

const SinglePetPage = async ({ params }: PetPageProps) => {
  const resolvedParams = await params;
  const petId = Number(resolvedParams.id);
  const pet = getPetById(petId);
  console.log("Found pet:", pet);
  console.log(petId, resolvedParams.id);

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fceed5]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-(--color-primary-darkBlue)">
            Pet not found
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            The pet you&apos;re looking for might have found a home already!
          </p>
          <Link href="/pets" className="mt-8 inline-block">
            <Button variant="primary">Back to All Pets</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fceed5] pb-20">
      {/* Hero / Main Image Section */}
      <section className="relative pb-4">
        <div className="h-[50vh] md:h-[70vh] lg:h-screen lg:w-screen relative">
          <div className="relative w-full h-full ml-20 overflow-hidden">
            <Image
              src={pet.mainImage}
              alt={pet.name}
              fill
              className="object-cover brightness-[0.85] scale-90"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12 md:pb-16 lg:pb-24">
            <div className="max-w-4xl">
              <div className="inline-block px-5 py-2 rounded-full bg-(--color-secondary-monYellow) text-(--color-primary-darkBlue) font-semibold mb-4">
                {pet.type} • {pet.gender}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                {pet.name}
              </h1>
              <p className="mt-3 text-xl md:text-2xl text-white/90">
                {pet.breed} • {pet.age} • {pet.size}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - using flex instead of grid */}
      <section className="container mx-auto px-4 -mt-25 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left/Main Content - Gallery + Description */}
          <div className="flex-1 space-y-8 order-2 lg:order-1">
            {/* Gallery */}
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
              <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) mb-4">
                Gallery
              </h2>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {pet.gallery.map((img, index) => (
                  <div
                    key={index}
                    className="
                      relative flex-1 min-w-[140px] sm:min-w-[180px] md:min-w-[200px] 
                      aspect-square rounded-xl overflow-hidden 
                      border-2 border-(--color-secondary-monYellow)/20 
                      hover:border-(--color-secondary-monYellow) transition-all
                    "
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

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) mb-6">
                About {pet.name}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {pet.description}
              </p>

              {/* Traits + Health */}
              <div className="mt-8 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-(--color-primary-darkBlue) mb-3">
                    Personality & Traits
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.traits.map((trait, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-(--color-secondary-monYellow)/20 text-(--color-primary-darkBlue) rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-(--color-primary-darkBlue) mb-3">
                    Health & Care
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• {pet.health}</li>
                    {pet.specialNeeds && (
                      <li>• Special needs: {pet.specialNeeds}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Info & Apply Button */}
          <div className="w-full lg:w-96 lg:min-w-[380px] order-1 lg:order-2 lg:sticky lg:top-8 h-fit space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-4 border-(--color-secondary-monYellow)">
              <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) mb-6">
                Quick Info
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Age</span>
                  <span className="font-medium">{pet.age}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Gender</span>
                  <span className="font-medium">{pet.gender}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Size</span>
                  <span className="font-medium">{pet.size}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-medium">{pet.weight}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Breed</span>
                  <span className="font-medium">{pet.breed}</span>
                </div>
              </div>

              <div className="mt-10">
                <Link href="/adopt-form" className="block w-full">
                  <Button
                    variant="primary"
                    className="w-full py-4 text-lg bg-(--color-primary-darkBlue) hover:bg-(--color-primary-darkBlue)/90 transition"
                  >
                    Apply to Adopt {pet.name}
                    <icons.Heart className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <p className="mt-4 text-center text-sm text-gray-500">
                  This will start the adoption process
                </p>
              </div>
            </div>

            <div className="bg-(--color-secondary-monYellow)/10 rounded-2xl p-6 text-center">
              <p className="text-(--color-primary-darkBlue) font-medium">
                Have questions about {pet.name}?
              </p>
              <Link href="/contact" className="mt-3 inline-block">
                <Button
                  variant="outline"
                  className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue)"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-[#FFB775] py-12 px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue)">
            Ready to give {pet.name} a forever home?
          </h3>
          <p className="mt-4 text-lg text-(--color-primary-darkBlue)/90">
            Start your adoption journey today — we can&apos;t wait to help you!
          </p>
          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <Link href="/adopt-form">
              <Button variant="primary">Apply Now</Button>
            </Link>
            <Link href="/availablePets">
              <Button
                variant="outline"
                className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue)"
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
