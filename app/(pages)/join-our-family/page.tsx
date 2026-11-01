// app/(pages)/join-our-family/page.tsx
import * as icons from "@/assets/icons";
import Button from "@/components/atoms/Button";
import BottomCTA from "@/components/molecules/BottomCTA";
import TopPageBanner from "@/components/molecules/TopPageBanner";
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
    <div className="min-h-screen bg-(--page-bg) pb-20">
      {/* === Banner Section === */}
      <section className="pt-1">
        <TopPageBanner
          title="Join Our Family"
          description="Whether you adopt, volunteer, or simply spread the word — you become
            part of a community that gives animals a second chance."
        />
      </section>

      {/* Benefits / Ways to Join */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-(--join-title) mb-4 transition-colors duration-300">
            How You Can Join
          </h2>
          <p className="text-lg text-(--join-desc) max-w-2xl mx-auto transition-colors duration-300">
            There are many ways to be part of One More Friend. Choose what fits
            you best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="
          bg-(--join-card-bg) rounded-2xl shadow-xl p-6 md:p-8
          hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
          flex flex-col border border-(--join-card-border)
        "
            >
              <div className="mb-5 flex justify-center">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-(--join-card-title) mb-3 text-center transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-(--join-card-text) mb-6 flex-1 text-center leading-relaxed transition-colors duration-300">
                {item.description}
              </p>
              <Link href={item.href} className="mt-auto">
                <Button
                  variant="outline"
                  className="border-(--join-btn-border) text-(--join-btn-text) w-full transition-colors duration-300"
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
        <div className="max-w-3xl mx-auto text-center bg-(--auth-note-bg) rounded-2xl shadow-lg p-8 border border-(--auth-note-border) transition-colors duration-300">
          <h3 className="text-2xl font-bold text-(--auth-note-title) mb-3 transition-colors duration-300">
            Want an account?
          </h3>
          <p className="text-(--auth-note-text) mb-6 transition-colors duration-300">
            Create an account to save your favorite pets, track your volunteer
            hours, and receive updates on new arrivals. It&apos;s quick and
            easy!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/SignUp">
              <Button
                variant="outline"
                className="border-(--auth-note-btn-border) text-(--auth-note-btn-text) transition-colors duration-300"
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/Login">
              <Button
                variant="outline"
                className="border-(--auth-note-btn-border) text-(--auth-note-btn-text) transition-colors duration-300"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* === Bottom CTA === */}
      <BottomCTA
        title="Your Next Friend Is Waiting"
        description="Start with a simple step — browse pets, volunteer, or send us a message."
        btnName="Explore Pets"
        href1="/available-pets"
      />
    </div>
  );
}
