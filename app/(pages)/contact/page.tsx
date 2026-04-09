// pages/contact.tsx  أو  app/contact/page.tsx
"use client";
// import * as images from "@/assets/images/images";
import * as icons from "@/assets/icons";
// import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";
// import { toast } from "react-hot-toast/headless";
import toast from "react-hot-toast";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
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

  // const [fullname, setFullname] = useState("");
  // const [email, setEmail] = useState("");
  // const [subject, setSubject] = useState("");
  // const [message, setMessage] = useState("");

  // const handleToaster = () => {
  //   // toast.success("Send Message clicked! Implement your message logic here.");
  //   // toast.error("Call Us Now clicked! Implement your call logic here.");
  // };

  // Scroll to bottom of page on button click
  // const handleClick = () => {
  //   window.scrollTo({
  //     top: document.body.scrollHeight,
  //     behavior: "smooth",
  //   });
  // };

  // Alternative: Scroll to a specific section with id="mail"
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

  // Validate form data
  const handleSendMessage = () => {
    if (!formData.fullname.trim()) {
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
    console.log("Form data to send:", formData);

    // Show success message
    toast.success("Message sent! We will get back to you soon.");

    // Clear the form ... Reset Data
    setFormData({
      fullname: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-16">
      {/* Hero / Cover Like HeroSections */}
      <section className="px-4 py-12 md:py-20">
        <div className="container relative mx-auto flex flex-col items-center text-center overflow-hidden rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-neutral-0) py-16 md:py-24 px-6 md:px-12">
          {/* Decorative blobs */}
          <div className="dark:opacity-50 absolute -right-40 -top-40 h-[500px] w-[500px] rotate-12 rounded-full bg-(--color-secondary-monYellow-80) dark:bg-(--color-secondary-monYellow-80)/20 md:h-[700px] md:w-[700px]"></div>
          <div className="dark:opacity-50 absolute -left-60 bottom-20 h-[600px] w-[600px] rotate-25 rounded-full bg-(--color-secondary-monYellow-80) dark:bg-(--color-secondary-monYellow-80)/20 md:h-[800px] md:w-[800px]"></div>
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl font-bold text-(--color-primary-darkBlue) md:text-5xl lg:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg text-(--color-primary-darkBlue) md:text-xl">
              Have questions about adoption, fostering, or our furry friends?
              We&apos;re here to help — drop us a message!
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                className="group transition-all duration-300 flex items-center gap-2 sm:text-(--color-secondary-monYellow) dark:bg-(--color-neutral-0) 
                dark:text-(--color-secondary-monYellow) dark:border-1 dark:border-(--color-primary-darkBlue)! dark:hover:bg-(--color-secondary-monYellow) 
                dark:hover:text-(--color-neutral-0) dark:border dark:border-(--color-secondary-monYellow)! dark:hover:border-(--color-neutral-0)!"
                onClick={handleClick}
              >
                Send Message
                <icons.CircleArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              </Button>

              <Button
                variant="outline"
                className="transition-all duration-300 dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-(--color-neutral-0)"
                onClick={handleClick}
              >
                Call Us Now
              </Button>
            </div>
          </div>

          {/* Pet image floating */}
          {/* <div className="relative mt-12 md:mt-0 md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2">
            <Image
              src={images.homeCover1 || images.Adoption} // استخدم صورة مناسبة عندك
              alt="Happy pet waving"
              className="w-64 scale-125 drop-shadow-2xl md:w-80 lg:w-96"
              priority
            />
          </div> */}
        </div>
      </section>
      {/* Main Contact Content */}
      <section id="mail" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Info + Map / Image */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) transition-colors duration-300">
                Let&apos;s Connect
              </h2>
              <p className="mt-4 text-lg text-gray-700 dark:text-(--color-neutral-80) transition-colors duration-300">
                Whether you&apos;re ready to adopt, want to volunteer, or just
                want to say hi to our team — we&apos;re all ears (and tails!).
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-white dark:bg-(--color-card-bg) border border-transparent dark:border-(--color-card-border) p-6 shadow-lg transition-colors duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-darkBlue) dark:bg-(--color-secondary-monYellow) text-(--color-secondary-monYellow) dark:text-[#002a48]! transition-colors duration-300">
                  {/* <icons.Smartphone className="h-9 w-9" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    className="text-inherit"
                  >
                    <path
                      fill="currentColor"
                      d="M17 19H7V5h10m0-4H7c-1.11 0-2 .89-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold dark:text-[#fdfdfd] transition-colors duration-300">
                  Phone
                </h3>
                <p className="mt-2 text-gray-600 dark:text-[#ebeeef] transition-colors duration-300">
                  +20 123 456 7890
                </p>
                <p className="text-sm text-gray-500 dark:text-[#99a2a5] transition-colors duration-300">
                  Sun – Thu: 10AM – 7PM
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-[#002a48] border border-transparent dark:border-[#003459] p-6 shadow-lg transition-colors duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-darkBlue) dark:bg-(--color-secondary-monYellow) text-(--color-secondary-monYellow) dark:text-[#002a48] transition-colors duration-300">
                  {/* <icons.Smartphone className="h-9 w-9" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    // className="text-(--color-primary-darkBlue)"
                    className="text-inherit"
                  >
                    <path
                      fill="currentColor"
                      d="M12 13L2 6.76V6c0-1.11.89-2 2-2h16a2 2 0 0 1 2 2v.75zm10 5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.11l2 1.25V18h16v-7.64l2-1.25z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold dark:text-[#fdfdfd] transition-colors duration-300">
                  Email
                </h3>
                <p className="mt-2 text-gray-600 dark:text-[#ebeeef] transition-colors duration-300">
                  hello@onemorefriend.com
                </p>
                <p className="text-sm text-gray-500 dark:text-[#99a2a5] transition-colors duration-300">
                  We reply within 24 hours
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-[#002a48] border border-transparent dark:border-[#003459] p-6 shadow-lg sm:col-span-2 transition-colors duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-darkBlue) dark:bg-(--color-secondary-monYellow) text-(--color-secondary-monYellow) dark:text-[#002a48] transition-colors duration-300">
                  {/* <icons.Mail className="h-9 w-9" /> */}
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
                <h3 className="mt-4 text-xl font-semibold dark:text-[#fdfdfd] transition-colors duration-300">
                  Visit Us
                </h3>
                <p className="mt-2 text-gray-600 dark:text-[#ebeeef] transition-colors duration-300">
                  123 Pet Street, New Cairo, Cairo Governorate, Egypt
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-[#99a2a5] transition-colors duration-300">
                  Come meet your new best friend!
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-white dark:bg-(--color-card-bg) p-8 shadow-xl lg:p-10 transition-colors duration-300 border border-transparent dark:border-[#003459]">
            <h2 className="text-3xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) transition-colors duration-300">
              Send Us a Message
            </h2>
            <p className="mt-3 text-gray-600 dark:text-[#ebeeef] transition-colors duration-300">
              Fill out the form and we&apos;ll get back to you as soon as
              possible.
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-[#ebeeef] transition-colors duration-300"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="fullname"
                    className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-[#00528c] bg-white dark:bg-[#00171f] text-gray-900 dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow) focus:ring-(--color-secondary-monYellow) dark:focus:ring-(--color-secondary-monYellow) transition-colors duration-300 dark:placeholder-gray-400"
                    placeholder="Your name"
                    value={formData.fullname}
                    // value={fullname}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-[#ebeeef] transition-colors duration-300"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-[#00528c] bg-white dark:bg-[#00171f] text-gray-900 dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow) focus:ring-(--color-secondary-monYellow) dark:focus:ring-(--color-secondary-monYellow) transition-colors duration-300 dark:placeholder-gray-400"
                    placeholder="you@example.com"
                    value={formData.email}
                    // value={email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-[#ebeeef] transition-colors duration-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-[#00528c] bg-white dark:bg-[#00171f] text-gray-900 dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow) focus:ring-(--color-secondary-monYellow) dark:focus:ring-(--color-secondary-monYellow) transition-colors duration-300 dark:placeholder-gray-400"
                  placeholder="Adoption inquiry / General question"
                  value={formData.subject}
                  // value={subject}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-[#ebeeef] transition-colors duration-300"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-[#00528c] bg-white dark:bg-[#00171f] text-gray-900 dark:text-white px-4 py-3 focus:border-(--color-secondary-monYellow) focus:ring-(--color-secondary-monYellow) dark:focus:ring-(--color-secondary-monYellow) transition-colors duration-300 dark:placeholder-gray-400"
                  placeholder="Tell us how we can help you and your future furry friend..."
                  value={formData.message}
                  // value={message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <Button
                variant="primary"
                className="w-full bg-(--color-primary-darkBlue) text-(--color-secondary-monYellow) hover:bg-(--color-secondary-monYellow)/90 hover:text-(--color-primary-darkBlue)! dark:bg-(--color-secondary-monYellow) dark:text-[#00171f] dark:hover:bg-[#eec77e] transition-colors duration-300 font-bold"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
      ``
      {/* Optional small CTA at bottom */}
      <section className="px-4 text-center">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-(--color-secondary-monYellow) dark:bg-(--color-card-bg) border border-transparent dark:border-(--color-card-border) py-12 transition-colors duration-300 shadow-lg">
          <h3 className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) transition-colors duration-300 md:text-3xl">
            Ready to meet your new friend?
          </h3>
          <p className="mt-4 text-lg text-(--color-primary-darkBlue)/90 dark:text-[#ebeeef] transition-colors duration-300">
            Browse our available pets or schedule a visit today!
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/">
              <Button
                variant="primary"
                className="dark:bg-(--color-secondary-monYellow) dark:text-[#00171f] dark:hover:bg-[#eec77e] transition-colors duration-300"
              >
                Explore Pets
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-[#00171f] transition-colors duration-300"
            >
              Book a Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
// function tost(arg0: string) {
//   throw new Error("Function not implemented.");
// }
