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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    const subject = encodeURIComponent(
      `Inquiry from ${data.firstName} ${data.lastName}`
    );

    const body = encodeURIComponent(
      `Name: ${data.firstName} ${data.lastName}\n` +
      `Email: ${data.email}\n\n` +
      `Message:\n${data.message}`
    );

    const mailtoLink = `mailto:support@exqusitebnb.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center bg-charcoal">
          <div className="container mx-auto px-6 lg:px-12 text-center max-w-lg">
            <div className="animate-fade-in space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-forest/30 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-gold" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif text-cream">
                Message Received
              </h1>
              <p className="text-cream-muted leading-relaxed">
                Thank you for reaching out! We've received your message and will
                get back to you as soon as possible. In the meantime, feel free
                to browse our properties or check out our FAQs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="luxuryOutline" asChild>
                  <Link to="/properties">View Properties</Link>
                </Button>
                <Button variant="ghost" className="text-gold" asChild>
                  <Link to="/faqs">Read FAQs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4 animate-fade-in">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream mb-6 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-cream-muted text-lg max-w-2xl mx-auto animate-fade-in">
            Have a question or special request? We'd love to hear from you. Fill
            out the form below and we'll get back to you shortly.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-24 bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12 max-w-xl luxury-text-glow">
          <div className="p-8 lg:p-12 bg-card">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cream text-sm">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                            className="bg-charcoal-light border-border text-cream placeholder:text-cream-muted/50 focus:border-gold"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cream text-sm">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            className="bg-charcoal-light border-border text-cream placeholder:text-cream-muted/50 focus:border-gold"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cream text-sm">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          className="bg-charcoal-light border-border text-cream placeholder:text-cream-muted/50 focus:border-gold"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cream text-sm">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can we help you?"
                          rows={5}
                          {...field}
                          className="bg-charcoal-light border-border text-cream placeholder:text-cream-muted/50 focus:border-gold resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="luxuryGold"
                  size="lg"
                  className="w-full"
                  disabled={false}
                >
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Open Email App
                  </>
                </Button>
              </form>
            </Form>

            <p className="text-cream-muted text-xs text-center mt-6">
              For booking inquiries, please complete your reservation through
              our partner platforms (Airbnb, VRBO, or Booking.com).
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
