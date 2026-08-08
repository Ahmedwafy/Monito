// this is the adoption form page where users can fill out the form to adopt a pet.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as icons from "@/assets/icons";
import Button from "@/components/atoms/Button";
import toast from "react-hot-toast";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  housingType: string;
  hasGarden: string;
  householdMembers: string;
  hasChildren: string;
  childrenAges: string;
  hasOtherPets: string;
  otherPetsDetails: string;
  previousExperience: string;
  experienceDetails: string;
  reasonForAdoption: string;
  availability: string;
  agreeCare: boolean;
  agreeNoAbandon: boolean;
  agreeFollowUp: boolean;
}

const AdoptionFormPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
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

  // Handle Submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emptyInputs, setEmptyInputs] = useState<boolean>(false);

  const [hasStartedTyping, setHasStartedTyping] = useState<boolean>(false);

  // Create a separate / new state for form errors, where the keys are the same as formData and the values are error messages "String" (if any)
  // Ex : Create New State Object {} for Errors with TypeScript ...
  //   {
  //   fullName?: string;
  //   phone?: string;
  //   email?: string;
  //   address?: string;
  //   etc...
  // }
  // Example: { fullName: "Please enter your full name.", phone: "Please enter a valid phone number.", ... }
  // This allows us to easily display error messages next to each input field and also to check if there are any errors before submitting the form.
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  // This function checks if all required fields are filled out (including conditional fields) and returns a boolean.
  // It is used to enable/disable the submit button and to show error messages when the user tries to submit an incomplete form.
  const areAllRequiredFieldsFilled = (data: FormData) => {
    const requiredFieldsFilled =
      data.fullName.trim() &&
      data.phone.trim() &&
      data.email.trim() &&
      data.address.trim() &&
      data.householdMembers.trim() &&
      Number(data.householdMembers) >= 1 &&
      data.reasonForAdoption.trim() &&
      data.availability.trim() &&
      data.agreeCare &&
      data.agreeNoAbandon &&
      data.agreeFollowUp;

    const childrenFilled =
      data.hasChildren === "yes" ? data.childrenAges.trim() : true;
    const otherPetsFilled =
      data.hasOtherPets === "yes" ? data.otherPetsDetails.trim() : true;
    const experienceFilled =
      data.previousExperience === "yes" ? data.experienceDetails.trim() : true;

    return Boolean(
      requiredFieldsFilled &&
      childrenFilled &&
      otherPetsFilled &&
      experienceFilled,
    );
  };

  // Disable the submit button until the user starts typing
  const isFormEmpty = !hasStartedTyping;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const newValue = type === "checkbox" ? checked : value;

    // Explanation of setFormData((prev) => ({...})):
    // Example on fullName input:
    // -- name = "fullName" ... coming from the name attribute of the input element
    // -- value = "Ahmed" ... the current value of the input element (what the user has typed)
    // -- fullName: "Ahmed" ... updating the formData state with the new value for fullName
    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [name]: newValue,
      } as FormData;

      if (emptyInputs && areAllRequiredFieldsFilled(updatedForm)) {
        setEmptyInputs(false);
      }

      return updatedForm;
    });

    setHasStartedTyping(true);

    // Clear the error message for the current field when the user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Form Validation Function - Improved Version
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // 1. Personal Information
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (formData.phone.length < 11) {
      newErrors.phone = "Phone number must be at least 11 digits.";
    } else if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid Egyptian phone number.";
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your full address.";
    }

    // 2. Housing Information
    if (
      !formData.householdMembers ||
      !/^\d+$/.test(formData.householdMembers) ||
      Number(formData.householdMembers) < 1
    ) {
      newErrors.householdMembers = "Please enter number of household members.";
    }

    // Conditional Validation: Children
    if (formData.hasChildren === "yes") {
      if (!formData.childrenAges.trim()) {
        newErrors.childrenAges = "Please enter your children's ages.";
      }
    }

    // Conditional Validation: Other Pets
    if (formData.hasOtherPets === "yes") {
      if (!formData.otherPetsDetails.trim()) {
        newErrors.otherPetsDetails = "Please describe your other pets.";
      }
    }

    // Conditional Validation: Previous Experience
    if (formData.previousExperience === "yes") {
      if (!formData.experienceDetails.trim()) {
        newErrors.experienceDetails =
          "Please describe your previous experience.";
      }
    }

    // 3. Important Fields
    if (!formData.reasonForAdoption.trim()) {
      newErrors.reasonForAdoption = "Please tell us why you want to adopt.";
    }

    if (!formData.availability.trim()) {
      newErrors.availability =
        "Please mention your availability for home visits.";
    }

    // 4. Commitments (Very Important)
    if (!formData.agreeCare) {
      newErrors.agreeCare = "You must agree to provide proper care.";
    }
    if (!formData.agreeNoAbandon) {
      newErrors.agreeNoAbandon = "You must agree not to abandon the pet.";
    }
    if (!formData.agreeFollowUp) {
      newErrors.agreeFollowUp =
        "You must agree to follow-up visits/communication.";
    }

    // Save all errors and disable the button if there are invalid values
    // Set emptyInputs to true if there are any errors, which will show a toast message when the user tries to submit without filling all required fields.
    setErrors(newErrors);
    setEmptyInputs(Object.keys(newErrors).length > 0);

    // Show first error using toast
    const firstError = Object.values(newErrors).find(Boolean);
    if (firstError) {
      toast.error(firstError);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    const isValid = validateForm();

    if (!isValid) {
      return;
    }
    setIsSubmitting(true);

    const cleanedDataToSend: FormData = {
      fullName: formData.fullName.trim(),
      phone: formData.phone.replace(/\s/g, "").trim(),
      email: formData.email.trim().toLowerCase(),
      address: formData.address.trim(),

      housingType: formData.housingType,
      hasGarden: formData.hasGarden,

      householdMembers: formData.householdMembers.trim(),

      hasChildren: formData.hasChildren,
      childrenAges: formData.childrenAges.trim(),

      hasOtherPets: formData.hasOtherPets,
      otherPetsDetails: formData.otherPetsDetails.trim(),

      previousExperience: formData.previousExperience,
      experienceDetails: formData.experienceDetails.trim(),

      reasonForAdoption: formData.reasonForAdoption.trim(),
      availability: formData.availability.trim(),

      agreeCare: formData.agreeCare,
      agreeNoAbandon: formData.agreeNoAbandon,
      agreeFollowUp: formData.agreeFollowUp,
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Send cleanedDataToSend to your backend API
    console.log("Form data to send:", cleanedDataToSend);

    // Show success message
    toast.success("Message sent! We will get back to you soon.");

    // Clear the form ... Reset Data
    setFormData({
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

    setIsSubmitting(false);
    // setSubmitted(true);

    // Redirect to success page after short delay
    setTimeout(() => {
      router.push("/adoption-success");
    }, 1500);
  };

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

          <form
            onSubmit={handleSubmit}
            // noValidate
            className="p-6 md:p-10 space-y-10"
          >
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 border-b border-(--color-secondary-monYellow)/30 pb-3">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    // required
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-(--color-neutral-10) dark:text-neutral-100 focus:outline-none ${errors.fullName ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-(--color-secondary-monYellow)"}`}
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    // required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-(--color-neutral-10) dark:text-neutral-100 focus:outline-none ${errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-(--color-secondary-monYellow)"}`}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    // required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-(--color-neutral-10) dark:text-neutral-100 focus:outline-none ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-(--color-secondary-monYellow)"}`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    // required
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-(--color-neutral-10) dark:text-neutral-100 focus:outline-none ${errors.address ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-(--color-secondary-monYellow)"}`}
                  />
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Housing Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 border-b border-(--color-secondary-monYellow)/30 pb-3">
                Housing Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Housing Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Housing Type
                  </label>
                  <select
                    name="housingType"
                    value={formData.housingType}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-neutral-100 px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  >
                    <option value="flat">Flat</option>
                    <option value="villa">Villa</option>
                    <option value="independent House">Independent House</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/*  Is there a garden or outdoor space? */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Is there a garden or outdoor space?
                  </label>
                  <select
                    name="hasGarden"
                    value={formData.hasGarden}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-neutral-100 px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                {/*  family members in the household */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    family members in the household{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="householdMembers"
                    min="1"
                    value={formData.householdMembers}
                    onChange={handleChange}
                    className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-(--color-neutral-0) dark:text-neutral-100 focus:outline-none ${errors.householdMembers ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-(--color-secondary-monYellow)"}`}
                  />
                  {errors.householdMembers && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.householdMembers}
                    </p>
                  )}
                </div>

                {/* Do you have children? */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Do you have children?
                  </label>
                  <select
                    name="hasChildren"
                    value={formData.hasChildren}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-neutral-100 px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                {/*  Children's Ages */}
                {formData.hasChildren === "yes" && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Children&apos;s Ages (comma-separated){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="childrenAges"
                      value={formData.childrenAges}
                      onChange={handleChange}
                      placeholder="e.g. 3, 7, 12"
                      className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-(--color-neutral-0) dark:text-neutral-100 focus:outline-none ${errors.childrenAges ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-(--color-secondary-monYellow)"}`}
                    />
                    {errors.childrenAges && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.childrenAges}
                      </p>
                    )}
                  </div>
                )}

                {/* Do you have other pets? */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Do you have other pets?
                  </label>
                  <select
                    name="hasOtherPets"
                    value={formData.hasOtherPets}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-neutral-100 px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                {/* Tell us about your other pets */}
                {formData.hasOtherPets === "yes" && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tell us about your other pets
                    </label>
                    <textarea
                      name="otherPetsDetails"
                      value={formData.otherPetsDetails}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Type, breed, age, temperament, etc."
                      className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-(--color-neutral-0) dark:text-neutral-100 focus:outline-none ${errors.otherPetsDetails ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-(--color-secondary-monYellow)"}`}
                    />
                    {errors.otherPetsDetails && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.otherPetsDetails}
                      </p>
                    )}
                  </div>
                )}

                {/* Do you have previous experience with pets? */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Do you have previous experience with pets?
                  </label>
                  <select
                    name="previousExperience"
                    value={formData.previousExperience}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-0) dark:text-neutral-100 px-4 py-3 focus:border-(--color-secondary-monYellow)"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                {/* Describe your previous experience */}
                {formData.previousExperience === "yes" && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Describe your previous experience{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="experienceDetails"
                      value={formData.experienceDetails}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your pet ownership history..."
                      className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-(--color-neutral-0) dark:text-neutral-100 focus:outline-none ${errors.experienceDetails ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-(--color-secondary-monYellow)"}`}
                    />
                    {errors.experienceDetails && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.experienceDetails}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Adoption Reason & Availability */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100 border-b border-(--color-secondary-monYellow)/30 pb-3">
                Adoption Reason & Availability
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {/* Why do you want to adopt? */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Why do you want to adopt?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reasonForAdoption"
                    value={formData.reasonForAdoption}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your motivation to adopt and what you're looking for in a pet..."
                    className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-(--color-neutral-10) dark:text-neutral-100 focus:outline-none ${errors.reasonForAdoption ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-(--color-secondary-monYellow)"}`}
                  />
                  {errors.reasonForAdoption && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.reasonForAdoption}
                    </p>
                  )}
                </div>

                {/* Your availability for home visits/follow-ups */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your availability for home visits/follow-ups{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Mention your availability and preferred contact methods for follow-up communications..."
                    className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-(--color-neutral-10) dark:text-neutral-100 focus:outline-none ${errors.availability ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-(--color-secondary-monYellow)"}`}
                  />
                  {errors.availability && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.availability}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Commitments */}
            <div className="space-y-4 bg-(--color-secondary-monYellow)/5 dark:bg-(--color-neutral-10) p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-(--color-primary-darkBlue) dark:text-neutral-100 mb-4">
                Commitments
              </h3>

              <label
                className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg transition ${
                  errors.agreeCare ? "bg-red-50 dark:bg-red-900/20" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="agreeCare"
                  checked={formData.agreeCare}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 accent-(--color-secondary-monYellow)"
                />
                <div className="flex-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    I commit to providing proper healthcare, vaccinations,
                    treatment, and quality food.
                  </span>
                  {errors.agreeCare && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.agreeCare}
                    </p>
                  )}
                </div>
              </label>

              <label
                className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg transition ${
                  errors.agreeNoAbandon ? "bg-red-50 dark:bg-red-900/20" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="agreeNoAbandon"
                  checked={formData.agreeNoAbandon}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 accent-(--color-secondary-monYellow)"
                />
                <div className="flex-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    I commit to not abandoning or surrendering the animal in the
                    street or returning it
                  </span>
                  {errors.agreeNoAbandon && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.agreeNoAbandon}
                    </p>
                  )}
                </div>
              </label>

              <label
                className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg transition ${
                  errors.agreeFollowUp ? "bg-red-50 dark:bg-red-900/20" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="agreeFollowUp"
                  checked={formData.agreeFollowUp}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 accent-(--color-secondary-monYellow)"
                />
                <div className="flex-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    I agree to home visits or regular communication to ensure
                    the animal&apos;s well-being
                  </span>
                  {errors.agreeFollowUp && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.agreeFollowUp}
                    </p>
                  )}
                </div>
              </label>
            </div>

            {/* Submit Button with Loading */}
            <div className="pt-6">
              <Button
                type="submit"
                variant="primary"
                disabled={
                  isSubmitting ||
                  isFormEmpty ||
                  (emptyInputs && !areAllRequiredFieldsFilled(formData))
                }
                className="group flex items-center justify-center w-full mx-auto max-w-xs hover:max-w-[350px] py-5 text-xl bg-(--color-primary-darkBlue)
                  hover:bg-(--color-primary-darkBlue) dark:text-neutral-100! dark:bg-(--color-neutral-0)! dark:hover:bg-(--color-card-bg)! 
                  transition-[max-width,background-color] duration-500 ease-in-out whitespace-nowrap overflow-hidden"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting Your Request...
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
};

export default AdoptionFormPage;
