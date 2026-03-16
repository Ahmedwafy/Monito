import Link from "next/link";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-[#fceed5] py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-(--color-primary-darkBlue) mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg text-gray-800 max-w-none">
          <p className="text-lg mb-6">Last updated: March 9, 2026</p>

          <p>
            Welcome to One More Friend. By accessing or using our website, you
            agree to be bound by these Terms of Service.
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4">
            1. Use of the Website
          </h2>
          <p>
            You may use the site for lawful purposes only. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Post harmful, offensive, or misleading content</li>
            <li>Attempt to gain unauthorized access</li>
            <li>Use the site to harass or impersonate others</li>
          </ul>

          <h2 className="text-3xl font-bold mt-10 mb-4">2. Adoption Process</h2>
          <p>
            Submitting an application does not guarantee adoption. We reserve
            the right to decline any application if we believe it&apos;s not in
            the best interest of the animal.
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4">
            3. Intellectual Property
          </h2>
          <p>
            All content on this site (photos, text, design) is owned by One More
            Friend or used with permission. You may not reproduce or distribute
            without written consent.
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4">
            4. Limitation of Liability
          </h2>
          <p>
            We are not liable for any indirect, incidental, or consequential
            damages arising from use of the site or adoption of a pet.
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4">5. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the
            site after changes constitutes acceptance.
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4">6. Contact</h2>
          <p>
            Questions about these terms? Reach us via our{" "}
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
};

export default TermsOfServicePage;
