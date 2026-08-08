import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CardProps {
  type: "pets" | "products";
  card: {
    id: number;
    name: string;
    image: StaticImageData;
    breed?: string;
    gender?: string;
    age?: string;
    price?: string;
  };
}

const HeroCard = ({ card, type }: CardProps) => {
  const href = type === "pets" ? `/pets/${card.id}` : `/products/${card.id}`;

  return (
    <Link href={href} className="group block">
      <div
        className="w-[280px] rounded-xl bg-white p-4 shadow h-full flex flex-col 
        transition-all duration-300 
        hover:shadow-2xl hover:-translate-y-2 
        dark:bg-(--color-neutral-0) dark:border dark:border-(--color-neutral-10)"
      >
        {/* Image wrapper */}
        <div className="overflow-hidden rounded-lg">
          <Image
            src={card.image}
            alt={card.name}
            className="w-full h-[400px] object-cover 
              transition-transform duration-500 
              group-hover:scale-110"
          />
        </div>

        {/* Pets */}
        {type === "pets" && (
          <>
            <h3 className="font-semibold mt-3 transition-colors duration-300 group-hover:text-(--color-primary-darkBlue)">
              {card.name} - {card.breed}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Gene: {card.gender} • Age: {card.age}
            </p>
          </>
        )}

        {/* Products */}
        {type === "products" && (
          <>
            <h3 className="font-semibold mt-3 transition-colors duration-300 group-hover:text-(--color-primary-darkBlue)">
              {card.name}
            </h3>

            <p className="font-bold mt-auto text-lg dark:text-(--color-primary-darkBlue)">
              {card.price}
            </p>
          </>
        )}

        {/* subtle overlay effect */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 pointer-events-none 
          bg-linear-to-t from-black/10 to-transparent"
        />
      </div>
    </Link>
  );
};

export default HeroCard;
