"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Instagram, MapPin, Loader2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MODEL } from "./data";
import { Reveal, SectionHeading } from "./reveal";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  date: z.string().optional(),
  message: z.string().min(10, "Please tell us a little more (min 10 characters)"),
});

type FormValues = z.infer<typeof schema>;

const PROJECT_TYPES = [
  "Editorial",
  "Runway",
  "Campaign",
  "Film & Motion",
  "Other",
];

export function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      date: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      toast({
        title: "Booking request sent",
        description: "The agency will be in touch within 48 hours.",
      });
      reset();
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again or email us directly.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-foreground py-24 text-background sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — info */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title="Book Mizuhara"
              className="text-background"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-background/70">
                For editorial, runway, campaign, and film enquiries, please
                share your project details below. All bookings are coordinated
                through {MODEL.agency}.
              </p>
            </Reveal>

            <div className="mt-10 space-y-5">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: MODEL.email,
                  href: `mailto:${MODEL.email}`,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: MODEL.phone,
                  href: `tel:${MODEL.phone.replace(/[^+\d]/g, "")}`,
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  value: MODEL.instagram,
                  href: `https://instagram.com/${MODEL.instagram.replace("@", "")}`,
                },
                {
                  icon: MapPin,
                  label: "Based in",
                  value: MODEL.location,
                },
              ].map((c, i) => (
                <Reveal key={c.label} delay={0.15 + i * 0.06}>
                  <a
                    href={c.href ?? undefined}
                    className="group flex items-center gap-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-background/20 transition-colors group-hover:bg-background group-hover:text-foreground">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[0.6rem] uppercase tracking-luxe text-background/50">
                        {c.label}
                      </span>
                      <span className="text-background transition-opacity group-hover:opacity-70">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              {submitted ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-sm border border-background/15 p-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background text-foreground">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-serif text-3xl">Thank you</h3>
                  <p className="mt-3 max-w-sm text-background/70">
                    Your booking request has been received. The agency will
                    respond within 48 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 rounded-full border-background/40 text-background hover:bg-background hover:text-foreground"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another request
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 rounded-sm border border-background/15 bg-background/[0.03] p-6 backdrop-blur-sm sm:p-8"
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name?.message}>
                      <Input
                        {...register("name")}
                        placeholder="Your name"
                        className="border-background/20 bg-transparent text-background placeholder:text-background/40 focus-visible:border-background"
                      />
                    </Field>
                    <Field label="Email" error={errors.email?.message}>
                      <Input
                        type="email"
                        {...register("email")}
                        placeholder="you@studio.com"
                        className="border-background/20 bg-transparent text-background placeholder:text-background/40 focus-visible:border-background"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Company / Publication" required={false}>
                      <Input
                        {...register("company")}
                        placeholder="Vogue, Chanel, …"
                        className="border-background/20 bg-transparent text-background placeholder:text-background/40 focus-visible:border-background"
                      />
                    </Field>
                    <Field
                      label="Project type"
                      error={errors.projectType?.message}
                    >
                      <select
                        {...register("projectType")}
                        className="h-10 w-full rounded-md border border-background/20 bg-transparent px-3 text-background focus:outline-none focus-visible:border-background"
                      >
                        <option value="" className="bg-foreground">
                          Select…
                        </option>
                        {PROJECT_TYPES.map((p) => (
                          <option key={p} value={p} className="bg-foreground">
                            {p}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Preferred date" required={false}>
                    <Input
                      type="date"
                      {...register("date")}
                      className="border-background/20 bg-transparent text-background placeholder:text-background/40 focus-visible:border-background [color-scheme:dark]"
                    />
                  </Field>

                  <Field label="Message" error={errors.message?.message}>
                    <Textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell us about the project, location, dates, and budget…"
                      className="resize-none border-background/20 bg-transparent text-background placeholder:text-background/40 focus-visible:border-background"
                    />
                  </Field>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-background py-6 text-sm uppercase tracking-wide-2 text-foreground hover:bg-background/90 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send booking request"
                    )}
                  </Button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  error,
  required = true,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.65rem] uppercase tracking-luxe text-background/60">
        {label}
        {required && <span className="text-background/40"> *</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs text-red-300">{error}</span>
      )}
    </label>
  );
}
