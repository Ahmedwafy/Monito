// app/adopt-form/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as icons from "@/assets/icons";
import Button from "@/app/components/atoms/Button";

export default function AdoptionFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    housingType: "flat",
    hasGarden: "no",
    householdMembers: "",
    hasChildren: "no",
    childrenAges: "",
    hasOtherPets: "no",
    otherPetsDetails: "",
    previousExperience: "no",
    experienceDetails: "",
    reasonForAdoption: "",
    availability: "",
    agreeCare: false,
    agreeNoAbandon: false,
    agreeFollowUp: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // هنا هتبعت البيانات لـ backend (API route أو email service)
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // محاكاة إرسال (في الواقع ممكن تبعت لـ API route أو email service)
    await new Promise((resolve) => setTimeout(resolve, 1200)); // تأخير وهمي 1.2 ثانية

    // بعد النجاح → redirect لصفحة الشكر
    router.push("/adoption-success");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fceed5] dark:bg-(--color-neutral-0) flex items-center justify-center py-20 px-4">
        <div className="bg-white dark:bg-(--color-neutral-10) rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
          <icons.Heart className="w-20 h-20 text-(--color-secondary-monYellow) mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-(--color-primary-darkBlue) mb-4">
            Thank you!
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Your adoption request has been received successfully. Our team will
            contact you within 24-48 hours to discuss the next steps.
          </p>
          <Button variant="primary" className="text-lg px-10 py-4">
            Back To Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fceed5] dark:bg-(--color-neutral-0) py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-(--color-neutral-10) rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-(--color-primary-darkBlue) text-white p-8 md:p-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">طلب تبني</h1>
            <p className="text-lg opacity-90">
              Fill out this form carefully to help us find your new friend
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
            {/* Personal Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) border-b border-(--color-secondary-monYellow)/30 pb-3">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow) focus:ring-(--color-secondary-monYellow)/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow) focus:ring-(--color-secondary-monYellow)/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow) focus:ring-(--color-secondary-monYellow)/30"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow) focus:ring-(--color-secondary-monYellow)/30"
                  />
                </div>
              </div>
            </div>

            {/* Housing Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) border-b border-(--color-secondary-monYellow)/30 pb-3">
                Housing Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hosing
                  </label>
                  <select
                    name="housingType"
                    value={formData.housingType}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  >
                    <option value="flat">Flat</option>
                    <option value="villa">Villa</option>
                    <option value="independent House">Independent House</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Is there a garden or outdoor space?
                  </label>
                  <select
                    name="hasGarden"
                    value={formData.hasGarden}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    family members in the household
                  </label>
                  <input
                    type="number"
                    name="householdMembers"
                    min="1"
                    value={formData.householdMembers}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Do you have children?
                  </label>
                  <select
                    name="hasChildren"
                    value={formData.hasChildren}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                {formData.hasChildren === "yes" && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Children&apos;s Ages (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="childrenAges"
                      value={formData.childrenAges}
                      onChange={handleChange}
                      placeholder="e.g. 3, 7, 12"
                      className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow)"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Commitment Checkboxes */}
            <div className="space-y-4 bg-(--color-secondary-monYellow)/5 dark:bg-(--color-neutral-0)/50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-(--color-primary-darkBlue) mb-4">
                Please confirm the following commitments:
              </h3>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeCare"
                  checked={formData.agreeCare}
                  onChange={handleChange}
                  required
                  className="mt-1 w-5 h-5 accent-(--color-secondary-monYellow)"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  I commit to providing appropriate healthcare (vaccinations,
                  treatment, good quality food)
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeNoAbandon"
                  checked={formData.agreeNoAbandon}
                  onChange={handleChange}
                  required
                  className="mt-1 w-5 h-5 accent-(--color-secondary-monYellow)"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  I commit to not abandoning or surrendering the animal in the
                  street or returning it
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeFollowUp"
                  checked={formData.agreeFollowUp}
                  onChange={handleChange}
                  required
                  className="mt-1 w-5 h-5 accent-(--color-secondary-monYellow)"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  I agree to home visits or regular communication to ensure the
                  animal&apos;s well-being
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-5 text-xl bg-(--color-primary-darkBlue) hover:bg-(--color-primary-darkBlue)/90 transition"
              >
                Submit Adoption Request
                <icons.Heart className="ml-3 w-6 h-6" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
