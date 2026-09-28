import * as icons from "@/assets/icons";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { faqItems } from "@/app/mock-data/mockFAQs";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* Hero / Cover */}
      <section className="px-4 py-12 md:py-20">
        <div className="container relative mx-auto flex flex-col items-center text-center overflow-hidden rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-0)/50 py-16 md:py-24 px-6 md:px-12">
          {/* Decorative blobs */}
          <div className="dark:opacity-50 absolute -right-40 -top-40 h-[500px] w-[500px] rotate-12 rounded-full bg-(--color-secondary-monYellow-80) dark:bg-(--color-secondary-monYellow-80)/20 md:h-[700px] md:w-[700px]"></div>
          <div className="dark:opacity-50 absolute -left-60 bottom-20 h-[600px] w-[600px] rotate-25 rounded-full bg-(--color-secondary-monYellow-80) dark:bg-(--color-secondary-monYellow-80)/20 md:h-[800px] md:w-[800px]"></div>
          <div className="relative z-10 max-w-auto">
            <h1 className="text-4xl font-bold text-(--color-primary-darkBlue) md:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg text-(--color-primary-darkBlue) md:text-xl">
              Got questions? We&apos;ve got answers. If you don&apos;t find what
              you&apos;re looking for, feel free to contact us.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group bg-white dark:bg-(--color-neutral-10) rounded-2xl shadow-lg overflow-hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer p-6 md:p-8 text-xl font-semibold text-(--color-primary-darkBlue) hover:text-(--color-secondary-monYellow) transition-colors">
                {item.question}
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <icons.ChevronDown className="w-6 h-6" />
                </span>
              </summary>

              <div className="px-6 md:px-8 pt-6 pb-6 md:pb-8 text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary-darkBlue) mb-6">
            Still have questions?
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            We&apos;re here to help! Reach out to us anytime.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              className="text-xl px-12 py-5 hover:scale-103 hover:text-(--action-hover-text) transition-all duration-300"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
