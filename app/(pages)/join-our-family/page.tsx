// app/(pages)/join-our-family/page.tsx
import * as icons from "@/assets/icons";
import Button from "@/components/atoms/Button";
import Link from "next/link";

const benefits = [
  {
    title: "Adopt a Friend",
    description:
      "Browse available pets and give a loving animal a forever home.",
    icon: (
      <icons.Heart className="w-10 h-10 text-(--color-secondary-monYellow)" />
    ),
    href: "/available-pets",
    cta: "See Available Pets",
  },
  {
    title: "Volunteer With Us",
    description:
      "Help with walking, socializing, events, or admin support — every hour counts.",
    icon: (
      <icons.Users className="w-10 h-10 text-(--color-secondary-monYellow)" />
    ),
    href: "/volunteer",
    cta: "Become a Volunteer",
  },
  {
    title: "Stay Connected",
    description:
      "Have questions or want to support in another way? Reach out anytime.",
    icon: (
      <icons.PawPrint className="w-10 h-10 text-(--color-secondary-monYellow)" />
    ),
    href: "/contact",
    cta: "Contact Us",
  },
];

export default function JoinOurFamilyPage() {
  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24 bg-(--color-primary-darkBlue) dark:bg-(--color-neutral-5) text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-secondary-monYellow) rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="relative container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Join Our Family
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Whether you adopt, volunteer, or simply spread the word — you become
            part of a community that gives animals a second chance.
          </p>
        </div>
      </section>

      {/* Benefits / Ways to Join */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-neutral-100) mb-4">
            How You Can Join
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            There are many ways to be part of One More Friend. Choose what fits
            you best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="
                bg-white dark:bg-(--color-neutral-0) rounded-2xl shadow-xl p-6 md:p-8
                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
                flex flex-col border border-transparent dark:border-(--color-card-border)
              "
            >
              <div className="mb-5 flex justify-center">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-neutral-100) mb-3 text-center">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 flex-1 text-center leading-relaxed">
                {item.description}
              </p>
              <Link href={item.href} className="mt-auto">
                <Button
                  variant="outline"
                  className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) 
                  dark:text-(--color-secondary-monYellow) w-full"
                >
                  {item.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Optional Auth Note */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-3xl mx-auto text-center bg-white dark:bg-(--color-neutral-0) rounded-2xl shadow-lg p-8 border border-transparent dark:border-(--color-card-border)">
          <h3 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-neutral-100) mb-3">
            Want an account?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Account features are coming soon. For now, you can adopt, volunteer,
            or contact us without signing up.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/">
              <Button
                variant="outline"
                className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow)"
              >
                Sign Up (Coming Soon)
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow)"
              >
                Login (Coming Soon)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-12 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-0) dark:border dark:border-(--color-card-border) py-12 px-8 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) mb-4">
            Your Next Friend Is Waiting
          </h3>
          <p className="text-lg text-(--color-primary-darkBlue)/90 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Start with a simple step — browse pets, volunteer, or send us a
            message.
          </p>
          <Link href="/available-pets">
            <Button
              variant="primary"
              className="text-lg px-10 py-4 hover:scale-[1.02] transition-transform duration-300"
            >
              Explore Available Pets
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
