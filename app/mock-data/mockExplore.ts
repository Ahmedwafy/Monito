// youtube id: https://www.youtube.com/watch?v=XXXX → XXXX

export type ExploreVideo = {
  id: string; // YouTube video id
  title: string;
  description: string;
  category: "Dogs" | "Cats" | "Adoption" | "Care";
};

export type ExploreTopic = {
  title: string;
  description: string;
  href: string;
};

export const exploreTopics: ExploreTopic[] = [
  {
    title: "Meet Our Pets",
    description: "Browse dogs, cats, birds, and rabbits waiting for a home.",
    href: "/available-pets",
  },
  {
    title: "How Adoption Works",
    description: "Simple steps from application to bringing your pet home.",
    href: "/how-to-adopt",
  },
  {
    title: "Success Stories",
    description: "Real families and the animals whose lives changed forever.",
    href: "/success-stories",
  },
  {
    title: "Volunteer With Us",
    description: "Walk dogs, socialize cats, or help at events.",
    href: "/volunteer",
  },
];

// Public educational videos — replace ids anytime
export const exploreVideos: ExploreVideo[] = [
  {
    id: "e4cd3PaEZhg",
    title: "First Days With Your New Dog",
    description:
      "How to help a newly adopted dog settle in during the first week.",
    category: "Dogs",
  },
  {
    id: "TqRhrC-tPwg",
    title: "Cat Care Basics for New Owners",
    description: "Litter, feeding, and creating a calm space for your new cat.",
    category: "Cats",
  },
  {
    id: "ieHv-6UUftc",
    title: "What to Expect When You Adopt",
    description:
      "A clear overview of the adoption journey and how shelters support you.",
    category: "Adoption",
  },
  {
    id: "Zb3Wzs2FcFE",
    title: "Daily Care Tips for Happy Pets",
    description:
      "Simple routines for food, exercise, and bonding with your pet.",
    category: "Care",
  },
];
