"use client";
import Button from "@/components/atoms/Button";
import { toast } from "sonner";
import { useState } from "react";
import { Smartphone } from "lucide-react";
import BottomCTA from "@/components/molecules/BottomCTA";
import TopPageBanner from "@/components/molecules/TopPageBanner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  // handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Scroll to a specific section with id="mail"
  const handleClick = () => {
    document.getElementById("mail")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Handle Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  // Validate formData ... ALL Inputs Are Required
  // Note : If The Inputs Are Optional The Validation Will be Different.
  const handleSendMessage = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!formData.subject.trim()) {
      toast.error("Please enter a subject");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    // Validate email format ex: name@example.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // TODO: Send form data to your backend API
    // console.log("Form data to send:", formData);

    // Show success message
    toast.success("Message sent! We will get back to you soon.");

    // Clear the form ... Reset Data
    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-(--page-bg) pb-16">
      {/* === Banner Section === */}
      <section className="pt-1">
        <TopPageBanner
          handleClick={handleClick}
          title="Get in Touch"
          subTitle="Thousands More Fun!"
          description="Have questions about adoption, fostering, or our furry friends? We're here to help — drop us a message!"
          btnTitle="Send Message"
          btnTitle2="Call Us Now"
        />
      </section>

      {/* Main Contact Content */}
      <section id="mail" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Info + Map / Image */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-(--contact-title) transition-colors duration-300">
                Let&apos;s Connect
              </h2>
              <p className="mt-4 text-lg text-(--contact-desc) transition-colors duration-300">
                Whether you&apos;re ready to adopt, want to volunteer, or just
                want to say hi to our team — we&apos;re all ears (and tails!).
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-(--contact-card-bg) border border-(--contact-card-border) p-6 shadow-lg transition-colors duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--contact-icon-bg) text-(--contact-icon-color) transition-colors duration-300">
                  <Smartphone className="w-8 h-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-(--contact-card-title) transition-colors duration-300">
                  Phone
                </h3>
                <p className="mt-2 text-(--contact-card-text) transition-colors duration-300">
                  +20 123 456 7890
                </p>
                <p className="text-sm text-(--contact-card-subtext) transition-colors duration-300">
                  Sun – Thu: 10AM – 7PM
                </p>
              </div>

              <div className="rounded-2xl bg-(--contact-card-bg) border border-(--contact-card-border) p-6 shadow-lg transition-colors duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--contact-icon-bg) text-(--contact-icon-color) transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    className="text-inherit"
                  >
                    <path
                      fill="currentColor"
                      d="M12 13L2 6.76V6c0-1.11.89-2 2-2h16a2 2 0 0 1 2 2v.75zm10 5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.11l2 1.25V18h16v-7.64l2-1.25z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-(--contact-card-title) transition-colors duration-300">
                  Email
                </h3>
                <p className="mt-2 text-(--contact-card-text) transition-colors duration-300">
                  hello@onemorefriend.com
                </p>
                <p className="text-sm text-(--contact-card-subtext) transition-colors duration-300">
                  We reply within 24 hours
                </p>
              </div>

              <div className="rounded-2xl bg-(--contact-card-bg) border border-(--contact-card-border) p-6 shadow-lg sm:col-span-2 transition-colors duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--contact-icon-bg) text-(--contact-icon-color) transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    className="text-inherit"
                  >
                    <path
                      fill="currentColor"
                      d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-(--contact-card-title) transition-colors duration-300">
                  Visit Us
                </h3>
                <p className="mt-2 text-(--contact-card-text) transition-colors duration-300">
                  123 Pet Street, New Cairo, Cairo Governorate, Egypt
                </p>
                <p className="mt-1 text-sm text-(--contact-card-subtext) transition-colors duration-300">
                  Come meet your new best friend!
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-(--contact-form-bg) p-8 shadow-xl lg:p-10 transition-colors duration-300 border border-(--contact-card-border)">
            <h2 className="text-3xl font-bold text-(--contact-form-title) transition-colors duration-300">
              Send Us a Message
            </h2>
            <p className="mt-3 text-(--contact-form-desc) transition-colors duration-300">
              Fill out the form and we&apos;ll get back to you as soon as
              possible.
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-(--contact-label) transition-colors duration-300"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="fullName"
                    className="mt-1 block w-full rounded-lg border border-(--contact-input-border) bg-(--contact-input-bg)
                text-(--contact-input-text) px-4 py-3 focus:border-(--contact-input-focus) focus:ring-(--contact-input-focus) transition-colors duration-300"
                    placeholder="Your name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-(--contact-label) transition-colors duration-300"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-lg border border-(--contact-input-border) bg-(--contact-input-bg)
                text-(--contact-input-text) px-4 py-3 focus:border-(--contact-input-focus) focus:ring-(--contact-input-focus) transition-colors duration-300"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-(--contact-label) transition-colors duration-300"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-lg border border-(--contact-input-border) bg-(--contact-input-bg)
              text-(--contact-input-text) px-4 py-3 focus:border-(--contact-input-focus) focus:ring-(--contact-input-focus)
              transition-colors duration-300"
                  placeholder="Adoption inquiry / General question"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-(--contact-label) transition-colors duration-300"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-1 block w-full rounded-lg border border-(--contact-input-border) bg-(--contact-input-bg)
              text-(--contact-input-text) px-4 py-3 focus:border-(--contact-input-focus) focus:ring-(--contact-input-focus) transition-colors duration-300"
                  placeholder="Tell us how we can help you and your future furry friend..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <Button
                variant="primary"
                className="w-full bg-(--contact-btn-bg) text-(--contact-btn-text) 
            hover:bg-(--contact-btn-hover-bg) hover:text-(--contact-btn-hover-text)! 
            transition-colors duration-300 font-bold"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* === Bottom CTA === */}
      <BottomCTA
        title="Ready to meet your new friend?"
        description="Browse our available pets or schedule a visit today!"
        btnName="Explore Pets"
        btnName2="Book a Visit"
        href1="/available-pets"
        handleClick={handleClick}
      />
    </div>
  );
};

export default ContactPage;
