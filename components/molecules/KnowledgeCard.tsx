import Image, { StaticImageData } from "next/image";

interface KnowledgeCardProps {
  image: StaticImageData;
  className?: string;
  title?: string;
  description?: string;
}
const KnowledgeCard = ({
  image,
  className,
  title,
  description,
}: KnowledgeCardProps) => {
  // const { image, className, title, description } = props;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div>
        <Image
          src={image}
          alt="aaa"
          width={250}
          height={250}
          className="rounded-lg object-cover h-[250px] w-[320px]"
        />
      </div>
      <div>
        <h4 className="bg-(--color-blueSea) w-fit px-2 rounded-2xl text-[0.875rem] mb-2">
          Pet Knowledge
        </h4>
        <h4 className="font-semibold py-2 text-(--pet-knowledge-title)!">
          {title}
        </h4>
        <p className="text-(--pet-knowledge-title)">{description}</p>
      </div>
    </div>
  );
};

export default KnowledgeCard;
