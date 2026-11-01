import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-(--page-bg) py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-(--privacy-bg) rounded-2xl shadow-xl p-6 md:p-10 border border-transparent">
          <h1 className="text-4xl md:text-5xl font-bold text-(--privacy-title) mb-4">
            Privacy Policy
          </h1>

          <div className="prose prose-lg text-(--privacy-details) max-w-none">
            <p className="text-(--privacy-details) mb-8">
              Last updated: March 9, 2026
            </p>

            <p className="text-(--privacy-details)">
              One More Friend (&quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website.
            </p>

            <h2 className="text-3xl font-bold mt-10 mb-4 text-(--privacy-sub-title)">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-(--privacy-details)">
              <li>
                Personal information you provide (name, email, phone) when
                submitting adoption or volunteer forms
              </li>
              <li>
                Technical data (IP address, browser type, pages visited)
                collected automatically
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-10 mb-4 text-(--privacy-sub-title)">
              2. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-(--privacy-details)">
              <li>Process adoption and volunteer applications</li>
              <li>Communicate with you about pets or events</li>
              <li>Improve our website and services</li>
            </ul>

            <h2 className="text-3xl font-bold mt-10 mb-4 text-(--privacy-sub-title)">
              3. Sharing Your Information
            </h2>
            <p className="text-(--privacy-details)">
              We do not sell your personal information. We may share it with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-(--privacy-details)">
              <li>
                Veterinarians and partner shelters (for adoption coordination
                only)
              </li>
              <li>Service providers (email service, hosting)</li>
            </ul>

            <h2 className="text-3xl font-bold mt-10 mb-4 text-(--privacy-sub-title)">
              4. Your Rights
            </h2>
            <p className="text-(--privacy-details)">
              You have the right to access, correct, or delete your personal
              information. Contact us at hello@onemorefriend.com
            </p>

            <h2 className="text-3xl font-bold mt-10 mb-4 text-(--privacy-sub-title)">
              5. Contact Us
            </h2>
            <p className="text-(--privacy-details)">
              If you have questions about this policy, reach out via our{" "}
              <Link
                href="/contact"
                className="text-(--privacy-link) underline hover:text-(--privacy-hover-link)"
              >
                Contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
