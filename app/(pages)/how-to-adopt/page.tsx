// app/how-to-adopt/page.tsx
import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";
// import step1Img from "@/assets/images/adoption-step1.jpg"; // لو عندك صور توضيحية
// import step2Img from "@/assets/images/adoption-step2.jpg";
// import step3Img from "@/assets/images/adoption-step3.jpg";

const steps = [
  {
    number: 1,
    title: "Browse Available Pets",
    description:
      "Take your time to explore our available pets. Read their profiles, look at their photos, and see which one feels like the right match for you and your lifestyle.",
    icon: (
      <icons.Search className="w-10 h-10 text-(--color-primary-darkBlue)" />
    ),
    image: null, // Add an Image if Needed
  },
  {
    number: 2,
    title: "Submit an Adoption Application",
    description:
      "Once you've found a pet you'd like to meet, fill out our adoption application form. This helps us learn more about you, your home, and your experience with pets.",
    icon: (
      <icons.FileText className="w-10 h-10 text-(--color-primary-darkBlue)" />
    ),
    image: null,
  },
  {
    number: 3,
    title: "Meet & Greet",
    description:
      "If your application looks like a good fit, we'll arrange a meet-and-greet at the shelter or a safe location. This is a chance for you and the pet to get to know each other.",
    icon: (
      <icons.HeartHandshake className="w-10 h-10 text-(--color-primary-darkBlue)" />
    ),
    image: null,
  },
  {
    number: 4,
    title: "Home Visit (if needed)",
    description:
      "In some cases, we may schedule a quick home visit to ensure the environment is safe and suitable for the pet. This step is done with your convenience in mind.",
    icon: <icons.Home className="w-10 h-10 text-(--color-primary-darkBlue)" />,
    image: null,
  },
  {
    number: 5,
    title: "Sign Adoption Agreement & Take Your New Friend Home",
    description:
      "After everything is approved, you'll sign a simple adoption agreement, pay the adoption fee (which covers vaccinations, spay/neuter, microchip, etc.), and welcome your new family member home!",
    icon: (
      <icons.PawPrint className="w-10 h-10 text-(--color-primary-darkBlue)" />
    ),
    image: null,
  },
];

export default function AdoptionProcessPage() {
  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24 bg-(--color-primary-darkBlue) dark:bg-(--color-neutral-5)! text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-(--color-secondary-monYellow) rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-6">
            Adoption Process
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Adopting a pet is simple, thoughtful, and rewarding. Here&apos;s how
            it works step by step.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col gap-10 md:gap-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`
                flex flex-col md:flex-row items-center gap-8 md:gap-12
                ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}
              `}
            >
              {/* Icon + Number */}
              <div className="flex flex-col items-center min-w-[120px]">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-(--color-secondary-monYellow) flex items-center justify-center shadow-lg mb-3">
                  {step.icon}
                </div>
                <div className="w-12 h-12 rounded-full bg-(--color-primary-darkBlue) text-white flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-white dark:bg-(--color-neutral-10) rounded-2xl shadow-xl p-6 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>

                {/* Optional image per step */}
                {step.image && (
                  <div className="mt-6 rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-10) dark:border dark:border-(--color-secondary-monYellow) dark:shadow-xl py-12 px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-(--color-primary-darkBlue)/90 dark:text-(--color-secondary-monYellow)/90 mb-8">
            Browse our available pets and find the one who’s waiting for you.
          </p>
          <Link href="/availablePets">
            <Button
              variant="primary"
              className="text-xl px-12 py-5 hover:scale-103 hover:text-white transition-all duration-300"
            >
              View Available Pets
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
