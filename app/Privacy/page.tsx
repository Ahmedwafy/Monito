import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fceed5] py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-(--color-primary-darkBlue) mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg text-gray-800 max-w-none">
          <p className="text-lg mb-6">Last updated: March 9, 2026</p>

          <p>
            One More Friend (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
            is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website.
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Personal information you provide (name, email, phone) when
              submitting adoption or volunteer forms
            </li>
            <li>
              Technical data (IP address, browser type, pages visited) collected
              automatically
            </li>
          </ul>

          <h2 className="text-3xl font-bold mt-10 mb-4">
            2. How We Use Your Information
          </h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process adoption and volunteer applications</li>
            <li>Communicate with you about pets or events</li>
            <li>Improve our website and services</li>
          </ul>

          <h2 className="text-3xl font-bold mt-10 mb-4">
            3. Sharing Your Information
          </h2>
          <p>We do not sell your personal information. We may share it with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Veterinarians and partner shelters (for adoption coordination
              only)
            </li>
            <li>Service providers (email service, hosting)</li>
          </ul>

          {/* باقي الأقسام اللي ممكن تضيفها */}
          <h2 className="text-3xl font-bold mt-10 mb-4">4. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            information. Contact us at hello@onemorefriend.com
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4">5. Contact Us</h2>
          <p>
            If you have questions about this policy, reach out via our{" "}
            <Link
              href="/contact"
              className="text-(--color-primary-darkBlue) underline hover:text-(--color-secondary-monYellow)"
            >
              Contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
