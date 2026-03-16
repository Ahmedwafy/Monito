import * as images from "@/assets/images/images";

// Mock data for team members
export const teamMembers = [
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
