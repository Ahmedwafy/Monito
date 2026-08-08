// app/volunteer/page.tsx
import * as icons from "@/assets/icons";
import Button from "@/components/atoms/Button";
import Link from "next/link";

const volunteerOpportunities = [
  {
    title: "Dog Walking & Playtime",
    description:
      "Spend time walking, playing, and socializing dogs at the shelter. Great for animal lovers who enjoy being active outdoors.",
    commitment: "2 - 4 hours per week",
    icon: (
      <icons.PawPrint className="w-12 h-12 text-(--color-secondary-monYellow)" />
    ),
  },
  {
    title: "Cat Socialization",
    description:
      "Help shy or new cats become more comfortable around people through gentle play, brushing, and cuddles.",
    commitment: "Flexible, 1 - 3 hours per visit",
    icon: (
      <icons.Heart className="w-12 h-12 text-(--color-secondary-monYellow)" />
    ),
  },
  {
    title: "Event & Photography Support",
    description:
      "Assist during adoption events, take beautiful photos of pets for our website and social media, or help with setup/cleanup.",
    commitment: "Event-based (weekends mostly)",
    icon: (
      <icons.Camera className="w-12 h-12 text-(--color-secondary-monYellow)" />
    ),
  },
  {
    title: "Administrative & Fundraising Help",
    description:
      "Assist with data entry, social media posting, organizing donations, or helping plan fundraising activities.",
    commitment: "Flexible, can be remote or in-person",
    icon: (
      <icons.Users className="w-12 h-12 text-(--color-secondary-monYellow)" />
    ),
  },
];

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24 bg-(--color-primary-darkBlue) dark:bg-(--color-neutral-5) text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-secondary-monYellow) rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="relative container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !dark:text-(--color-neutral-100) dark:text-blue-400 mb-6">
            Become a Volunteer
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Your time and love can change an animal&apos;s life. Join our
            volunteer family today!
          </p>
        </div>
      </section>

      {/* Opportunities */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {volunteerOpportunities.map((opp, index) => (
            <div
              key={index}
              className="
                bg-white dark:bg-(--color-neutral-10) rounded-2xl shadow-xl p-6 md:p-8 
                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
                flex flex-col border border-transparent dark:border-(--color-card-border)
              "
            >
              <div className="mb-5 flex justify-center">{opp.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-3 text-center">
                {opp.title}
              </h3>
              <p className="text-gray-700 dark:text-(--color-secondary-monYellow) mb-4 flex-1 text-center leading-relaxed">
                {opp.description}
              </p>
              <p className="text-sm font-medium text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) text-center">
                Commitment: {opp.commitment}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Apply */}
      <section className="bg-white dark:bg-(--color-neutral-10) py-16 md:py-20 border-y border-transparent dark:border-(--color-card-border)">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-6">
            Ready to Help?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
            Fill out a simple message through our contact form or reach out
            directly. We&apos;ll get back to you within 48 hours to discuss
            opportunities that match your schedule and interests.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link href="/contact">
              <Button
                variant="primary"
                className="text-lg px-10 py-4 hover:scale-[1.02] transition-transform duration-300"
              >
                Contact Us to Volunteer
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                className="text-lg px-10 py-4 border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow)"
              >
                Ask About Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="px-4 py-16 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-10) dark:border dark:border-(--color-card-border) py-12 px-8 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) mb-4">
            Every Hour Counts
          </h3>
          <p className="text-lg text-(--color-primary-darkBlue)/90 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your help means more pets get walked, played with, photographed, and
            ultimately — adopted.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              className="text-lg px-10 py-4 hover:scale-[1.02] transition-transform duration-300"
            >
              Start Volunteering Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
