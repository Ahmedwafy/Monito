import Image, { StaticImageData } from "next/image";

interface ProductImageAndDescriptionProps {
  product: {
    name: string;
    description: string;
    features: string[];
    mainImage: StaticImageData;
  };
}
const ProductImageAndDescription = ({
  product,
}: ProductImageAndDescriptionProps) => {
  return (
    <div className="flex-1 space-y-8 order-2 lg:order-1">
      <div className="bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) rounded-2xl shadow-xl p-4 md:p-6 overflow-hidden flex justify-center">
        <Image
          src={product.mainImage}
          alt={product.name}
          width={600}
          height={600}
          className="object-cover rounded-xl"
          priority
        />
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) mb-6">
          About {product.name}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="mt-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-(--color-primary-darkBlue) mb-3">
              Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-(--color-secondary-monYellow)/20 text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow-80) rounded-full text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageAndDescription;
