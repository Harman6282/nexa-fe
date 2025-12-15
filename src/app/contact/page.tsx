"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
    if (!subject.trim()) e.subject = "Subject is required";
    if (!message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});
    // Simulate API call
    await new Promise((res) => setTimeout(res, 800));
    // Here you'd call your real send API
    console.log({ name, email, subject, message });
    setSubmitting(false);
    setSent(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <section className="md:col-span-2 bg-white border rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Contact Us
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Questions, feedback or partnership inquiries — send us a message and
            we’ll get back to you within 1-2 business days.
          </p>

          <form onSubmit={onSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Name</span>
                <input
                  className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    errors.name ? "border-red-400" : "border-gray-200"
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <span id="name-error" className="text-xs text-red-600 mt-1">
                    {errors.name}
                  </span>
                )}
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Email</span>
                <input
                  className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="text-xs text-red-600 mt-1">
                    {errors.email}
                  </span>
                )}
              </label>
            </div>

            <label className="flex flex-col mt-4">
              <span className="text-sm font-medium text-gray-700">Subject</span>
              <input
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  errors.subject ? "border-red-400" : "border-gray-200"
                }`}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief subject"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && (
                <span id="subject-error" className="text-xs text-red-600 mt-1">
                  {errors.subject}
                </span>
              )}
            </label>

            <label className="flex flex-col mt-4">
              <span className="text-sm font-medium text-gray-700">Message</span>
              <textarea
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  errors.message ? "border-red-400" : "border-gray-200"
                }`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <span id="message-error" className="text-xs text-red-600 mt-1">
                  {errors.message}
                </span>
              )}
            </label>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-gray-900 active:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Sending..." : "Send Message"}
              </button>

              {sent && (
                <div className="inline-flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <Check className="w-4 h-4" />
                  Sent
                </div>
              )}

              <p className="text-xs text-gray-500 ml-auto">
                We'll never share your info. Read our privacy policy.
              </p>
            </div>
          </form>
        </section>

        <aside className="bg-white border rounded-lg shadow-sm p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Get in touch
            </h3>
            <p className="text-sm text-gray-600">
              Prefer to reach out directly? Use the details below.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-50 rounded-md">
              <MapPin className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Address</p>
              <p className="text-sm text-gray-600">
                123 Nexa Street, Mumbai, IN
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-50 rounded-md">
              <Phone className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Phone</p>
              <a
                className="text-sm text-gray-600 hover:text-indigo-600"
                href="tel:+911234567890"
              >
                +91 12345 67890
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-50 rounded-md">
              <Mail className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Email</p>
              <a
                className="text-sm text-gray-600 hover:text-indigo-600"
                href="mailto:support@nexa.com"
              >
                support@nexa.com
              </a>
            </div>
          </div>

          <div className="pt-2 border-t mt-2">
            <p className="text-xs text-gray-500">Business hours</p>
            <p className="text-sm text-gray-700">
              Mon — Fri: 9:00 AM — 6:00 PM
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
