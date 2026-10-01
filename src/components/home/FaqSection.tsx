import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Are these real professionals or AI?",
    a: "Both, and always clearly labelled. AI Salahkars are specialist AI agents trained on professional domains (CA, CS, Legal, FEMA, Wealth and more). For high-stakes or complex matters you can escalate to a verified human professional, who sees your conversation context.",
  },
  {
    q: "How do WhatsApp, chat and call work?",
    a: "Start a consultation from the site. You can continue in web chat, open WhatsApp with your context prepared, or start a voice call. The same Salahkar stays with you across channels.",
  },
  {
    q: "What does a consultation cost?",
    a: "Each profile shows its consultation fee. Human professionals are booked in half-hour slots, and calls are metered per minute from your wallet, so you only pay for the time you use.",
  },
  {
    q: "Is my data secure?",
    a: "Consultations are treated as confidential professional conversations. See our Security and Privacy pages for encryption, access controls and DPDP-oriented practices.",
  },
  {
    q: "Can I get help with company incorporation or GST?",
    a: "Yes. Browse Services for business setup, income tax, GST, trademark, FEMA, ROC secretarial and more, each available as an AI or a human consultation.",
  },
  {
    q: "I'm a CA, CS or lawyer. How do I join?",
    a: "Apply from the For Professionals page. Once verified, you can launch a branded AI Salahkar, set your availability and rate, take escalations and track earnings in your partner dashboard.",
  },
];

export function FaqSection() {
  return (
    <section className="section-pad">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Questions, answered.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" className="font-medium text-accent hover:underline">
              Talk to our team
            </Link>
            .
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-border">
          {faqs.map((item, index) => (
            <AccordionItem key={item.q} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className="py-5 font-display text-[15px] font-semibold tracking-tight text-foreground hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pr-8 pb-5 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
