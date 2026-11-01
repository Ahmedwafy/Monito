// app/volunteer/page.tsx
import * as icons from "@/assets/icons";
import Button from "@/components/atoms/Button";
import BottomCTA from "@/components/molecules/BottomCTA";
import TopPageBanner from "@/components/molecules/TopPageBanner";
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
    <div className="min-h-screen bg-(--page-bg) pb-20">
      {/* === Banner Section === */}
      <section className="pt-1">
        <TopPageBanner
          title="Become a Volunteer"
          description="Your time and love can change an animal's life. Join our volunteer family today!"
        />
      </section>

      {/* Opportunities */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {volunteerOpportunities.map((opp, index) => (
            <div
              key={index}
              className="
                bg-(--volunteer-card-bg) rounded-2xl shadow-xl p-6 md:p-8
                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
                flex flex-col border border-transparent
              "
            >
              <div className="mb-5 flex justify-center text-(--volunteer-card-icon)">
                {opp.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-(--volunteer-card-title) mb-3 text-center">
                {opp.title}
              </h3>
              <p className="text-(--volunteer-card-description) mb-4 flex-1 text-center leading-relaxed">
                {opp.description}
              </p>
              <p className="text-sm font-medium text-(--volunteer-card-footer) text-center">
                Commitment: {opp.commitment}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 md:py-20 border-y border-transparent">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-(--volunteer-card-title) mb-6">
            Ready to Help?
          </h2>
          <p className="text-lg text-(--volunteer-card-description) mb-10 leading-relaxed">
            Fill out a simple message through our contact form or reach out
            directly. We&apos;ll get back to you within 48 hours to discuss
            opportunities that match your schedule and interests.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link href="/contact">
              <Button variant="outline">Contact Us to Volunteer</Button>
            </Link>

            <Link href="/contact">
              <Button variant="outline">Ask About Opportunities</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* === Bottom CTA === */}
      <BottomCTA
        title="Every Hour Counts"
        description="Your help means more pets get walked, played with, photographed, and ultimately — adopted."
        btnName="Start Volunteering Today"
        href1="/contact"
      />
    </div>
  );
}
