import Image from "next/image";
import { StaticImageData } from "next/image"; // To Added imported images > import * as images from "@/assets/images/images";

interface HeroCardProps {
  image: string | StaticImageData;
  className?: string;
}

const HeroCard = ({ image, className }: HeroCardProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div>
        <Image
          // src="https://placehold.co/250x250/png"
          src={image}
          alt="aaa"
          width={250}
          height={150}
          className="rounded-lg object-cover overflow-hidden h-[350px]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[.9rem] font-semibold">MO231 - Pomeranian White</p>
        <p className="text-[.8rem] font-light text-(--color-neutral-60)">
          Gene: Male Age: 02 months
        </p>
        <p className="text-[.8rem] font-semibold ">6.900.000 VND</p>
      </div>
    </div>
  );
};

export default HeroCard;
