"use client";

import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";

const instagramLink = "https://www.instagram.com/st_photography_interior?igsi=MTk4cHk4enJhNW50cg==";

const youtubeLink = "https://youtube.com/@stphotography01?si=UuuBA6z8vunGAAD5";

const facebookLink = "https://www.facebook.com/share/1EiPXQt7tZ/";

const whatsappNumber = "8801839050341";

const whatsappMessage = "Hello Sraban, I would like to discuss a photography or cinematography project with ST Photography.";

const whatsappLink = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappMessage);

const services = ["Photography", "Cinematography", "Event", "Portrait", "Interior", "Other"];

type FormData = {
  website: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  projectDate: string;
  location: string;
  budget: string;
  message: string;
};

const initialForm: FormData = {
  website: "",
  name: "",
  email: "",
  phone: "",
  service: "",
  projectDate: "",
  location: "",
  budget: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: keyof FormData, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    try {
      const databaseResponse = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const databaseResult = await databaseResponse.json();

      if (!databaseResponse.ok || !databaseResult.success) {
        setError(databaseResult.message || "Unable to save your enquiry. Please try again.");

        return;
      }

      const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry — ${form.service} — ${form.name}`,
          from_name: "ST Photography Website",
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          service: form.service,
          project_date: form.projectDate || "Not specified",
          location: form.location || "Not specified",
          budget: form.budget || "Not specified",
          message: form.message,
          enquiry_id: databaseResult.enquiryId,
        }),
      });

      const web3FormsText = await web3FormsResponse.text();

      let web3FormsResult: {
        success?: boolean;
        message?: string;
      } = {};

      try {
        web3FormsResult = JSON.parse(web3FormsText);
      } catch {
        console.error("Web3Forms returned a non-JSON response:", web3FormsText.slice(0, 500));
      }

      if (!web3FormsResponse.ok || !web3FormsResult.success) {
        console.error("Web3Forms email error:", {
          status: web3FormsResponse.status,
          response: web3FormsResult,
        });

        setError("Your enquiry was saved, but we couldn't send the email notification. Please contact us directly by WhatsApp or email.");

        return;
      }

      setForm(initialForm);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Enquiry submission error:", error);

      setError("Unable to send your enquiry. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-background px-6 py-32 sm:px-8 sm:py-40 lg:px-10 lg:py-52">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-20 flex items-center gap-4 lg:mb-28"
        >
          <span className="h-px w-8 bg-foreground/40" />

          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted sm:text-xs">03 / Contact</p>
        </motion.div>

        <div className="grid gap-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-3xl font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.82] tracking-[-0.05em]"
            >
              Let&apos;s create
              <br />
              something.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              className="mt-12 max-w-md sm:mt-16"
            >
              <p className="text-base leading-8 text-secondary sm:text-lg sm:leading-9">Tell us a little about your project, and let&apos;s explore what we can create together.</p>

              <a href="mailto:sahatammalphotography@gmail.com" className="group mt-8 inline-flex items-center gap-3 border-b border-foreground/30 pb-2 text-sm tracking-[0.02em] transition-colors duration-300 hover:border-foreground sm:mt-10 sm:text-base">
                sahatammalphotography@gmail.com
                <ArrowUpRight size={15} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {isSubmitted ? (
              <div className="flex min-h-[600px] flex-col justify-center border-t border-foreground/15 py-16">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20">
                  <Check size={20} strokeWidth={1.4} />
                </div>

                <h3 className="font-serif text-5xl leading-none tracking-[-0.04em] sm:text-6xl lg:text-7xl">Enquiry sent.</h3>

                <p className="mt-6 max-w-md text-base leading-8 text-secondary">Thank you for getting in touch. Your enquiry has been received and we&apos;ll get back to you shortly.</p>

                <button type="button" onClick={() => setIsSubmitted(false)} className="mt-10 w-fit border-b border-foreground/30 pb-2 text-xs font-medium uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-50">
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border-t border-foreground/15">
                <input type="text" name="website" value={form.website} onChange={(event) => updateField("website", event.target.value)} tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />

                <div className="grid sm:grid-cols-2 sm:gap-x-10">
                  <Field label="Name" name="name" value={form.name} placeholder="Your name" onChange={(value) => updateField("name", value)} required />

                  <Field label="Email" name="email" type="email" value={form.email} placeholder="Your email" onChange={(value) => updateField("email", value)} required />

                  <Field label="Phone / WhatsApp" name="phone" value={form.phone} placeholder="Your phone number" onChange={(value) => updateField("phone", value)} />

                  <div className="border-b border-foreground/15 py-7">
                    <label htmlFor="service" className="mb-4 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[11px]">
                      Service
                    </label>

                    <select id="service" name="service" value={form.service} onChange={(event) => updateField("service", event.target.value)} required className="w-full appearance-none bg-transparent text-base text-foreground outline-none sm:text-lg">
                      <option value="" disabled>
                        Select a service
                      </option>

                      {services.map((service) => (
                        <option key={service} value={service} className="bg-background text-foreground">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field label="Project date" name="projectDate" type="date" value={form.projectDate} onChange={(value) => updateField("projectDate", value)} />

                  <Field label="Location" name="location" value={form.location} placeholder="Project location" onChange={(value) => updateField("location", value)} />

                  <div className="border-b border-foreground/15 py-7 sm:col-span-2">
                    <label htmlFor="budget" className="mb-4 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[11px]">
                      Budget
                    </label>

                    <select id="budget" name="budget" value={form.budget} onChange={(event) => updateField("budget", event.target.value)} className="w-full appearance-none bg-transparent text-base text-foreground outline-none sm:text-lg">
                      <option value="" className="bg-background">
                        Prefer not to say
                      </option>

                      <option value="Under ৳25,000" className="bg-background">
                        Under ৳25,000
                      </option>

                      <option value="৳25,000 – ৳50,000" className="bg-background">
                        ৳25,000 – ৳50,000
                      </option>

                      <option value="৳50,000 – ৳100,000" className="bg-background">
                        ৳50,000 – ৳100,000
                      </option>

                      <option value="৳100,000+" className="bg-background">
                        ৳100,000+
                      </option>
                    </select>
                  </div>

                  <div className="border-b border-foreground/15 py-7 sm:col-span-2">
                    <label htmlFor="message" className="mb-4 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[11px]">
                      Tell us about the project
                    </label>

                    <textarea id="message" name="message" value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="A few words about your project, vision, date, or anything else you would like us to know." required rows={5} className="w-full resize-none bg-transparent text-base leading-7 text-foreground outline-none placeholder:text-muted/60 sm:text-lg sm:leading-8" />
                  </div>
                </div>

                {error && (
                  <p role="alert" className="mt-6 text-sm leading-6 text-red-500">
                    {error}
                  </p>
                )}

                <div className="flex flex-col items-start justify-between gap-8 pt-8 sm:flex-row sm:items-center">
                  <p className="max-w-xs text-xs leading-5 text-muted">By submitting this form, you agree that we may contact you regarding your enquiry.</p>

                  <button type="submit" disabled={isSubmitting} className="group inline-flex items-center gap-4 border-b border-foreground pb-3 text-xs font-medium uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm">
                    {isSubmitting ? (
                      <>
                        Sending
                        <LoaderCircle size={15} strokeWidth={1.4} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <ArrowUpRight size={15} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        <div className="mt-28 border-t border-foreground/10 pt-10 sm:mt-40 lg:mt-52">
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted sm:text-xs">
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="transition-opacity duration-300 hover:opacity-50">
              Instagram
            </a>

            <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="transition-opacity duration-300 hover:opacity-50">
              YouTube
            </a>

            <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="transition-opacity duration-300 hover:opacity-50">
              Facebook
            </a>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="transition-opacity duration-300 hover:opacity-50">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

function Field({ label, name, value, placeholder, type = "text", required = false, onChange }: FieldProps) {
  return (
    <div className="border-b border-foreground/15 py-7">
      <label htmlFor={name} className="mb-4 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[11px]">
        {label}
      </label>

      <input id={name} name={name} type={type} value={value} placeholder={placeholder} required={required} onChange={(event) => onChange(event.target.value)} className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted/60 sm:text-lg" />
    </div>
  );
}
