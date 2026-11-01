"use client";
import Link from "next/link";
import Button from "../atoms/Button";
import * as icons from "@/assets/icons";
import { useRouter } from "next/navigation";
import { useRemoveFromCart } from "@/hooks/useRemoveFromCart";
import { productsData } from "@/app/mock-data/mockProducts";
import { useCart } from "@/hooks/useCart";
import { useAddToCart } from "@/hooks/useAddToCart";
import { toast } from "sonner";

interface ProductDetailsCardProps {
  product: {
    id: number;
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
  const router = useRouter();
  const { data: cart = [] } = useCart();
  const addToCart = useAddToCart();

  const removeItem = useRemoveFromCart(); // remove item from cart

  // Check if the product is already in the cart
  const inCart = cart.some((item) => item.productId === product.id);

  const handleAddToCart = () => {
    addToCart.mutate(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("Added to cart");
        },
        onError: (error) => {
          if (error.message === "Unauthorized") {
            toast.error("Please log in to manage your cart");
            router.push("/Login");
            return;
          }
          toast.error(error.message || "Failed to add to cart");
        },
      },
    );
  };

  const handleRemoveFromCart = () => {
    removeItem.mutate(
      { productId: product.id },
      {
        onSuccess: () => {
          toast.success("Removed from cart");
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to remove from cart");
        },
      },
    );
  };

  return (
    <div className="w-full lg:w-96 lg:min-w-[380px] order-1 lg:order-2 lg:sticky lg:top-8 h-fit space-y-6">
      <div className="bg-white border border-transparent rounded-2xl shadow-xl p-6 md:p-8">
        <div className="inline-block px-4 py-1 rounded-full bg-(--color-secondary-monYellow)/20 text-(--color-primary-darkBlue) text-sm font-semibold mb-4">
          {product.category}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-(--color-primary-darkBlue) mb-2">
          {product.name}
        </h1>
        <p className="text-3xl font-bold text-(--color-primary-darkBlue) mb-6">
          {product.price}
        </p>

        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Brand</span>
            <span className="font-medium">
              {product.brand}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Details</span>
            <span className="font-medium text-right max-w-[200px]">
              {product.details}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Rating</span>
            <span className="font-medium flex items-center gap-1">
              {product.rating} / 5.0
              <span className="text-sm text-gray-500 ml-1">
                ({product.reviewsCount} reviews)
              </span>
            </span>
          </div>
        </div>

        <div className="mt-10 space-y-3">
          {!inCart ? (
            <Button
              variant="primary"
              className="w-full py-4 text-lg ..."
              disabled={addToCart.isPending}
              onClick={handleAddToCart}
            >
              {addToCart.isPending ? "Adding..." : "Add to Cart"}
              <icons.ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          ) : (
            <>
              <Button
                variant="primary"
                className="w-full py-4 text-lg ..."
                disabled={addToCart.isPending}
                onClick={handleAddToCart}
              >
                {addToCart.isPending ? "Updating..." : "Add one more"}
              </Button>
              <Button
                variant="outline"
                className="w-full py-3 text-red-600 border-red-300 ..."
                disabled={removeItem.isPending}
                onClick={handleRemoveFromCart}
              >
                {removeItem.isPending ? "Removing..." : "Remove from Cart"}
              </Button>
            </>
          )}
          <p className="mt-4 text-center text-sm text-gray-500">
            Free shipping on orders over $50
          </p>
        </div>
      </div>

      <div className="bg-(--color-secondary-monYellow)/10 border border-transparent rounded-2xl p-6 text-center shadow-lg">
        <p className="text-(--color-primary-darkBlue) font-medium">
          Need more information?
        </p>
        <Link href="/contact" className="mt-3 inline-block">
          <Button
            variant="outline"
            className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue)"
          >
            Contact Support
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
