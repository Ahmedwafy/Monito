// app/(pages)/products/[id]/page.tsx
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { productsData } from "@/app/mock-data/mockProducts";
import ProductDetailsCard from "@/components/molecules/ProductDetailsCard";
import ProductImageAndDescription from "@/components/molecules/ProductImageAndDescription";

const getProductById = (id: number) => {
  return productsData.find((product) => product.id === id) || null;
};

// params = Promise;
// if /products/3 then params = { id: "3" }
// in Next.js app router, params are always strings
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// const productId = 1; // For testing, replace with dynamic value from params

const SingleProductPage = async ({ params }: ProductPageProps) => {
  // -- VIP: Always await the params promise to get the actual params object before trying to access its properties. even if it's not a promise,
  // awaiting it will just give you the same object back. In Next.js app router, params are passed as a promise, so you must await it to get the real params object.
  // Accessing params.id directly without awaiting would give you undefined or cause an error because params is not the actual object but a promise that resolves to it.
  const resolvedParams = await params;

  const productId = Number(resolvedParams.id);
  const product = getProductById(productId);
  console.log(`-----------${params}`); // params = Promise

  // console.log("Found product:", product);
  // console.log(productId, resolvedParams.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0)">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-(--color-primary-darkBlue)">
            Product not found
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            The product you&apos;re looking for might be out of stock or
            doesn&apos;t exist!
          </p>
          <Link href="/" className="mt-8 inline-block">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20 pt-10">
      <section className="container mx-auto px-4 relative z-10 ">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left/Main Content - Image + Description */}
          <ProductImageAndDescription product={product} />

          {/* Right Sidebar - Info & Buy Button */}
          <ProductDetailsCard product={product} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) dark:border shadow-xl py-12 px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue)">
            Keep your pet happy and healthy
          </h3>
          <p className="mt-4 text-lg text-(--color-primary-darkBlue)/90 dark:text-(--color-secondary-monYellow)/90">
            Explore our collection of premium quality products carefully
            selected for your furry friends.
          </p>
          <div className="mt-8 flex justify-center flex-wrap gap-4">
            <Link href="/explore">
              <Button
                variant="outline"
                className="border-(--color-primary-darkBlue) bg-transparent text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-(--color-neutral-0) px-8"
              >
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProductPage;
// dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border)
