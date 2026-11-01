// layouts/RegisterBar.tsx
import Link from "next/link";
import Button from "@/components/atoms/Button";
import * as images from "@/assets/images/images";
import Image from "next/image";

const RegisterBar = () => {
  return (
    <section className="mx-4 lg:mx-0 ">
      <div className="bg-(--register-section-bg) rounded-2xl px-4 py-10 lg:py-16 max-w-[99%] mx-auto mb-2">
        <footer className="container mx-auto ">
          <div className="flex flex-col sm:flex-row gap-2 justify-between px-8 bg-(--register-bar-bg) w-full mx-auto rounded-2xl pb-4 sm:p-0 pt-2 lg:p-4">
            <h4 className="text-(--regester-text-1) tracking-tight md:tracking-normal text-xl md:text-2xl my-auto sm:w-1/3 flex justify-center sm:justify-start p-2">
              Register Now So You Dont Miss Our Programs
            </h4>
            <div className="sm:w-2/3 rounded-2xl flex flex-col sm:flex-row gap-4 py-10 sm:py-4 px-4 items-center bg-(--color-neutral-0) h-2/3 my-auto mx-2">
              <input
                type="text"
                className="rounded-xl h-2/3 w-full py-4 px-4 outline-none border border-gray-400 transition-all duration-200 focus:border-blue-400
                 focus:ring-blue-200 focus:ring-2"
                placeholder="Enter your Email"
              />
              <Button
                className="rounded-xl sm:w-1/3 sm:h-2/3 py-4 px-4 sm:py-1 lg:py-4
              transition-all duration-200"
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default RegisterBar;
