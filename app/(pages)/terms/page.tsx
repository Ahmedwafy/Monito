import Link from "next/link";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-(--page-bg) py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-(--terms-bg) rounded-2xl shadow-xl p-6 md:p-10 border border-transparent">
          <h1 className="text-4xl md:text-5xl font-bold text-(--terms-title) mb-4">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6 text-(--terms-details)">
              Last updated: March 9, 2026
            </p>

            <p className="text-(--terms-details)">
              Welcome to One More Friend. By accessing or using our website, you
              agree to be bound by these Terms of Service.
            </p>

            <h2 className="text-3xl font-bold mt-10 mb-4 text-(--terms-sub-title)">
              1. Use of the Website
            </h2>
            <p className="text-(--terms-details)">
              You may use the site for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-(--terms-details)">
              <li>Post harmful, offensive, or misleading content</li>
              <li>Attempt to gain unauthorized access</li>
              <li>Use the site to harass or impersonate others</li>
            </ul>

            <h2 className="text-3xl font-bold mt-10 mb-4 text-(--terms-sub-title)">
              2. Adoption Process
            </h2>
            <p className="text-(--terms-details)">
              Submitting an application does not guarantee adoption. We reserve
              the right to decline any application if we believe it&apos;s not
              in the best interest of the animal.
            </p>

            <h2 className="text-3xl font-bold mt-10 mb-4 text-(--terms-sub-title)">
              3. Intellectual Property
            </h2>
            <p className="text-(--terms-details)">
              All content on this site (photos, text, design) is owned by One
              More Friend or used with permission. You may not reproduce or
              distribute without written consent.
            </p>

            <h2 className="text-3xl font-bold mt-10 mb-4 text-(--terms-sub-title)">
              4. Limitation of Liability
            </h2>
            <p className="text-(--terms-details)">
              We are not liable for any indirect, incidental, or consequential
              damages arising from use of the site or adoption of a pet.
            </p>

            <h2 className="text-3xl font-bold mt-10 mb-4 text-(--terms-sub-title)">
              5. Changes to Terms
            </h2>
            <p className="text-(--terms-details)">
              We may update these terms from time to time. Continued use of the
              site after changes constitutes acceptance.
            </p>

            <h2 className="text-3xl font-bold mt-10 mb-4 text-(--terms-sub-title)">
              6. Contact
            </h2>
            <p className="text-(--terms-details)">
              Questions about these terms? Reach us via our{" "}
              <Link
                href="/contact"
                className="text-(--terms-link) underline hover:text-(--terms-hover-link)"
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
};

export default TermsOfServicePage;
