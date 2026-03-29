// app/faq/page.tsx
import * as icons from "@/assets/icons";
import Button from "@/app/components/atoms/Button";
import Link from "next/link";
import { faqItems } from "@/app/mock-data/mockFAQs";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24 bg-(--color-primary-darkBlue) dark:bg-(--color-neutral-5)! text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-secondary-monYellow) rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="relative container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Got questions? We&apos;ve got answers. If you don&apos;t find what
            you&apos;re looking for, feel free to contact us.
          </p>
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
              className="text-xl px-12 py-5 hover:scale-103 hover:text-white transition-all duration-300"
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
