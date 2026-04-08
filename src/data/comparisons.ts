export interface ComparisonCategory {
  name: string
  providerA: string
  providerB: string
  winner: "A" | "B" | "tie"
}

export interface Comparison {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  providerA: { name: string; url: string; priceRange: string; rating: 1 | 2 | 3 | 4 | 5 }
  providerB: { name: string; url: string; priceRange: string; rating: 1 | 2 | 3 | 4 | 5 }
  introduction: string
  categories: ComparisonCategory[]
  verdict: string
  recommendation: string
  faqs: { question: string; answer: string }[]
}

export const comparisons: Comparison[] = [
  {
    slug: "barbri-vs-themis",
    title: "BARBRI vs Themis",
    metaTitle: "BARBRI vs Themis 2026: Which Bar Prep Is Better?",
    metaDescription: "Detailed comparison of BARBRI and Themis bar prep courses. We compare pricing, features, pass rates, and student experience to help you choose.",
    providerA: { name: "BARBRI", url: "https://www.barbri.com", priceRange: "$2,999 - $4,499", rating: 5 },
    providerB: { name: "Themis", url: "https://www.themisbar.com", priceRange: "$1,295 - $2,495", rating: 5 },
    introduction: "BARBRI and Themis are the two most popular bar prep courses in America. BARBRI is the established industry leader with 50+ years of history, while Themis is the tech-forward challenger offering comparable quality at a lower price point. This comparison will help you decide which is right for you.",
    categories: [
      { name: "Price", providerA: "$2,999-$4,499", providerB: "$1,295-$2,495", winner: "B" },
      { name: "Pass Rates", providerA: "Highest in industry", providerB: "Comparable to BARBRI", winner: "A" },
      { name: "Study Materials", providerA: "10,000+ questions, 100+ hrs video", providerB: "Comprehensive with adaptive tech", winner: "A" },
      { name: "Technology", providerA: "AI-powered study plans", providerB: "Adaptive learning algorithms", winner: "B" },
      { name: "Flexibility", providerA: "Online + in-person", providerB: "Online only", winner: "A" },
      { name: "Pass Guarantee", providerA: "Full refund or free repeat", providerB: "Free repeat course", winner: "A" },
      { name: "User Interface", providerA: "Functional but traditional", providerB: "Modern and clean", winner: "B" },
      { name: "Support", providerA: "24/7 + tutoring options", providerB: "Email + directed study", winner: "A" },
    ],
    verdict: "BARBRI wins on comprehensiveness, pass rates, and support. Themis wins on price, technology, and user experience. Both are excellent choices — your decision should come down to budget and learning preferences.",
    recommendation: "Choose BARBRI if you want the most comprehensive, structured program and budget isn't a concern. Choose Themis if you're comfortable with self-directed online study and want to save $1,000-$2,000.",
    faqs: [
      { question: "Is BARBRI worth the extra cost over Themis?", answer: "It depends on your learning style. BARBRI's additional materials and in-person options justify the cost for students who need maximum structure. However, Themis's pass rates are comparable, so price-conscious students can confidently choose Themis." },
      { question: "Which has better pass rates?", answer: "BARBRI historically claims the highest pass rates, but Themis's rates are very close. Both are significantly higher than the national average." },
      { question: "Can I switch from one to the other?", answer: "Most students commit to one course, but you can supplement either with tools like UWorld or AdaptiBar for additional MBE practice." },
    ],
  },
  {
    slug: "barbri-vs-kaplan",
    title: "BARBRI vs Kaplan",
    metaTitle: "BARBRI vs Kaplan Bar Prep 2026: Which Is Better?",
    metaDescription: "Compare BARBRI and Kaplan bar prep courses. Pricing, features, pass rates, and our recommendation for the best choice.",
    providerA: { name: "BARBRI", url: "https://www.barbri.com", priceRange: "$2,999 - $4,499", rating: 5 },
    providerB: { name: "Kaplan", url: "https://www.kaptest.com/bar-exam", priceRange: "$1,999 - $3,499", rating: 4 },
    introduction: "BARBRI and Kaplan are both established names in test preparation. BARBRI specializes exclusively in legal education, while Kaplan brings decades of general test prep expertise. Here's how they compare for bar exam preparation.",
    categories: [
      { name: "Price", providerA: "$2,999-$4,499", providerB: "$1,999-$3,499", winner: "B" },
      { name: "Pass Rates", providerA: "Highest in industry", providerB: "Above national average", winner: "A" },
      { name: "Study Materials", providerA: "Most comprehensive", providerB: "200+ hours of lectures", winner: "A" },
      { name: "Live Classes", providerA: "Available (select plans)", providerB: "Live online workshops", winner: "B" },
      { name: "Question Bank", providerA: "10,000+ questions", providerB: "Smart Qbank with adaptive tech", winner: "A" },
      { name: "Pass Guarantee", providerA: "Full refund or repeat", providerB: "Refund with qualifying score", winner: "A" },
    ],
    verdict: "BARBRI is the stronger choice for most students due to superior materials and pass rates. Kaplan is a viable alternative for those who want live online classes at a lower price.",
    recommendation: "Choose BARBRI for the most comprehensive preparation. Choose Kaplan if you prefer live online instruction and want to save on cost.",
    faqs: [
      { question: "Is Kaplan's bar prep as good as their other test prep courses?", answer: "Kaplan's bar prep is solid but doesn't dominate the market like their MCAT or LSAT courses. BARBRI is more specialized in legal education." },
      { question: "Does Kaplan have in-person classes?", answer: "Kaplan offers live online classes but has scaled back in-person options. BARBRI offers both in select markets." },
    ],
  },
  {
    slug: "themis-vs-uworld",
    title: "Themis vs UWorld",
    metaTitle: "Themis vs UWorld MBE 2026: Full Course vs MBE Supplement",
    metaDescription: "Compare Themis full bar prep course with UWorld MBE supplement. Understand when to use each and whether you need both.",
    providerA: { name: "Themis", url: "https://www.themisbar.com", priceRange: "$1,295 - $2,495", rating: 5 },
    providerB: { name: "UWorld", url: "https://www.uworld.com/mbe", priceRange: "$599 - $999", rating: 4 },
    introduction: "Themis and UWorld serve different roles in bar prep. Themis is a full-service bar review course, while UWorld is a specialized MBE question bank. Many students use both together for maximum preparation.",
    categories: [
      { name: "Scope", providerA: "Full bar prep (MBE + MEE + MPT)", providerB: "MBE only", winner: "A" },
      { name: "Price", providerA: "$1,295-$2,495", providerB: "$599-$999", winner: "B" },
      { name: "MBE Questions", providerA: "Included in course", providerB: "2,000+ with detailed explanations", winner: "B" },
      { name: "Essay Prep", providerA: "Full essay preparation", providerB: "Not included", winner: "A" },
      { name: "Study Plan", providerA: "Directed study program", providerB: "Self-directed practice", winner: "A" },
      { name: "Explanations", providerA: "Standard explanations", providerB: "Best-in-class with visuals", winner: "B" },
    ],
    verdict: "These aren't direct competitors — they complement each other. Themis provides the complete bar prep experience, while UWorld offers the best MBE practice questions.",
    recommendation: "Use Themis as your primary bar prep course. Add UWorld if you want additional MBE practice with superior explanations. The combination is powerful and still cheaper than BARBRI alone.",
    faqs: [
      { question: "Do I need both Themis and UWorld?", answer: "Not necessarily. Themis alone is sufficient for most students. UWorld is an excellent supplement if you want extra MBE practice." },
      { question: "Can I use UWorld as my only bar prep?", answer: "No. UWorld only covers MBE. You need a full-service course for MEE and MPT preparation." },
    ],
  },
  {
    slug: "lawline-vs-nbi",
    title: "Lawline vs NBI",
    metaTitle: "Lawline vs NBI 2026: Best CLE Providers Compared",
    metaDescription: "Compare Lawline and NBI for continuing legal education. Pricing, accreditation, course quality, and which is best for your CLE needs.",
    providerA: { name: "Lawline", url: "https://www.lawline.com", priceRange: "$29/mo - $399/yr", rating: 5 },
    providerB: { name: "NBI", url: "https://www.nbi-sems.com", priceRange: "$49/course - $499/yr", rating: 4 },
    introduction: "Lawline and NBI are two of the largest CLE providers in the United States. Both offer extensive course catalogs for attorneys needing to fulfill their continuing legal education requirements. Here's how they compare.",
    categories: [
      { name: "Course Catalog", providerA: "1,800+ courses", providerB: "1,500+ courses", winner: "A" },
      { name: "Pricing", providerA: "$29/mo or $399/yr", providerB: "$49/course or $499/yr", winner: "A" },
      { name: "State Coverage", providerA: "All 50 states", providerB: "All 50 states", winner: "tie" },
      { name: "Format", providerA: "On-demand + live webinars", providerB: "On-demand + in-person seminars", winner: "tie" },
      { name: "Platform Quality", providerA: "Modern, user-friendly", providerB: "Functional, traditional", winner: "A" },
      { name: "Practice Areas", providerA: "30+ practice areas", providerB: "25+ practice areas", winner: "A" },
    ],
    verdict: "Lawline is the better choice for most attorneys due to its lower pricing, larger catalog, and more modern platform. NBI is a good alternative for those who prefer in-person seminars.",
    recommendation: "Choose Lawline for the best online CLE experience and value. Choose NBI if you prefer in-person learning or if NBI offers specific courses in your practice area.",
    faqs: [
      { question: "Are Lawline courses accredited in my state?", answer: "Lawline offers courses accredited in all 50 states. Check their website to filter courses by your specific state's requirements." },
      { question: "Can I earn all my CLE credits through one provider?", answer: "In most states, yes. Both Lawline and NBI offer enough courses to fulfill complete CLE requirements in all jurisdictions." },
    ],
  },
  {
    slug: "best-online-cle-providers",
    title: "Best Online CLE Providers",
    metaTitle: "Best Online CLE Providers 2026: Top 5 Compared",
    metaDescription: "Compare the best online CLE providers for 2026. Lawline, NBI, PLI, BARBRI CLE, and Quimbee reviewed and ranked.",
    providerA: { name: "Lawline", url: "https://www.lawline.com", priceRange: "$29/mo - $399/yr", rating: 5 },
    providerB: { name: "Multiple Providers", url: "#", priceRange: "Varies", rating: 4 },
    introduction: "Finding the right online CLE provider can save you time and money while keeping your license in good standing. We've compared the top 5 online CLE providers to help you choose.",
    categories: [
      { name: "Best Overall", providerA: "Lawline", providerB: "Most comprehensive catalog and best value", winner: "A" },
      { name: "Best for Seminars", providerA: "NBI", providerB: "Strong in-person and live options", winner: "B" },
      { name: "Best for Depth", providerA: "PLI", providerB: "Expert-level courses from practitioners", winner: "B" },
      { name: "Best Budget", providerA: "Quimbee CLE", providerB: "Affordable with growing catalog", winner: "B" },
      { name: "Best for Big Law", providerA: "PLI", providerB: "Premium courses for specialized practice", winner: "B" },
    ],
    verdict: "Lawline is the best overall choice for most attorneys. NBI excels in live seminars, PLI is best for specialized practice areas, and Quimbee offers the most budget-friendly option.",
    recommendation: "Start with Lawline's monthly plan to see if it meets your needs. If you need specialized content, consider PLI. Budget-conscious attorneys should look at Quimbee.",
    faqs: [
      { question: "Which CLE provider has the most courses?", answer: "Lawline leads with 1,800+ courses, followed by NBI with 1,500+ courses. PLI has fewer but more specialized programs." },
      { question: "Can I get free CLE credits online?", answer: "Yes, many providers offer free courses periodically. Check our guide to free CLE credits for more options." },
    ],
  },
]

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug)
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug)
}
