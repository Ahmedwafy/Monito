// app/about/page.tsx
import * as images from "@/assets/images/images";
import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";

// Mock data for team members
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & Director",
    bio: "Passionate animal lover with over 10 years in rescue and adoption. Started One More Friend to give every pet a second chance.",
    image: images.Sarah || images.homeCover1,
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "Ahmed Khaled",
    role: "Veterinary Coordinator",
    bio: "Licensed vet ensuring all our pets receive top medical care and support before and after adoption.",
    image: images.Ahmed || images.homeCover2,
    social: { linkedin: "#" },
  },
  {
    name: "Maria Lopez",
    role: "Adoption Counselor",
    bio: "Helping families find their perfect match and providing ongoing support after adoption.",
    image: images.Maria || images.Adoption,
    social: { instagram: "#" },
  },
  {
    name: "David Chen",
    role: "Volunteer Manager",
    bio: "Organizing our amazing team of volunteers who make everything possible every day.",
    image: images.David || images.homeCover1,
    social: { twitter: "#", instagram: "#" },
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#fceed5] pb-20">
      {/* Hero / Cover Section */}
      <section className="px-4 py-12 md:py-24">
        <div className="container relative mx-auto flex flex-col items-center text-center overflow-hidden rounded-3xl bg-(--color-secondary-monYellow) py-16 md:py-32 px-6 md:px-16">
          {/* Decorative rotated blobs */}
          <div className="absolute -left-40 -top-60 h-[600px] w-[600px] rotate-12 rounded-full bg-(--color-secondary-monYellow-60) md:h-[900px] md:w-[900px]"></div>
          <div className="absolute -right-80 bottom-0 h-[700px] w-[700px] rotate-25 rounded-full bg-(--color-secondary-monYellow-80) md:h-[1000px] md:w-[1000px]"></div>

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
              <Link href="#team">
                <Button
                  variant="primary"
                  className="group flex items-center gap-2 bg-(--color-primary-darkBlue) text-(--color-secondary-monYellow) hover:bg-(--color-primary-darkBlue)/90"
                >
                  Meet Our Team
                  <icons.CircleArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                </Button>
              </Link>

              <Link href="/pets">
                <Button
                  variant="outline"
                  className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) hover:bg-(--color-primary-darkBlue)! hover:text-(--color-secondary-monYellow)!"
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary-darkBlue) mb-8">
            Our Story
          </h2>
          <div className="prose prose-lg text-gray-700 mx-auto leading-relaxed space-y-6">
            <p>
              <strong>Monito</strong> was born in 2022 from a heartfelt mission:
              to ensure no animal faces life alone. It all started when a small
              group of friends noticed stray dogs and cats in desperate need of
              help in their neighborhood. What began as a few rescue efforts
              quickly grew into a community-driven platform dedicated to pet
              adoption, raising awareness, and supporting shelters.
            </p>
            <p>
              Today, we’ve helped over 500 pets find their forever homes,
              connecting them with families who provide love and care. Our work
              is fueled by the belief that adoption is a two-way gift — bringing
              joy to both the pet and their new family.
            </p>
            <p>
              We’re committed to growing our impact, one happy tail at a time,
              and we invite you to join us in this journey.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 mt-12 justify-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-secondary-monYellow)/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-(--color-primary-darkBlue) scale-120"
                >
                  <path
                    fill="currentColor"
                    d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-(--color-primary-darkBlue)">
                +500 Pets Found Homes
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-secondary-monYellow)/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-(--color-primary-darkBlue) scale-120"
                >
                  <path
                    fill="currentColor"
                    d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-(--color-primary-darkBlue)">
                +200 Active Volunteers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 md:py-24" id="team">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary-darkBlue)">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              The dedicated people behind One More Friend who work tirelessly to
              help animals find loving homes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
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
                  <h3 className="text-xl font-bold text-(--color-primary-darkBlue) mb-1">
                    {member.name}
                  </h3>
                  <p className="text-(--color-secondary-monYellow) font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
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
                          className="text-gray-500 hover:text-(--color-secondary-monYellow)"
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
                          className="text-gray-500 hover:text-(--color-secondary-monYellow)"
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
                          className="text-gray-500 hover:text-(--color-secondary-monYellow)"
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
      <section className="bg-[#FDECCE] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-(--color-primary-darkBlue)">
              Our Mission & Values
            </h2>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              Every day we work toward a better world for companion animals
              through:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <icons.Heart
                    className="h-10 w-10 text-(--color-secondary-monYellow)"
                    fill="var(--color-secondary-monYellow)"
                  />
                ),
                title: "Unconditional Love",
                desc: "Every animal deserves a life filled with care, respect, and affection.",
              },
              {
                icon: (
                  <icons.Users
                    className="h-10 w-10 text-(--color-secondary-monYellow)"
                    fill="var(--color-secondary-monYellow)"
                  />
                ),
                title: "Supportive Community",
                desc: "We connect volunteers, donors, and new families to create lasting change.",
              },
              {
                icon: (
                  <icons.ShieldPlus className="h-10 w-10 text-(--color-secondary-monYellow)" />
                ),
                title: "Responsibility & Transparency",
                desc: "Every step we take prioritizes the health, happiness, and well-being of the animals.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white p-8 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-(--color-primary-darkBlue)">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-(--color-primary-darkBlue)">
                  {item.title}
                </h3>
                <p className="mt-4 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="px-4 py-16 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-[#FFB775] py-12 px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue)">
            Want to Be Part of the Story?
          </h3>
          <p className="mt-4 text-lg text-(--color-primary-darkBlue)/90">
            Whether it&apos;s adopting, donating, volunteering, or simply
            helping spread the word — every action makes a difference!
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Link href="/adopt-form">
              <Button variant="primary">Support Now</Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) hover:bg-(--color-primary-darkBlue) hover:text-white"
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
