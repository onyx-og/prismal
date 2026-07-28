export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export const features: Feature[] = [
    { icon: "bolt", title: "Fast by default", description: "Every component ships lean, with no runtime you didn't ask for." },
    { icon: "puzzle-piece", title: "Composable", description: "Small primitives that combine into full application UIs, like this page." },
    { icon: "paint-brush", title: "Themeable", description: "Accent colors, elevation and corner radius are consistent across the kit." },
    { icon: "mobile", title: "Responsive", description: "Every layout primitive understands breakpoints out of the box." },
    { icon: "shield", title: "Accessible", description: "Keyboard and screen-reader behaviour is built into every interaction." },
    { icon: "cogs", title: "Configurable", description: "Sensible defaults, with an escape hatch for every prop that matters." },
];

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
}

export const testimonials: Testimonial[] = [
    { quote: "We rebuilt our internal tools on this kit in a week. It just fits together.", name: "Dana Whitfield", role: "Engineering Lead, Northline" },
    { quote: "The accent system means every product surface stays on-brand with zero extra CSS.", name: "Marco Ibarra", role: "Design Systems, Solari" },
    { quote: "Our onboarding flow ships 30% faster now that the Form primitives handle validation for us.", name: "Priya Chandran", role: "Product Engineer, Kadence" },
];

export interface PricingPlan {
    id: string;
    name: string;
    monthlyPrice: number;
    description: string;
    features: string[];
}

export const pricingPlans: PricingPlan[] = [
    { id: "starter", name: "Starter", monthlyPrice: 0, description: "For side projects and evaluation.", features: ["1 project", "Community support", "Core components"] },
    { id: "pro", name: "Pro", monthlyPrice: 24, description: "For growing product teams.", features: ["Unlimited projects", "Priority support", "All components", "Theming tools"] },
    { id: "team", name: "Team", monthlyPrice: 64, description: "For organizations at scale.", features: ["Everything in Pro", "SSO", "Dedicated support", "Custom components"] },
];

export interface Faq {
    question: string;
    answer: string;
}

export const faqs: Faq[] = [
    { question: "Can I use this with an existing design system?", answer: "Yes — every component accepts an accent color and border radius, so it can be themed to match an existing palette." },
    { question: "Does the free plan expire?", answer: "No, the Starter plan is free for as long as you use it, with no trial countdown." },
    { question: "Can I cancel anytime?", answer: "Plans are month-to-month (or year-to-year on the annual billing option) and can be cancelled at any time from account settings." },
    { question: "Is there a discount for annual billing?", answer: "Yes, switching to yearly billing gives two months free compared to paying monthly." },
];

export const partnerLogos = ["Northline", "Solari", "Kadence", "Umbra", "Meridian", "Harborlight"];
