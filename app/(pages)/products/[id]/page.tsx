// app/(pages)/products/[id]/page.tsx

import * as icons from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";
import { productsData } from "@/app/mock-data/mockProducts";

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
      <div className="min-h-screen flex items-center justify-center bg-(--color-secondary-monYellow-40) dark:bg-gray-950">
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
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-gray-950 pb-20 pt-10">
      <section className="container mx-auto px-4 relative z-10 ">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left/Main Content - Image + Description */}
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

          {/* Right Sidebar - Info & Buy Button */}
          <div className="w-full lg:w-96 lg:min-w-[380px] order-1 lg:order-2 lg:sticky lg:top-8 h-fit space-y-6">
            <div className="bg-white dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) rounded-2xl shadow-xl p-6 md:p-8">
              <div className="inline-block px-4 py-1 rounded-full bg-(--color-secondary-monYellow)/20 text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) text-sm font-semibold mb-4">
                {product.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-(--color-primary-darkBlue) mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) mb-6">
                {product.price}
              </p>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    Brand
                  </span>
                  <span className="font-medium dark:text-gray-200">
                    {product.brand}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    Details
                  </span>
                  <span className="font-medium dark:text-gray-200 text-right max-w-[200px]">
                    {product.details}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    Rating
                  </span>
                  <span className="font-medium dark:text-gray-200 flex items-center gap-1">
                    {product.rating} / 5.0
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviewsCount} reviews)
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-10">
                <Button
                  variant="primary"
                  className="w-full py-4 text-lg bg-(--color-primary-darkBlue) hover:bg-(--color-primary-darkBlue)/90 transition"
                >
                  Add to Cart
                  <icons.ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>

            <div className="bg-(--color-secondary-monYellow)/10 dark:bg-(--color-neutral-0)/50 border border-transparent dark:border-(--color-card-border) rounded-2xl p-6 text-center shadow-lg">
              <p className="text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) font-medium">
                Need more information?
              </p>
              <Link href="/contact" className="mt-3 inline-block">
                <Button
                  variant="outline"
                  className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-(--color-neutral-0)"
                >
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
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
