import Link from "next/link";
import Button from "@/app/components/atoms/Button";
import * as icons from "@/assets/icons";
import Image from "next/image";
// import lostPet from "@/assets/images/404-lost-pet.png"; // Optional

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fceed5] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl">
        {/* Optional Image */}
        {/* <div className="mb-10">
          <Image
            src={lostPet || "/404-placeholder.png"}
            alt="Lost pet looking for home"
            width={400}
            height={300}
            className="mx-auto rounded-2xl shadow-xl"
          />
        </div> */}

        <h1 className="text-6xl md:text-8xl font-bold text-(--color-primary-darkBlue) mb-6">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>

        <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
          It looks like this page got lost chasing its tail. Don&apos;t worry —
          even the best pets wander off sometimes!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/">
            <Button
              variant="primary"
              className="text-xl px-10 py-5 bg-(--color-primary-darkBlue) hover:bg-(--color-primary-darkBlue)/90"
            >
              Go Back Home
            </Button>
          </Link>

          <Link href="/pets">
            <Button
              variant="outline"
              className="text-xl px-10 py-5 border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) hover:bg-(--color-primary-darkBlue) hover:text-white"
            >
              Browse Available Pets
            </Button>
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
