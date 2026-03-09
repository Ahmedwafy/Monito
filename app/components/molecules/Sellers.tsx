import Link from "next/link";
import Button from "../atoms/Button";
import * as icons from "@/assets/icons";
import * as images from "@/assets/images/images";
import Image from "next/image";

const Sellers = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 rounded-2xl">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex flex-col gap-2 justify-between sm:w-1/2">
            <p className="text-center sm:text-start text-2xl">
              Proud to be part of
            </p>
            <h3 className="-mt-1 text-center sm:text-start text-2xl">
              Pet Sellers
            </h3>
          </div>
          <Link
            href="/"
            className="group flex items-center gap-2 text-(--color-primary-darkBlue) mx-auto
            transition-colors hover:text-(--color-secondary-monYellow) w-1/2 justify-center sm:justify-end"
          >
            <Button
              variant="outline"
              className="flex items-center gap-2 pr-6 transition-all duration-300 w-full sm:w-auto"
            >
              View all our seller
              <icons.ChevronRight
                className="w-4 h-4 transform transition-transform 
                duration-300 group-hover:translate-x-1 scale-125"
              />
            </Button>
          </Link>
        </div>
        <div
          className="
          flex gap-6 items-center mt-10
          overflow-x-auto whitespace-nowrap px-2 
          md:overflow-visible sm:justify-center sm:flex-nowrap
        "
        >
          <Image
            src={images.seller1}
            alt="Seller 1"
            className="w-30 h-20 shrink-0"
          />
          <Image
            src={images.seller2}
            alt="Seller 2"
            className="w-30 h-20 shrink-0"
          />
          <Image
            src={images.seller3}
            alt="Seller 3"
            className="w-30 h-25 shrink-0"
          />
          <Image
            src={images.seller4}
            alt="Seller 4"
            className="w-30 h-20 shrink-0"
          />
          <Image
            src={images.seller6}
            alt="Seller 6"
            className="w-30 h-20 scale-125"
          />
          <Image
            src={images.seller5}
            alt="Seller 5"
            className="w-25 h-20 shrink-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Sellers;
