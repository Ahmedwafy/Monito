import Link from "next/link";
import Button from "@/components/atoms/Button";
import Image from "next/image";
import * as images from "@/assets/images/images";
// import lostPet from "@/assets/images/404-lost-pet.png"; // Optional

export default function NotFound() {
  return (
    <div className="min-h-screen bg-(--page-bg) flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl">
        {/* Optional Image */}
        <div className="mb-10">
          <Image
            src={images.notFound}
            alt="Lost pet looking for home"
            width={400}
            height={300}
            className="mx-auto rounded-2xl"
          />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-(--not-found-title) mb-6">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold text-(--not-found-sub-title) mb-4">
          Oops! Page Not Found
        </h2>

        <p className="text-lg md:text-xl text-(--not-found-details) mb-10 leading-relaxed">
          It looks like this page got lost chasing its tail. Don&apos;t worry —
          even the best pets wander off sometimes!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/">
            <Button variant="outline">Go Back Home</Button>
          </Link>

          <Link href="/available-pets">
            <Button variant="outline">Browse Available Pets</Button>
          </Link>
        </div>

        <p className="mt-12 text-gray-500">
          If you think something&apos;s broken, feel free to{" "}
          <Link
            href="/contact"
            className="text-(--color-primary-darkBlue) underline hover:text-(--color-secondary-monYellow)"
          >
            let us know
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
