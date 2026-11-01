// app/about/page.tsx
"use client";
import { useEffect } from "react";
import * as icons from "@/assets/icons";
import Image from "next/image";
// import Link from "next/link";
// import Button from "@/components/atoms/Button";
import { teamMembers } from "@/app/mock-data/mockTeamMembers";
import { Heart, Users } from "lucide-react";
import BottomCTA from "@/components/molecules/BottomCTA";
import TopPageBanner from "@/components/molecules/TopPageBanner";

const AboutPage = () => {
  // This useEffect handles the smooth scrolling when the page is loaded with a hash in the URL.
  // For example, if the URL is /about#team, the page will scroll to the element with id="team".
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  // Scroll to a specific section with id="team"
  const handleClick = () => {
    document.getElementById("team")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-(--page-bg) pb-20 mx-auto">
      {/* === Banner Section === */}
      <div className="bg-(--bg-outer) pt-1 pb-25">
        <TopPageBanner
          handleClick={handleClick}
          title="One More Friend"
          subTitle="Thousands More Fun!"
          description="We believe every animal deserves a second chance at a life filled with love, safety, and joy. Our journey began with the simple goal of connecting pets in need with loving families ready to open their hearts and homes."
          btnTitle="Meet Our Team"
          btnTitle2="See Available Pets"
          href="/available-pets"
        />
      </div>

      <section className="container mx-auto px-4 py-16 md:py-24" id="our-story">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--our-story-title) mb-8 transition-colors duration-300">
            Our Story
          </h2>
          <div className="prose prose-lg text-(--our-story-description) mx-auto leading-relaxed space-y-6 transition-colors duration-300">
            <p>
              <strong>Monito</strong> was born in 2022 from a heartfelt mission:
              to ensure no animal faces life alone. It all started when a small
              group of friends noticed stray dogs and cats in desperate need of
              help in their neighborhood. What began as a few rescue efforts
              quickly grew into a community-driven platform dedicated to pet
              adoption, raising awareness, and supporting shelters.
            </p>
            <p>
              Today, we&apos;ve helped over 500 pets find their forever homes,
              connecting them with families who provide love and care. Our work
              is fueled by the belief that adoption is a two-way gift — bringing
              joy to both the pet and their new family.
            </p>
            <p>
              We&apos;re committed to growing our impact, one happy tail at a
              time, and we invite you to join us in this journey.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 mt-12 justify-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--our-story-stat-icon-bg) transition-colors duration-300">
                <Heart className="text-(--our-story-stat-icon-color) scale-120 border-none! transition-colors duration-300" />
              </div>
              <span className="font-semibold text-(--our-story-stat-text) transition-colors duration-300">
                +500 Pets Found Homes
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--our-story-stat-icon-bg) transition-colors duration-300">
                <Users className="text-(--our-story-stat-icon-color) scale-120 transition-colors duration-300" />
              </div>
              <span className="font-semibold text-(--our-story-stat-text) transition-colors duration-300">
                +200 Active Volunteers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* === Team Section === */}
      <section
        className="bg-(--team-bg) py-16 md:py-24 transition-colors duration-300"
        id="team"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--team-title-color) transition-colors duration-300">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-(--team-desc-color) max-w-3xl mx-auto transition-colors duration-300">
              The dedicated people behind One More Friend who work tirelessly to
              help animals find loving homes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group bg-(--team-card-bg) rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-(--team-name-color) mb-1 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-(--team-role-color) font-semibold mb-3 transition-colors duration-300">
                    {member.role}
                  </p>
                  <p className="text-(--team-bio-color) text-sm mb-4 line-clamp-3 transition-colors duration-300">
                    {member.bio}
                  </p>

                  {Object.keys(member.social).length > 0 && (
                    <div className="flex justify-center gap-4">
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-(--team-social-color) hover:text-(--team-social-hover) transition-colors duration-200"
                        >
                          Twitter
                        </a>
                      )}
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-(--team-social-color) hover:text-(--team-social-hover) transition-colors duration-200"
                        >
                          Instagram
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-(--team-social-color) hover:text-(--team-social-hover) transition-colors duration-200"
                        >
                          Linkedin
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Mission & Values === */}
      <section className="bg-(--mission-bg) py-16 md:py-24 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-(--mission-title-color) transition-colors duration-300">
              Our Mission & Values
            </h2>
            <p className="mt-4 text-lg text-(--mission-desc-color) max-w-3xl mx-auto transition-colors duration-300">
              Every day we work toward a better world for companion animals
              through:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <icons.Heart
                    className="h-10 w-10 text-(--mission-icon-color) transition-colors duration-300"
                    fill="currentColor"
                  />
                ),
                title: "Unconditional Love",
                desc: "Every animal deserves a life filled with care, respect, and affection.",
              },
              {
                icon: (
                  <icons.Users
                    className="h-10 w-10 text-(--mission-icon-color) transition-colors duration-300"
                    fill="currentColor"
                  />
                ),
                title: "Supportive Community",
                desc: "We connect volunteers, donors, and new families to create lasting change.",
              },
              {
                icon: (
                  <icons.ShieldPlus className="h-10 w-10 text-(--mission-icon-color) transition-colors duration-300" />
                ),
                title: "Responsibility & Transparency",
                desc: "Every step we take prioritizes the health, happiness, and well-being of the animals.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-(--mission-card-bg) p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-transparent"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-(--mission-icon-bg) shadow-md transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-(--mission-card-title) transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-4 text-(--mission-card-desc) transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Bottom CTA === */}
      <BottomCTA
        title="Want to Be Part of the Story?"
        description="Whether it's adopting, donating, volunteering, or simply helping spread the word — every action makes a difference!"
        btnName="Support Now"
        btnName2="Get in Touch"
        href1="/adopt-form"
        href2="/contact"
      />
    </div>
  );
};

export default AboutPage;
