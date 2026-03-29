// app/about/page.tsx
"use client";
// import * as images from "@/assets/images/images";
import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";
import { teamMembers } from "@/app/mock-data/mockTeamMembers";

const AboutPage = () => {
  // Scroll to a specific section with id="team"
  const handleClick = () => {
    document.getElementById("team")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* Hero / Cover Section */}
      <section className="px-4 py-12 md:py-24">
        <div className="container relative mx-auto flex flex-col items-center text-center overflow-hidden rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-0) py-16 md:py-32 px-6 md:px-16">
          {/* Decorative rotated blobs */}
          <div className="dark:opacity-50 absolute -left-40 -top-60 h-[600px] w-[600px] rotate-12 rounded-full bg-(--color-secondary-monYellow-80) dark:bg-(--color-secondary-monYellow-80)/20 md:h-[900px] md:w-[900px]"></div>
          <div className="dark:opacity-50 absolute -right-80 bottom-0 h-[700px] w-[700px] rotate-25 rounded-full bg-(--color-secondary-monYellow-80) dark:bg-(--color-secondary-monYellow-80)/20 md:h-[1000px] md:w-[1000px]"></div>

          <div className="relative z-10 max-w-4xl">
            <h1 className="text-4xl font-bold text-(--color-primary-darkBlue)! md:text-5xl lg:text-6xl">
              One More Friend
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-(--color-primary-darkBlue)! md:text-3xl">
              Thousands More Fun!
            </h2>
            <p className="mt-8 text-lg text-(--color-primary-darkBlue)! md:text-xl leading-relaxed">
              We believe every animal deserves a second chance at a life filled
              with love, safety, and joy. Our journey began with the simple goal
              of connecting pets in need with loving families ready to open
              their hearts and homes.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {/* <Link href="/about"> */}
              <Button
                onClick={handleClick}
                variant="primary"
                className="group transition-all duration-300 flex items-center gap-2 sm:text-(--color-secondary-monYellow) dark:bg-(--color-neutral-0) 
                dark:text-(--color-secondary-monYellow) dark:border-1 dark:border-(--color-primary-darkBlue)! dark:hover:bg-(--color-secondary-monYellow) 
                dark:hover:text-(--color-neutral-0) dark:border dark:border-(--color-secondary-monYellow)! dark:hover:border-(--color-neutral-0)!"
              >
                Meet Our Team
                <icons.CircleArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-115" />
              </Button>
              {/* </Link> */}

              <Link href="/availablePets" className="inline-block">
                <Button
                  variant="outline"
                  className="transition-all duration-300 dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-(--color-neutral-0)"
                >
                  See Available Pets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) mb-8 transition-colors duration-300">
            Our Story
          </h2>
          <div className="prose prose-lg text-gray-700 dark:text-gray-300! mx-auto leading-relaxed space-y-6 transition-colors duration-300">
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
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-(--color-secondary-monYellow)/60 dark:bg-(--color-secondary-monYellow)/20 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) scale-120 transition-colors duration-300"
                >
                  <path
                    fill="currentColor"
                    d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-(--color-primary-darkBlue) dark:text-[#fdfdfd] transition-colors duration-300">
                +500 Pets Found Homes
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-(--color-secondary-monYellow)/60 dark:bg-(--color-secondary-monYellow)/20 transition-colors duration-300">
                {/* <icons.Heart
                  className="text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) scale-120 border-none! transition-colors duration-300"
                  fill="currentColor"
                /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) scale-120 transition-colors duration-300"
                >
                  <path
                    fill="currentColor"
                    d="M12 5a3 3 0 1 1 0 6a3 3 0 0 1 0-6M5 7a2 2 0 1 1 0 4a2 2 0 0 1 0-4m14 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4M12 13c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4"
                  />
                </svg>
              </div>
              <span className="font-semibold text-(--color-primary-darkBlue) dark:text-[#fdfdfd] transition-colors duration-300">
                +200 Active Volunteers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        className="bg-white dark:bg-[#00171f] py-16 md:py-24 transition-colors duration-300"
        id="team"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) transition-colors duration-300">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-[#ebeeef] max-w-3xl mx-auto transition-colors duration-300">
              The dedicated people behind One More Friend who work tirelessly to
              help animals find loving homes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group bg-white dark:bg-[#002a48] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-[#003459]"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-(--color-primary-darkBlue) dark:text-[#fdfdfd] mb-1 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-[#00528c] dark:text-(--color-secondary-monYellow) font-semibold mb-3 transition-colors duration-300">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-[#ebeeef] text-sm mb-4 line-clamp-3 transition-colors duration-300">
                    {member.bio}
                  </p>

                  {/* Social Icons */}
                  {Object.keys(member.social).length > 0 && (
                    <div className="flex justify-center gap-4">
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-(--color-primary-darkBlue) dark:text-[#99a2a5] dark:hover:text-(--color-secondary-monYellow) transition-colors duration-200"
                        >
                          {/* <icons.Twitter className="w-5 h-5" />  */}
                          Twitter
                        </a>
                      )}
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-(--color-primary-darkBlue) dark:text-[#99a2a5] dark:hover:text-(--color-secondary-monYellow) transition-colors duration-200"
                        >
                          {/* <icons.Instagram className="w-5 h-5" /> */}
                          Instagram
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-(--color-primary-darkBlue) dark:text-[#99a2a5] dark:hover:text-(--color-secondary-monYellow) transition-colors duration-200"
                        >
                          {/* <icons.Linkedin className="w-5 h-5" /> */}
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

      {/* Mission & Values */}
      <section className="bg-[#FDECCE] dark:bg-[#002a48] py-16 md:py-24 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) transition-colors duration-300">
              Our Mission & Values
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-[#ebeeef] max-w-3xl mx-auto transition-colors duration-300">
              Every day we work toward a better world for companion animals
              through:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <icons.Heart
                    className="h-10 w-10 text-(--color-secondary-monYellow) dark:text-[#002a48] transition-colors duration-300"
                    fill="currentColor"
                  />
                ),
                title: "Unconditional Love",
                desc: "Every animal deserves a life filled with care, respect, and affection.",
              },
              {
                icon: (
                  <icons.Users
                    className="h-10 w-10 text-(--color-secondary-monYellow) dark:text-[#002a48] transition-colors duration-300"
                    fill="currentColor"
                  />
                ),
                title: "Supportive Community",
                desc: "We connect volunteers, donors, and new families to create lasting change.",
              },
              {
                icon: (
                  <icons.ShieldPlus className="h-10 w-10 text-(--color-secondary-monYellow) dark:text-[#002a48] transition-colors duration-300" />
                ),
                title: "Responsibility & Transparency",
                desc: "Every step we take prioritizes the health, happiness, and well-being of the animals.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#00171f] p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-transparent dark:border-[#003459]"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-(--color-primary-darkBlue) dark:bg-(--color-secondary-monYellow) shadow-md transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-(--color-primary-darkBlue) dark:text-[#fdfdfd] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-4 text-gray-600 dark:text-[#99a2a5] transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="px-4 py-16 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-card-bg) border border-transparent dark:border-(--color-card-border) py-12 px-8 transition-colors duration-300 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) transition-colors duration-300">
            Want to Be Part of the Story?
          </h3>
          <p className="mt-4 text-lg text-(--color-primary-darkBlue)/90 dark:text-[#ebeeef] transition-colors duration-300">
            Whether it&apos;s adopting, donating, volunteering, or simply
            helping spread the word — every action makes a difference!
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Link href="/adopt-form">
              <Button
                variant="primary"
                className="dark:bg-(--color-secondary-monYellow) dark:text-[#00171f] dark:hover:bg-[#eec77e] transition-colors duration-300 sm:text-(--color-secondary-monYellow) flex w-full!"
              >
                Support Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-[#00171f] transition-colors duration-300"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
