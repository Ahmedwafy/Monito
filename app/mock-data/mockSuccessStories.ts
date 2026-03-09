import * as images from "@/assets/images/images";

// Mock data – you can expand this or fetch from a JSON/CMS later
export const successStories = [
  {
    id: 1,
    petName: "Milo",
    petType: "Dog",
    adoptedBy: "The Johnson Family",
    date: "January 2025",
    story:
      "Milo was found as a stray, scared and underweight. After being adopted by the Johnson family, he turned into the happiest dog in the house. Now he plays with the kids every day and guards the home with pure joy.",
    beforeImage: images.miloBefore,
    afterImage: images.miloAfter,
    heartCount: 124,
  },
  {
    id: 2,
    petName: "Molly",
    petType: "Cat",
    adoptedBy: "Sarah & Alex",
    date: "March 2025",
    story:
      "Molly was a very shy cat at the shelter. After moving in with Sarah and Alex, she now loves napping on the couch and chasing laser pointers every evening. She’s become an irreplaceable part of their family.",
    beforeImage: images.MollyBefore,
    afterImage: images.MollyAfter,
    heartCount: 98,
  },
  {
    id: 3,
    petName: "Gizmo",
    petType: "Bird",
    adoptedBy: "Ethan",
    date: "April 2025",
    story:
      "Gizmo was an older bird no one seemed to notice at the shelter. Ethan chose him to have a quiet companion. Since then, Gizmo has become much more active and his health has improved dramatically. Love really changes everything.",
    beforeImage: images.GizmoBefore,
    afterImage: images.GizmoAfter,
    heartCount: 67,
  },
  {
    id: 4,
    petName: "Chewy",
    petType: "Dog",
    adoptedBy: "The Lee Family",
    date: "June 2025",
    story:
      "Chewy arrived at the shelter pregnant and in need of care. After giving birth and recovering, she was adopted by the Lee family. Now Chewy and her puppies live in a home full of love and play.",
    beforeImage: images.ChewyBefore,
    afterImage: images.ChewyAfter,
    heartCount: 152,
  },
];
