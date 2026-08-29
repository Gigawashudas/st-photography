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
    <section id="contact" className="bg-background px-5 py-24 sm:px-8 sm:py-40 lg:px-10 lg:py-52">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 flex items-center gap-3 sm:mb-20 sm:gap-4 lg:mb-28"
        >
          <span className="h-px w-6 bg-foreground/40 sm:w-8" />

          <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-muted sm:text-xs sm:tracking-[0.25em]">03 / Contact</p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-3xl font-serif text-[clamp(3.6rem,15vw,8rem)] leading-[0.84] tracking-[-0.055em] sm:text-[clamp(4rem,8vw,8rem)] sm:tracking-[-0.05em]"
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
              className="mt-9 max-w-md sm:mt-16"
            >
              <p className="text-sm leading-7 text-secondary sm:text-lg sm:leading-9">Tell us a little about your project, and let&apos;s explore what we can create together.</p>

              <a href="mailto:sahatammalphotography@gmail.com" className="group mt-7 inline-flex min-h-11 items-center gap-3 border-b border-foreground/30 pb-2 text-[11px] tracking-[0.02em] transition-colors duration-300 hover:border-foreground sm:mt-10 sm:text-base">
                sahatammalphotography@gmail.com
                <ArrowUpRight size={15} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {isSubmitted ? (
              <div className="flex min-h-[480px] flex-col justify-center border-t border-foreground/15 py-14 sm:min-h-[600px] sm:py-16">
                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20">
                  <Check size={19} strokeWidth={1.4} />
                </div>

                <h3 className="font-serif text-[3.25rem] leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-7xl">Enquiry sent.</h3>

                <p className="mt-5 max-w-md text-sm leading-7 text-secondary sm:mt-6 sm:text-base sm:leading-8">Thank you for getting in touch. Your enquiry has been received and we&apos;ll get back to you shortly.</p>

                <button type="button" onClick={() => setIsSubmitted(false)} className="mt-9 min-h-11 w-fit border-b border-foreground/30 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-50 sm:mt-10 sm:text-xs">
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

                  <SelectField label="Service" id="service" value={form.service} placeholder="Select a service" options={services} required onChange={(value) => updateField("service", value)} />

                  <Field label="Project date" name="projectDate" type="date" value={form.projectDate} placeholder="" onChange={(value) => updateField("projectDate", value)} />

                  <Field label="Location" name="location" value={form.location} placeholder="Project location" onChange={(value) => updateField("location", value)} />

                  <div className="border-b border-foreground/15 py-6 sm:col-span-2 sm:py-7">
                    <label htmlFor="budget" className="mb-3 block text-[9px] font-medium uppercase tracking-[0.24em] text-muted sm:mb-4 sm:text-[11px]">
                      Budget
                    </label>

                    <select id="budget" name="budget" value={form.budget} onChange={(event) => updateField("budget", event.target.value)} className="min-h-11 w-full appearance-none bg-transparent text-[15px] text-foreground outline-none sm:text-lg">
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

                  <div className="border-b border-foreground/15 py-6 sm:col-span-2 sm:py-7">
                    <label htmlFor="message" className="mb-3 block text-[9px] font-medium uppercase tracking-[0.24em] text-muted sm:mb-4 sm:text-[11px]">
                      Tell us about the project
                    </label>

                    <textarea id="message" name="message" value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="A few words about your project, vision, date, or anything else you would like us to know." required rows={5} className="w-full resize-none bg-transparent text-[15px] leading-7 text-foreground outline-none placeholder:text-muted/60 sm:text-lg sm:leading-8" />
                  </div>
                </div>

                {error && (
                  <p role="alert" className="mt-5 text-sm leading-6 text-red-500">
                    {error}
                  </p>
                )}

                <div className="flex flex-col gap-7 pt-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:pt-8">
                  <p className="max-w-xs text-[10px] leading-5 text-muted sm:text-xs">By submitting this form, you agree that we may contact you regarding your enquiry.</p>

                  <button type="submit" disabled={isSubmitting} className="group inline-flex min-h-11 items-center gap-4 border-b border-foreground pb-3 text-[10px] font-medium uppercase tracking-[0.22em] transition-opacity duration-300 hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm">
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

        <div className="mt-24 border-t border-foreground/10 pt-8 sm:mt-40 sm:pt-10 lg:mt-52">
          <div className="flex flex-wrap gap-x-7 gap-y-4 text-[9px] font-medium uppercase tracking-[0.22em] text-muted sm:gap-x-8 sm:text-xs">
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="min-h-8 transition-opacity duration-300 hover:opacity-50">
              Instagram
            </a>

            <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="min-h-8 transition-opacity duration-300 hover:opacity-50">
              YouTube
            </a>

            <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="min-h-8 transition-opacity duration-300 hover:opacity-50">
              Facebook
            </a>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="min-h-8 transition-opacity duration-300 hover:opacity-50">
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
    <div className="border-b border-foreground/15 py-6 sm:py-7">
      <label htmlFor={name} className="mb-3 block text-[9px] font-medium uppercase tracking-[0.24em] text-muted sm:mb-4 sm:text-[11px]">
        {label}
      </label>

      <input id={name} name={name} type={type} value={value} placeholder={placeholder} required={required} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted/60 sm:text-lg" />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  id: string;
  value: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  onChange: (value: string) => void;
};

function SelectField({ label, id, value, placeholder, options, required = false, onChange }: SelectFieldProps) {
  return (
    <div className="border-b border-foreground/15 py-6 sm:py-7">
      <label htmlFor={id} className="mb-3 block text-[9px] font-medium uppercase tracking-[0.24em] text-muted sm:mb-4 sm:text-[11px]">
        {label}
      </label>

      <select id={id} name={id} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="min-h-11 w-full appearance-none bg-transparent text-[15px] text-foreground outline-none sm:text-lg">
        <option value="" disabled className="bg-background">
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option} className="bg-background text-foreground">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
