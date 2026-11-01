// app/how-to-adopt/page.tsx
import * as icons from "@/assets/icons";
import Image from "next/image";
// import Link from "next/link";
// import Button from "@/components/atoms/Button";
import BottomCTA from "@/components/molecules/BottomCTA";
import TopPageBanner from "@/components/molecules/TopPageBanner";

const steps = [
  {
    number: 1,
    title: "Browse Available Pets",
    description:
      "Take your time to explore our available pets. Read their profiles, look at their photos, and see which one feels like the right match for you and your lifestyle.",
    icon: <icons.Search className="w-10 h-10 " />,
    image: null, // Add an Image if Needed
  },
  {
    number: 2,
    title: "Submit an Adoption Application",
    description:
      "Once you've found a pet you'd like to meet, fill out our adoption application form. This helps us learn more about you, your home, and your experience with pets.",
    icon: <icons.FileText className="w-10 h-10 " />,
    image: null,
  },
  {
    number: 3,
    title: "Meet & Greet",
    description:
      "If your application looks like a good fit, we'll arrange a meet-and-greet at the shelter or a safe location. This is a chance for you and the pet to get to know each other.",
    icon: <icons.HeartHandshake className="w-10 h-10 " />,
    image: null,
  },
  {
    number: 4,
    title: "Home Visit (if needed)",
    description:
      "In some cases, we may schedule a quick home visit to ensure the environment is safe and suitable for the pet. This step is done with your convenience in mind.",
    icon: <icons.Home className="w-10 h-10 " />,
    image: null,
  },
  {
    number: 5,
    title: "Sign Adoption Agreement & Take Your New Friend Home",
    description:
      "After everything is approved, you'll sign a simple adoption agreement, pay the adoption fee (which covers vaccinations, spay/neuter, microchip, etc.), and welcome your new family member home!",
    icon: <icons.PawPrint className="w-10 h-10 " />,
    image: null,
  },
];

export default function AdoptionProcessPage() {
  return (
    <div className="min-h-screen bg-(--page-bg) pb-20">
      {/* === Banner Section === */}
      <section className="pt-1">
        <TopPageBanner
          title=" Adoption Process"
          description="Adopting a pet is simple, thoughtful, and rewarding. Here's how it works step by step."
        />
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
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-(--icon-bg) border-2 border-(--icon-border) text-(--icon-color)! flex items-center justify-center shadow-lg mb-3">
                  {step.icon}
                </div>
                <div className="w-12 h-12 rounded-full bg-(--number-bg) text-(--number-color) flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-(--card-bg) rounded-2xl shadow-xl p-6 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-(--card-title-color) mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-(--card-description-color) leading-relaxed">
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

      {/* === Bottom CTA === */}
      <BottomCTA
        title="Ready to Start Your Journey?"
        description="Browse our available pets and find the one who’s waiting for you."
        btnName="View Available Pets"
        href1="/available-pets"
      />
    </div>
  );
}
