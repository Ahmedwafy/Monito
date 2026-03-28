import Image, { StaticImageData } from "next/image";

interface CardProps {
  card: {
    id: number;
    name: string;
    breed: string;
    gender: string;
    age: string;
    price: string;
    image: StaticImageData;
  };
}

const HeroCard = ({ card }: CardProps) => {
  return (
    <div className="w-[280px] rounded-xl bg-white p-4 shadow h-full flex flex-col dark:bg-(--color-neutral-0) dark:border dark:border-(--color-neutral-10)">
      <Image
        src={card.image}
        alt={card.breed}
        className="rounded-lg w-full h-[400px] object-cover"
      />

      <h3 className="font-semibold mt-2">
        {card.name} - {card.breed}
      </h3>

      <p className="text-sm text-gray-500">
        Gene: {card.gender} Age: {card.age}
      </p>

      <p className="font-bold mt-auto dark:text-(--color-primary-darkBlue)">
        {card.price}
      </p>
    </div>
  );
};

export default HeroCard;
