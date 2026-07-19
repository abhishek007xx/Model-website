"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Instagram, MapPin, Loader2, Check, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MODEL } from "./data";
import { SplitText } from "./split-text";
import { Magnetic } from "./magnetic";
import { GlassHover } from "./micro-interactions";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  date: z.string().optional(),
  message: z.string().min(10, "Please tell us a little more (min 10 characters)"),
});

type FormValues = z.infer<typeof schema>;

const PROJECT_TYPES = ["Editorial", "Runway", "Campaign", "Film & Motion", "Other"];

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
    defaultValues: { name: "", email: "", company: "", projectType: "", date: "", message: "" },
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
      toast({ title: "Booking request sent", description: "The agency will be in touch within 48 hours." });
      reset();
    } catch {
      toast({ variant: "destructive", title: "Something went wrong", description: "Please try again or email us directly." });
    }
  };

  return (
    <section id="contact" className="grain mesh-bg relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* Section label */}
        <div className="mb-12 flex items-center justify-between border-b border-paper/15 pb-4">
          <SplitText as="span" mode="words" className="font-sans text-[0.6rem] uppercase tracking-luxe text-paper/50">
            Contact — 06
          </SplitText>
          <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/40">
            {MODEL.issue} · {MODEL.season}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — info */}
          <div className="lg:col-span-5">
            <SplitText as="span" mode="words" className="mb-4 block font-sans text-[0.6rem] uppercase tracking-luxe text-paper/50">
              Booking
            </SplitText>
            <h2 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl">
              <SplitText as="span" mode="chars" stagger={0.035} duration={1.1} className="block">
                Book Mizuhara
              </SplitText>
            </h2>
            <SplitText as="p" mode="lines" delay={0.2} stagger={0.08} className="mt-6 max-w-md text-paper/70">
              For editorial, runway, campaign, and film enquiries, share your project details below. All bookings are coordinated through {MODEL.agency}.
            </SplitText>

            {/* Contact links with glass hover */}
            <div className="mt-10 space-y-3">
              {[
                { icon: Mail, label: "Email", value: MODEL.email, href: `mailto:${MODEL.email}` },
                { icon: Phone, label: "Phone", value: MODEL.phone, href: `tel:${MODEL.phone.replace(/[^+\d]/g, "")}` },
                { icon: Instagram, label: "Instagram", value: MODEL.instagram, href: `https://instagram.com/${MODEL.instagram.replace("@", "")}` },
                { icon: MapPin, label: "Based in", value: MODEL.location },
              ].map((c) => (
                <Magnetic key={c.label} strength={0.1}>
                  <a
                    href={c.href ?? undefined}
                    className="group flex items-center justify-between border-b border-paper/10 pb-4 transition-colors hover:border-paper/30"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/25 transition-all duration-500 group-hover:bg-paper group-hover:text-ink">
                        <c.icon className="h-4 w-4" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/45">{c.label}</span>
                        <span className="font-serif text-lg text-paper transition-opacity group-hover:opacity-70">{c.value}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-paper/40 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-champagne" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <GlassHover className="flex h-full min-h-[460px] flex-col items-center justify-center border border-paper/15 p-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper text-ink">
                  <Check className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-serif text-3xl">Thank you</h3>
                <p className="mt-3 max-w-sm text-paper/70">
                  Your booking request has been received. The agency will respond within 48 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-8 rounded-full border-paper/40 text-paper hover:bg-paper hover:text-ink"
                  onClick={() => setSubmitted(false)}
                >
                  Send another request
                </Button>
              </GlassHover>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-dark space-y-6 rounded-sm border border-paper/15 p-6 sm:p-8"
                noValidate
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Full name" error={errors.name?.message}>
                    <Input {...register("name")} placeholder="Your name" className="border-paper/20 bg-transparent text-paper placeholder:text-paper/35 focus-visible:border-paper" />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <Input type="email" {...register("email")} placeholder="you@studio.com" className="border-paper/20 bg-transparent text-paper placeholder:text-paper/35 focus-visible:border-paper" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Company / Publication" required={false}>
                    <Input {...register("company")} placeholder="Vogue, Chanel, …" className="border-paper/20 bg-transparent text-paper placeholder:text-paper/35 focus-visible:border-paper" />
                  </Field>
                  <Field label="Project type" error={errors.projectType?.message}>
                    <select {...register("projectType")} className="h-10 w-full rounded-md border border-paper/20 bg-transparent px-3 text-paper focus:outline-none focus-visible:border-paper">
                      <option value="" className="bg-ink">Select…</option>
                      {PROJECT_TYPES.map((p) => (<option key={p} value={p} className="bg-ink">{p}</option>))}
                    </select>
                  </Field>
                </div>
                <Field label="Preferred date" required={false}>
                  <Input type="date" {...register("date")} className="border-paper/20 bg-transparent text-paper placeholder:text-paper/35 focus-visible:border-paper [color-scheme:dark]" />
                </Field>
                <Field label="Message" error={errors.message?.message}>
                  <Textarea {...register("message")} rows={5} placeholder="Tell us about the project, location, dates, and budget…" className="resize-none border-paper/20 bg-transparent text-paper placeholder:text-paper/35 focus-visible:border-paper" />
                </Field>

                {/* Magnetic submit button */}
                <Magnetic strength={0.3}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-glow flex w-full items-center justify-center gap-2 rounded-full bg-paper py-4 font-sans text-[0.65rem] uppercase tracking-wide-2 text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send booking request"
                    )}
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children, error, required = true }: { label: string; children: React.ReactNode; error?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/55">
        {label}{required && <span className="text-paper/30"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-300">{error}</span>}
    </label>
  );
}
