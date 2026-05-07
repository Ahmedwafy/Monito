"use client";
import Link from "next/link";
import Button from "../atoms/Button";
import * as icons from "@/assets/icons";
import { redirect } from "next/navigation";

interface ProductDetailsCardProps {
  product: {
    name: string;
    price: string;
    category: string;
    brand: string;
    details: string;
    rating: number;
    reviewsCount: number;
  };
}

const ProductDetailsCard = ({
  product,
}: {
  product: ProductDetailsCardProps["product"];
}) => {
  return (
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
            <span className="text-gray-600 dark:text-gray-400">Brand</span>
            <span className="font-medium dark:text-gray-200">
              {product.brand}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Details</span>
            <span className="font-medium dark:text-gray-200 text-right max-w-[200px]">
              {product.details}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Rating</span>
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
            className="w-full py-4 text-lg dark:bg-blue-600 text-white hover:bg-(--color-primary-darkBlue)/90 dark:hover:bg-blue-700 transition"
            onClick={() => {
              // handleAddToCart(product.id); // TODO: Implement add to cart functionality
              redirect("/cart");
            }}
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
  );
};

export default ProductDetailsCard;
