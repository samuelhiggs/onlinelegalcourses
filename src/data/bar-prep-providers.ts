export interface BarPrepProvider {
  name: string
  slug: string
  description: string
  overview: string
  priceRange: string
  format: string
  passGuarantee: boolean
  passGuaranteeDetails: string | null
  bestFor: string
  rating: 1 | 2 | 3 | 4 | 5
  url: string
  pros: string[]
  cons: string[]
  features: string[]
  pricing: { plan: string; price: string; details: string }[]
  verdict: string
}

export const barPrepProviders: BarPrepProvider[] = [
  {
    name: "BARBRI",
    slug: "barbri",
    description: "The gold standard in bar prep with 50+ years of proven results and the highest pass rates in the industry.",
    overview: "BARBRI has been the leading bar prep provider for over five decades, helping more than 1.3 million lawyers pass the bar exam. Their comprehensive program includes video lectures from top law professors, extensive practice materials, and a personalized study plan powered by AI technology. BARBRI is widely regarded as the most thorough and structured bar prep course available, with pass rates that consistently exceed the national average.",
    priceRange: "$2,999 - $4,499",
    format: "Online + In-Person",
    passGuarantee: true,
    passGuaranteeDetails: "Full refund or free repeat if you complete the program and don't pass",
    bestFor: "Students who want the most comprehensive, structured program",
    rating: 5,
    url: "https://www.barbri.com",
    pros: [
      "Highest pass rates in the industry",
      "Most comprehensive study materials",
      "Personalized AI-powered study plans",
      "Full money-back guarantee",
      "Largest alumni network",
      "Available for all UBE and state-specific jurisdictions",
    ],
    cons: [
      "Most expensive option",
      "Can feel overwhelming with amount of material",
      "Less flexibility for self-directed learners",
    ],
    features: [
      "10,000+ practice questions",
      "Over 100 hours of video lectures",
      "Personalized study plan with AI",
      "Simulated MBE, MEE, and MPT exams",
      "Mobile app for studying on the go",
      "Essay grading by attorneys",
    ],
    pricing: [
      { plan: "Bar Review", price: "$2,999", details: "Core bar prep course" },
      { plan: "Bar Review + 1L-3L", price: "$3,999", details: "Includes law school supplements" },
      { plan: "Ultimate", price: "$4,499", details: "All features + private tutoring" },
    ],
    verdict: "BARBRI remains the top choice for bar prep. While it's the most expensive option, the comprehensive materials, proven track record, and pass guarantee make it a worthwhile investment for most bar exam takers. If budget isn't a concern, BARBRI is the safest bet.",
  },
  {
    name: "Themis",
    slug: "themis",
    description: "Affordable, tech-forward bar prep built by law professors with adaptive learning technology.",
    overview: "Themis Bar Review was founded in 2010 by law professors who wanted to create a more modern, accessible bar prep course. Known for its competitive pricing and technology-driven approach, Themis uses adaptive learning to tailor the study experience to each student's strengths and weaknesses. Despite being significantly cheaper than BARBRI, Themis has achieved comparable pass rates and has quickly become the second most popular bar prep course in the country.",
    priceRange: "$1,295 - $2,495",
    format: "Online",
    passGuarantee: true,
    passGuaranteeDetails: "Free repeat course if you don't pass on the first attempt",
    bestFor: "Budget-conscious students who prefer online learning",
    rating: 5,
    url: "https://www.themisbar.com",
    pros: [
      "Significantly more affordable than BARBRI",
      "Adaptive learning technology",
      "Created by law professors",
      "High pass rates comparable to BARBRI",
      "Clean, modern interface",
      "Directed study program keeps you on track",
    ],
    cons: [
      "Online only — no in-person option",
      "Smaller question bank than BARBRI",
      "Less brand recognition",
    ],
    features: [
      "Adaptive learning algorithms",
      "Directed study program",
      "Video lectures by law professors",
      "Practice essays with model answers",
      "MBE question bank",
      "Performance analytics dashboard",
    ],
    pricing: [
      { plan: "UBE Course", price: "$1,295", details: "Standard UBE preparation" },
      { plan: "UBE + Extras", price: "$1,795", details: "Additional practice questions and lectures" },
      { plan: "Premium", price: "$2,495", details: "All features + tutoring hours" },
    ],
    verdict: "Themis is the best value in bar prep. It offers a comprehensive, technology-driven study experience at a fraction of the cost of competitors. If you're a self-motivated learner comfortable with online study, Themis is an excellent choice.",
  },
  {
    name: "Kaplan",
    slug: "kaplan",
    description: "Flexible bar prep from a trusted name in test preparation with both live and self-paced options.",
    overview: "Kaplan Bar Review leverages decades of test prep expertise to offer a flexible bar exam preparation course. Known for their adaptive Qbank technology and variety of study formats, Kaplan provides options for students who need both structured and self-directed learning paths. Their comprehensive program includes live online classes, on-demand lectures, and an extensive practice question database.",
    priceRange: "$1,999 - $3,499",
    format: "Online + Live Online",
    passGuarantee: true,
    passGuaranteeDetails: "Free repeat or tuition refund with qualifying score",
    bestFor: "Students who want live instruction with flexible scheduling",
    rating: 4,
    url: "https://www.kaptest.com/bar-exam",
    pros: [
      "Live online class options",
      "Trusted brand with test prep expertise",
      "Adaptive Qbank technology",
      "Flexible study schedules",
      "Good mobile experience",
    ],
    cons: [
      "Higher price than Themis",
      "Interface can feel dated",
      "Less specialized in bar prep vs. general test prep",
    ],
    features: [
      "Smart Qbank with adaptive practice",
      "Live online workshop sessions",
      "200+ hours of on-demand lectures",
      "Practice MBE, MEE, and MPT questions",
      "Detailed performance tracking",
      "Mobile app access",
    ],
    pricing: [
      { plan: "Self-Paced", price: "$1,999", details: "On-demand access to all materials" },
      { plan: "Live Online", price: "$2,799", details: "Includes live class sessions" },
      { plan: "Premium", price: "$3,499", details: "Live classes + private tutoring" },
    ],
    verdict: "Kaplan is a solid mid-range bar prep option. Their live online classes are a standout feature, and the adaptive Qbank provides excellent practice. A good choice for students who prefer some structure but with more flexibility than BARBRI.",
  },
  {
    name: "UWorld",
    slug: "uworld",
    description: "Practice-focused bar prep with the highest-rated MBE question bank and detailed explanations.",
    overview: "UWorld MBE is focused on providing the highest quality practice questions for the Multistate Bar Examination. Known for their incredibly detailed answer explanations and visual learning aids, UWorld has earned a reputation as the best MBE Qbank available. While they don't offer a full-service bar prep course, their MBE preparation is considered best-in-class by many bar exam takers.",
    priceRange: "$599 - $999",
    format: "Online (MBE-focused)",
    passGuarantee: false,
    passGuaranteeDetails: null,
    bestFor: "Students who want the best MBE practice questions",
    rating: 4,
    url: "https://www.uworld.com/mbe",
    pros: [
      "Highest-rated MBE question bank",
      "Incredibly detailed explanations",
      "Visual learning aids and diagrams",
      "Affordable compared to full courses",
      "Excellent performance analytics",
    ],
    cons: [
      "MBE-focused only — not a complete bar prep",
      "No essay or MPT preparation",
      "Must supplement with other materials",
    ],
    features: [
      "2,000+ MBE-style questions",
      "Detailed answer explanations",
      "Visual diagrams and charts",
      "Performance tracking by subject",
      "Customizable practice exams",
      "Mobile-responsive platform",
    ],
    pricing: [
      { plan: "3-Month Access", price: "$599", details: "Full Qbank access for 3 months" },
      { plan: "6-Month Access", price: "$799", details: "Extended access with additional features" },
      { plan: "12-Month Access", price: "$999", details: "Full year of access" },
    ],
    verdict: "UWorld is the best supplementary MBE tool available. Their questions and explanations are unmatched. However, you'll need a full-service prep course alongside UWorld for complete bar exam preparation.",
  },
  {
    name: "Quimbee",
    slug: "quimbee",
    description: "Budget-friendly bar prep with clear, concise video lessons and a modern learning platform.",
    overview: "Quimbee Bar Review offers an affordable alternative to traditional bar prep courses. Known for their clear, concise teaching style and modern platform, Quimbee provides video lessons, practice questions, and study tools at a price point that makes bar prep accessible to all law students. Their course is designed to be efficient, cutting through unnecessary material to focus on what's most likely to appear on the exam.",
    priceRange: "$799 - $1,249",
    format: "Online",
    passGuarantee: true,
    passGuaranteeDetails: "Free repeat if you don't pass",
    bestFor: "Budget-conscious students who want a streamlined approach",
    rating: 4,
    url: "https://www.quimbee.com/bar-review",
    pros: [
      "Very affordable",
      "Clear, concise video lessons",
      "Modern, easy-to-use platform",
      "Efficient study approach",
      "Pass guarantee included",
    ],
    cons: [
      "Newer to bar prep market",
      "Smaller question bank",
      "Less comprehensive than BARBRI/Themis",
    ],
    features: [
      "200+ video lessons",
      "1,500+ practice questions",
      "Attack outlines for each subject",
      "Practice essays with model answers",
      "Personalized study calendar",
      "Progress tracking",
    ],
    pricing: [
      { plan: "Bar Review", price: "$799", details: "Core bar prep course" },
      { plan: "Bar Review Plus", price: "$1,249", details: "Includes additional practice materials" },
    ],
    verdict: "Quimbee offers surprisingly good bar prep at the lowest price point. While it's not as comprehensive as the big names, its efficient approach and clear teaching make it a solid choice for self-motivated students on a budget.",
  },
  {
    name: "AdaptiBar",
    slug: "adaptibar",
    description: "Specialized MBE preparation using real, licensed NCBE questions with adaptive technology.",
    overview: "AdaptiBar is a specialized MBE preparation tool that uses real, licensed questions from the National Conference of Bar Examiners (NCBE). Their adaptive algorithm identifies your weak areas and serves questions accordingly, ensuring you spend your study time where it matters most. AdaptiBar is widely used as a supplement to full-service bar prep courses.",
    priceRange: "$395 - $495",
    format: "Online (MBE-focused)",
    passGuarantee: false,
    passGuaranteeDetails: null,
    bestFor: "Students who want real NCBE MBE practice questions",
    rating: 4,
    url: "https://www.adaptibar.com",
    pros: [
      "Uses real licensed NCBE questions",
      "Adaptive learning technology",
      "Most affordable MBE tool",
      "Proven track record",
      "Great as a supplement",
    ],
    cons: [
      "MBE only — no essay or MPT prep",
      "Interface is basic",
      "Must pair with other materials",
    ],
    features: [
      "1,800+ licensed NCBE questions",
      "Adaptive question selection",
      "Performance analytics by subject",
      "Simulated MBE practice exams",
      "Study calendar integration",
      "Mobile access",
    ],
    pricing: [
      { plan: "Standard", price: "$395", details: "Full MBE Qbank access" },
      { plan: "Extended", price: "$495", details: "Extended access period" },
    ],
    verdict: "AdaptiBar is the gold standard for MBE-specific preparation. The use of real NCBE questions gives you the most accurate practice experience available. An excellent supplement to any full-service bar prep course.",
  },
]

export function getProviderBySlug(slug: string): BarPrepProvider | undefined {
  return barPrepProviders.find((p) => p.slug === slug)
}

export function getAllProviderSlugs(): string[] {
  return barPrepProviders.map((p) => p.slug)
}
