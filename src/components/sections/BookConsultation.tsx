"use client";

import { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/ScrollEffects";
import { SERVICES_OPTIONS } from "@/lib/constants";

export default function BookConsultation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    date: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      date: "",
      message: "",
    });
  };

  const inputClasses =
    "w-full border border-tiscu-navy/15 bg-tiscu-bg px-4 py-3 text-sm text-tiscu-navy outline-none transition-all duration-200 focus:border-tiscu-steel focus:ring-2 focus:ring-tiscu-steel/20 font-mono placeholder:text-tiscu-muted/60";

  return (
    <section id="book" className="border-t border-tiscu-navy/10 bg-tiscu-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
        {/* Left: Info */}
        <div className="lg:col-span-5 py-16 px-6 lg:pr-16 lg:border-r border-tiscu-navy/10 flex flex-col justify-center">
          <FadeIn direction="left">
            <span className="font-mono text-xs text-tiscu-steel uppercase tracking-widest">
              Fig 3.0 — Engagement
            </span>
            <h2 className="font-grotesk text-3xl md:text-4xl font-medium tracking-tight mt-4 mb-6 text-tiscu-navy">
              Book a Consultation
            </h2>
            <p className="text-base text-tiscu-steel leading-relaxed max-w-md mb-10">
              Take the first step toward transforming your business. Share your
              details and we&apos;ll get back to you within 48 hours.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, text: "+1 (555) 000-0000" },
                { icon: Mail, text: "hello@tiscu.com" },
                { icon: MapPin, text: "Global — Remote & On-site" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-4 text-tiscu-steel"
                >
                  <div className="w-10 h-10 border border-tiscu-navy/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-tiscu-steel" />
                  </div>
                  <span className="text-sm font-mono">{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-7 py-16 px-6 lg:pl-16 flex flex-col justify-center">
          <FadeIn direction="right" delay={0.15}>
            <form onSubmit={handleSubmit} className="max-w-lg">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={inputClasses}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClasses}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="company"
                    className="mb-1.5 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className={inputClasses}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="mb-1.5 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
                  >
                    Service Interest
                  </label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className={`${inputClasses} cursor-pointer`}
                  >
                    <option value="">Select a service</option>
                    {SERVICES_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="date"
                  className="mb-1.5 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
                >
                  Preferred Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className={`${inputClasses} cursor-pointer`}
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-1.5 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us about your business challenges..."
                />
              </div>

              <MagneticButton
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-tiscu-navy bg-tiscu-navy px-6 py-3.5 font-grotesk text-sm font-medium text-tiscu-bg transition-all duration-300 hover:bg-transparent hover:text-tiscu-navy cursor-pointer"
              >
                {formSubmitted ? (
                  "THANK YOU — WE'LL BE IN TOUCH."
                ) : (
                  <>
                    SEND REQUEST
                    <Send className="h-4 w-4" />
                  </>
                )}
              </MagneticButton>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
