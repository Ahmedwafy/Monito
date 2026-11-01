import * as icons from "@/assets/icons";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { faqItems } from "@/app/mock-data/mockFAQs";
import TopPageBanner from "@/components/molecules/TopPageBanner";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-(--page-bg) pb-20">
      {/* === Banner Section === */}
      <section className="pt-1">
        <TopPageBanner
          title="Frequently Asked Questions"
          description="Got questions? We've got answers. If you don't find what
              you're looking for, feel free to contact us."
        />
      </section>

      {/* FAQ Items */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group bg-(--faq-card-bg) rounded-2xl shadow-lg overflow-hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer p-6 md:p-8 text-xl font-semibold text-(--faq-card-question-color) transition-colors">
                {item.question}
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <icons.ChevronDown className="w-6 h-6" />
                </span>
              </summary>

              <div className="px-6 md:px-8 pt-6 pb-6 md:pb-8 text-(--faq-card-details) leading-relaxed border-t border-gray-100">
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
          <p className="text-lg text-(--faq-card-details) mb-8 max-w-2xl mx-auto">
            We&apos;re here to help! Reach out to us anytime.
          </p>
          <Link href="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
