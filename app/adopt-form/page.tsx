// app/adopt-form/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as icons from "@/assets/icons";
import Button from "@/app/components/atoms/Button";
import Link from "next/link";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

    // simulate network delay and processing time
    // in real app, you would send formData to your backend API here
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsSubmitting(false);
    setSubmitted(true);

    // After showing success state, redirect to success page (optional)
    setTimeout(() => {
      router.push("/adoption-success");
    }, 1500);
  };

  // Success State
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fceed5] dark:bg-gray-950 flex items-center justify-center py-20 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 md:p-16 max-w-2xl w-full text-center">
          <icons.Heart className="w-24 h-24 text-(--color-secondary-monYellow) mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-(--color-primary-darkBlue) dark:text-white mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Your adoption request has been received successfully.
            <br />
            Our team will contact you within 24-48 hours.
          </p>
          <Link href="/">
            <Button variant="primary" className="text-lg px-12 py-4">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0)! py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-(--color-neutral-0)! rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-(--color-primary-darkBlue) dark:bg-(--color-card-bg)! text-white p-8 md:p-12 text-center">
            <h1 className="text-3xl text-white! md:text-4xl font-bold mb-3">
              Adoption Form
            </h1>
            <p className="text-lg opacity-90">
              Please fill out this form carefully so we can help you find your
              new friend.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-white border-b border-(--color-secondary-monYellow)/30 pb-3">
                Personal Information
              </h2>

              {/* Full Name */}
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
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  />
                </div>

                {/* Phone Number */}
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
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  />
                </div>

                {/* Email */}
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
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  />
                </div>
              </div>
            </div>

            {/* Housing Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-white border-b border-(--color-secondary-monYellow)/30 pb-3">
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

            {/* Commitments */}
            <div className="space-y-4 bg-(--color-secondary-monYellow)/5 dark:bg-gray-800 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-(--color-primary-darkBlue) dark:text-white mb-4">
                Commitments
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
                  I commit to providing proper healthcare, vaccinations,
                  treatment, and quality food.
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

            {/* Submit Button with Loading */}
            <div className="pt-6">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="group flex items-center justify-center w-full mx-auto max-w-xs hover:max-w-[350px] py-5 text-xl bg-(--color-primary-darkBlue)
                  hover:bg-(--color-primary-darkBlue) dark:text-white! dark:bg-(--color-neutral-0)! dark:hover:bg-(--color-card-bg)! 
                  transition-[max-width,background-color] duration-500 ease-in-out whitespace-nowrap overflow-hidden"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Adoption Request
                    <icons.Heart className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
