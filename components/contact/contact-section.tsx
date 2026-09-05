'use client';

import { FormEvent, useState } from 'react';

import { ArrowRight, LoaderCircle } from 'lucide-react';

const services = ['Photography', 'Cinematography'] as const;

const budgetOptions = ['Under ৳25,000', '৳25,000 – ৳50,000', '৳50,000 – ৳100,000', '৳100,000+'];

type Service = (typeof services)[number];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const selectedServices = services.filter((service) =>
      formData.getAll('service').includes(service),
    ) as Service[];

    const payload = {
      website: String(formData.get('website') ?? ''),
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      service: selectedServices,
      projectDate: String(formData.get('projectDate') ?? ''),
      projectSizeSqft: String(formData.get('projectSizeSqft') ?? ''),
      location: String(formData.get('location') ?? ''),
      budget: String(formData.get('budget') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.message || 'We could not submit your enquiry. Please try again.');
        return;
      }

      const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

      if (web3FormsKey) {
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              access_key: web3FormsKey,
              subject: `${selectedServices.join(' + ')} enquiry — ST Photography`,
              from_name: 'ST Photography Website',
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              service: selectedServices.join(', '),
              project_date: payload.projectDate,
              project_size_sqft: payload.projectSizeSqft,
              location: payload.location,
              budget: payload.budget,
              message: payload.message,
              replyto: payload.email,
            }),
          });
        } catch (emailError) {
          console.error('Web3Forms error:', emailError);
        }
      }

      form.reset();
      setStatus('success');
    } catch (error) {
      console.error('Enquiry submission error:', error);

      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  }

  const isSubmitting = status === 'submitting';

  const inputClassName =
    'mt-2 h-12 w-full rounded-md border border-black/15 bg-transparent px-4 text-sm text-black outline-none transition-colors duration-200 placeholder:text-black/35 focus:border-black disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:text-white dark:placeholder:text-white/35 dark:focus:border-white';

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-b border-black/10 py-24 sm:py-28 lg:py-32 dark:border-white/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="mb-20 flex items-center gap-4 sm:mb-28">
              <span className="editorial-rule" />

              <p className="type-label text-muted">Start a project</p>
            </div>

            <h2
              id="contact-heading"
              className="max-w-xl text-[clamp(3.5rem,7vw,7rem)] leading-[0.86] font-medium tracking-[-0.055em]"
            >
              Tell us about
              <br />
              your space.
            </h2>

            <div className="mt-16 max-w-md sm:mt-20">
              <div className="border-foreground/10 border-t pt-6">
                <p className="type-label-sm text-muted mb-8">Before we begin</p>

                <p className="max-w-xl text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.035em]">
                  You do not need to have everything figured out. Start with the space, and we will
                  take it from there.
                </p>
              </div>

              <div className="border-foreground/10 mt-14 border-t pt-6 sm:mt-20">
                <p className="type-body text-secondary max-w-lg">
                  Tell us what you are planning, where the project is, and whether you need
                  photography, cinematography, or both.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:mt-32">
            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-black/15 bg-transparent p-5 sm:p-6 dark:border-white/15"
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px opacity-0"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-black dark:text-white"
                  >
                    Name
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-black dark:text-white"
                  >
                    Email
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    disabled={isSubmitting}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="text-sm font-medium text-black dark:text-white"
                  >
                    Phone number
                  </label>

                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+880 1XXX XXXXXX"
                    disabled={isSubmitting}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-project-date"
                    className="text-sm font-medium text-black dark:text-white"
                  >
                    Project date
                  </label>

                  <input
                    id="contact-project-date"
                    name="projectDate"
                    type="date"
                    disabled={isSubmitting}
                    className={inputClassName}
                  />
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className="text-sm font-medium text-black dark:text-white">
                    What do you need?
                  </legend>

                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {services.map((service) => (
                      <label
                        key={service}
                        className="group flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-black/15 px-4 transition-colors duration-200 hover:border-black dark:border-white/20 dark:hover:border-white"
                      >
                        <input
                          type="checkbox"
                          name="service"
                          value={service}
                          disabled={isSubmitting}
                          className="h-4 w-4 accent-black dark:accent-white"
                        />

                        <span className="text-sm text-black/65 transition-colors duration-200 group-hover:text-black dark:text-white/65 dark:group-hover:text-white">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="contact-project-size"
                    className="text-sm font-medium text-black dark:text-white"
                  >
                    Project size
                  </label>

                  <div className="relative">
                    <input
                      id="contact-project-size"
                      name="projectSizeSqft"
                      type="number"
                      min="1"
                      max="1000000"
                      placeholder="Approximate area"
                      disabled={isSubmitting}
                      className={`${inputClassName} pr-16`}
                    />

                    <span className="pointer-events-none absolute top-1/2 right-4 mt-1 -translate-y-1/2 text-xs text-black/40 dark:text-white/40">
                      sqft
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-location"
                    className="text-sm font-medium text-black dark:text-white"
                  >
                    Location
                  </label>

                  <input
                    id="contact-location"
                    name="location"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Project location"
                    disabled={isSubmitting}
                    className={inputClassName}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-budget"
                    className="text-sm font-medium text-black dark:text-white"
                  >
                    Estimated budget
                  </label>

                  <select
                    id="contact-budget"
                    name="budget"
                    disabled={isSubmitting}
                    defaultValue=""
                    className={`${inputClassName} appearance-none`}
                  >
                    <option value="" disabled>
                      Select a budget range
                    </option>

                    {budgetOptions.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-black dark:text-white"
                  >
                    Tell us about the project
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about the space, what you need, and anything else that may be useful."
                    required
                    disabled={isSubmitting}
                    className="mt-2 min-h-32 w-full resize-y rounded-md border border-black/15 bg-transparent px-4 py-3 text-sm leading-6 text-black outline-none placeholder:text-black/35 focus:border-black disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:text-white dark:placeholder:text-white/35 dark:focus:border-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex min-h-14 w-full cursor-pointer items-center justify-center gap-4 rounded-md border border-black bg-black px-8 py-4 text-xs font-semibold tracking-[0.2em] !text-white uppercase transition-opacity duration-300 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-white dark:!text-black"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="!text-white dark:!text-black">Sending...</span>

                        <LoaderCircle
                          size={17}
                          strokeWidth={1.5}
                          className="animate-spin !text-white dark:!text-black"
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <>
                        <span className="!text-white dark:!text-black">Send enquiry</span>

                        <ArrowRight
                          size={17}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="!text-white transition-transform duration-300 group-hover:translate-x-1 dark:!text-black"
                        />
                      </>
                    )}
                  </button>

                  <p className="mt-3 max-w-lg text-xs leading-5 text-black/45 dark:text-white/45">
                    By sending this enquiry, you are simply starting a conversation. There is no
                    obligation to proceed.
                  </p>

                  {status === 'success' && (
                    <p
                      className="mt-3 text-sm font-medium text-black dark:text-white"
                      role="status"
                    >
                      Thanks. Your enquiry has been received. We will get back to you soon.
                    </p>
                  )}

                  {status === 'error' && (
                    <p
                      className="mt-3 text-sm font-medium text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
