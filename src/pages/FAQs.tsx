import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book a stay?",
    answer:
      "Booking is easy! Browse our properties, choose your favorite, and click 'Check Availability' to see dates. Then, complete your booking securely through one of our trusted partner platforms: Airbnb, VRBO, or Booking.com. Each platform handles reservations, payments, and provides their own protection policies.",
  },
  {
    question: "Which platforms do you use for bookings?",
    answer:
      "We list our properties on Airbnb, VRBO, and Booking.com. These trusted platforms handle all reservations, payments, and provide guest protection. You can choose whichever platform you prefer—availability and pricing are synced across all three.",
  },
  {
    question: "How is cleanliness handled?",
    answer:
      "Cleanliness is our top priority. Every property undergoes thorough professional cleaning between guests using hotel-level protocols. Fresh linens, sanitized surfaces, and careful attention to every detail ensure you arrive to a sparkling, welcoming space. We also provide premium toiletries and supplies.",
  },
  {
    question: "What is the check-in and check-out process?",
    answer:
      "We offer seamless self check-in with detailed instructions sent before your arrival. Most properties feature smart locks or secure lockboxes for easy access at any hour. Check-in is typically 3 PM and check-out is 11 AM, though we're happy to accommodate early arrivals or late departures when possible.",
  },
  {
    question: "What amenities are included?",
    answer:
      "All properties include high-speed WiFi, premium linens and towels, fully-equipped kitchens, quality toiletries, coffee and tea, and streaming services. Many also offer parking, air conditioning, washer/dryer, and workspace setups. Specific amenities vary by property and are detailed on each listing.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation policies are set on each booking platform (Airbnb, VRBO, Booking.com) and may vary slightly by property. Generally, we offer flexible or moderate cancellation terms. Full details are always visible before you confirm your booking on the respective platform.",
  },
  {
    question: "How can I reach the host during my stay?",
    answer:
      "We're always just a message away! You can reach us through the booking platform's messaging system, and we aim to respond within 30 minutes during daytime hours. For urgent matters, we provide a direct phone number after booking. We genuinely want to ensure you have everything you need.",
  },
  {
    question: "Are pets allowed?",
    answer:
      "Pet policies vary by property. Some of our spaces are pet-friendly (with a small pet fee), while others are pet-free to accommodate guests with allergies. Check the specific property listing for pet policy details, and feel free to reach out with any questions.",
  },
  {
    question: "Is parking available?",
    answer:
      "Many of our properties include free parking—this is noted on each listing. For properties without dedicated parking, we provide detailed information about nearby parking options, including street parking and local garages.",
  },
  {
    question: "Can I host events or gatherings?",
    answer:
      "Some of our larger properties can accommodate small, quiet gatherings with prior approval. However, parties and events are generally not permitted to ensure the comfort of neighbors and the integrity of the space. Please reach out to discuss your specific needs.",
  },
];

const FAQs = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4 animate-fade-in">
            Questions Answered
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream mb-6 animate-fade-in">
            Frequently Asked Questions
          </h1>
          <p className="text-cream-muted text-lg max-w-2xl mx-auto animate-fade-in">
            Everything you need to know about staying with Exquisitebnb. Can't
            find your answer? Feel free to reach out—we're happy to help.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24 bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-sm px-6
                  transition-all duration-500 ease-out
                  hover:border-gold
                  hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]
                  hover:-translate-y-1
                  data-[state=open]:border-gold"
              >
                <AccordionTrigger
                  className="text-left font-serif text-cream py-6
                    transition-all duration-300
                    hover:text-gold
                    hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]
                    hover:no-underline"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-cream-muted leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-cream-muted mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="/contact"
            className="text-gold font-serif text-lg
              transition-all duration-300
              hover:text-gold-muted
              hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"
          >
            Contact Us →
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default FAQs;
