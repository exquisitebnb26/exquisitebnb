import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { useContent } from "@/lib/content";

const contactSchema = z.object({
  inquiryType: z.enum(["Book a Stay", "Partnership Inquiry", "General Inquiry"], { required_error: "Please select an inquiry type" }),
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(100, "Email must be less than 100 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { content, isLoading } = useContent();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { inquiryType: "General Inquiry", firstName: "", lastName: "", email: "", message: "" },
  });

  const contact = content?.contact;
  const site = content?.site;
  if (isLoading || !contact || !site) {
    return null;
  }

  const onSubmit = (data: ContactFormData) => {
    const subject = encodeURIComponent(`${data.inquiryType} — ${data.firstName} ${data.lastName}`);
    const body = encodeURIComponent(
      `Hello Exquisitebnb Team,\n\nMy name is ${data.firstName} ${data.lastName}, and I'm reaching out regarding a ${data.inquiryType.toLowerCase()}.\n\nMessage:\n${data.message}\n\nContact Details:\nEmail: ${data.email}\n\nThank you for your time and consideration.\n\nWarm regards,\n${data.firstName} ${data.lastName}`
    );
    window.location.href = `mailto:${site.supportEmail}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center bg-cream-warm dark:bg-charcoal">
          <div className="container mx-auto px-6 lg:px-12 text-center max-w-lg">
            <ScrollReveal variant="fade-up" duration={900}>
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-[hsl(var(--forest-dark))]/20 dark:bg-forest/30 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[hsl(var(--forest-dark))] dark:text-gold" />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream">{contact.successTitle}</h1>
                <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed">{contact.successText}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button variant="luxuryOutline" asChild><Link to="/properties">View Properties</Link></Button>
                  <Button variant="ghost" className="text-[hsl(var(--forest-dark))] dark:text-gold" asChild><Link to="/faqs">Read FAQs</Link></Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-cream-warm dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal variant="fade-in" duration={900} delay={100}>
            <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">{contact.header.label}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={1000} delay={250}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">{contact.header.title}</h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={900} delay={400}>
            <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-lg max-w-2xl mx-auto">{contact.header.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12 max-w-xl">
          <ScrollReveal variant="fade-up" duration={900} delay={200}>
            <div className="p-8 lg:p-12 bg-cream dark:bg-card transition-all duration-700 ease-out will-change-[transform,box-shadow] animate-forestGlow dark:animate-none dark:shadow-[0_0_22px_rgba(212,175,55,0.35)] hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.45)] dark:hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="inquiryType" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[hsl(var(--forest-dark))] dark:text-cream text-sm">Inquiry Type</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <select {...field} className="w-full appearance-none rounded-none px-4 py-3 bg-cream text-[hsl(var(--forest-dark))] border border-[hsl(var(--forest-dark))] focus:outline-none focus:ring-0 focus:border-[hsl(var(--forest-dark))] transition-all duration-500 ease-out hover:shadow-[0_0_18px_hsl(var(--forest-dark)_/_0.35)] dark:bg-charcoal-light dark:text-cream dark:border-border dark:focus:border-gold dark:hover:shadow-[0_0_22px_rgba(212,175,55,0.35)] cursor-pointer">
                            <option className="bg-cream text-[hsl(var(--forest-dark))] dark:bg-charcoal dark:text-cream">Book a Stay</option>
                            <option className="bg-cream text-[hsl(var(--forest-dark))] dark:bg-charcoal dark:text-cream">Partnership Inquiry</option>
                            <option className="bg-cream text-[hsl(var(--forest-dark))] dark:bg-charcoal dark:text-cream">General Inquiry</option>
                          </select>
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--forest-dark))] dark:text-gold text-sm">▾</span>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[hsl(var(--forest-dark))] dark:text-cream text-sm">First Name</FormLabel>
                        <FormControl><Input placeholder="John" {...field} className="bg-cream border-[hsl(var(--forest-dark))] text-[hsl(var(--forest-dark))] placeholder:text-[hsl(var(--forest-dark))]/40 focus:border-[hsl(var(--forest-dark))] dark:bg-charcoal-light dark:border-border dark:text-cream dark:placeholder:text-cream-muted/50 dark:focus:border-gold" /></FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[hsl(var(--forest-dark))] dark:text-cream text-sm">Last Name</FormLabel>
                        <FormControl><Input placeholder="Doe" {...field} className="bg-cream border-[hsl(var(--forest-dark))] text-[hsl(var(--forest-dark))] placeholder:text-[hsl(var(--forest-dark))]/40 focus:border-[hsl(var(--forest-dark))] dark:bg-charcoal-light dark:border-border dark:text-cream dark:placeholder:text-cream-muted/50 dark:focus:border-gold" /></FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[hsl(var(--forest-dark))] dark:text-cream text-sm">Email</FormLabel>
                      <FormControl><Input type="email" placeholder="john@example.com" {...field} className="bg-cream border-[hsl(var(--forest-dark))] text-[hsl(var(--forest-dark))] placeholder:text-[hsl(var(--forest-dark))]/40 focus:border-[hsl(var(--forest-dark))] dark:bg-charcoal-light dark:border-border dark:text-cream dark:placeholder:text-cream-muted/50 dark:focus:border-gold" /></FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[hsl(var(--forest-dark))] dark:text-cream text-sm">Message</FormLabel>
                      <FormControl><Textarea placeholder="How can we help you?" rows={5} {...field} className="bg-cream border-[hsl(var(--forest-dark))] text-[hsl(var(--forest-dark))] placeholder:text-[hsl(var(--forest-dark))]/40 focus:border-[hsl(var(--forest-dark))] dark:bg-charcoal-light dark:border-border dark:text-cream dark:placeholder:text-cream-muted/50 dark:focus:border-gold resize-none" /></FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )} />

                  <Button type="submit" variant="luxuryGold" size="lg" className="w-full transition-all duration-500 ease-out hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.45)] dark:hover:shadow-[0_0_30px_rgba(212,175,55,0.45)]">
                    <Send className="w-4 h-4 mr-2" /> Open Email App
                  </Button>
                </form>
              </Form>

              <p className="text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted text-xs text-center mt-6">
                {contact.formNote}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
