export type Testimonial = {
  id: string;
  name: string;
  location: string;
  businessType: string;
  agentName: string;
  agentType: string;
  rating: number;
  content: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Rajesh Sharma",
    location: "Mumbai",
    businessType: "E-commerce Startup",
    agentName: "Arjun",
    agentType: "CA",
    rating: 5,
    content:
      "Arjun, the AI CA agent, transformed our startup's compliance. Within minutes of sharing our GST challenges via WhatsApp, I received a clear action plan—ITC reconciliation, pending return filing strategy, and penalty mitigation. Filed 8 pending returns in 48 hours. The 24/7 availability and instant responses saved us from ₹3L in late fees. It's like having a senior CA on call anytime!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=RajeshSharma",
  },
  {
    id: "test-2",
    name: "Priya Menon",
    location: "Bangalore",
    businessType: "SaaS Company",
    agentName: "Sneha",
    agentType: "CS",
    rating: 5,
    content:
      "We were drowning in ROC compliance and board meeting documentation. Sneha, the AI CS agent, stepped in like a pro. She drafted 12 board resolutions for our funding round, filed AOC-4/MGT-7 on time, and guided us through share allotment filings—all via simple chat. No more waiting for email replies or chasing consultants. Accurate, fast, and incredibly cost-effective.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaMenon",
  },
  {
    id: "test-3",
    name: "Amit Gupta",
    location: "Delhi",
    businessType: "Manufacturing MSME",
    agentName: "Vikram",
    agentType: "Lawyer",
    rating: 5,
    content:
      "When our supplier contract dispute escalated, I reached out to Vikram, the AI corporate lawyer. He reviewed the 20-page vendor agreement, flagged unfavorable clauses, and drafted a strong legal notice—all within 2 hours on a Sunday night! His instant availability and clear legal reasoning gave us the confidence to negotiate better terms. Saved us ₹15L in potential losses.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmitGupta",
  },
  {
    id: "test-4",
    name: "Kavita Reddy",
    location: "Hyderabad",
    businessType: "Real Estate Buyer",
    agentName: "Maya",
    agentType: "Real Estate",
    rating: 5,
    content:
      "Buying my first property was stressful until I connected with Maya, the AI real estate consultant. She verified the 30-year title chain, flagged an encumbrance issue, and advised on RERA compliance—all via WhatsApp in 48 hours. Her stamp duty calculation and sale deed review gave me complete peace of mind. I saved ₹2L by catching hidden costs. Highly recommend!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=KavitaReddy",
  },
  {
    id: "test-5",
    name: "Sanjay Deshmukh",
    location: "Pune",
    businessType: "Freelance Consultant",
    agentName: "Aditi",
    agentType: "Wealth",
    rating: 5,
    content:
      "Aditi, the AI wealth advisor, changed my financial life. I shared my goal of retiring at 50 with ₹5 Cr, and she designed a complete plan—SIP allocation, tax-saving strategies (80C, NPS), and portfolio rebalancing alerts. Her 24/7 availability means I can ask investment questions anytime. In 6 months, my portfolio is up 18% and I'm finally confident about my financial future.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SanjayDeshmukh",
  },
  {
    id: "test-6",
    name: "Neha Kapoor",
    location: "Chennai",
    businessType: "Tech Startup",
    agentName: "Ira",
    agentType: "Lawyer",
    rating: 5,
    content:
      "Protecting our brand was critical. Ira, the AI IP lawyer, conducted a trademark search, identified conflicts, and filed our TM application—all in 24 hours. She also drafted airtight IP assignment agreements for our developers. Her expertise in patent and copyright gave us confidence to innovate fearlessly. Best part? Available via WhatsApp call anytime. Game-changer for IP protection!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=NehaKapoor",
  },
];

export function getTestimonialsByAgent(agentSlug: string): Testimonial[] {
  const agentName = agentSlug.split("-")[0];
  const capitalizedName = agentName.charAt(0).toUpperCase() + agentName.slice(1);
  return testimonials.filter((t) => t.agentName === capitalizedName);
}
