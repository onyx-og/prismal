import { useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import {
    Header, Menu, Button, Icon, Text, Card, Container,
    Slider, Tabs, Accordion, Form, TextInput, Alert, Marquee, LazyItem, ParallaxItem,
} from "@prismal/react";
import { features, testimonials, pricingPlans, faqs, partnerLogos } from "./mock";
import type { PricingPlan } from "./mock";

type BillingPeriod = "monthly" | "yearly";

const LandingPage = () => {
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [subscribed, setSubscribed] = useState(false);

    const featuresRef = useRef<HTMLDivElement>(null);
    const pricingRef = useRef<HTMLDivElement>(null);
    const testimonialsRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);

    const scrollTo = (ref: RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const priceFor = (plan: PricingPlan) => {
        if (plan.monthlyPrice === 0) return 0;
        return billingPeriod === "monthly" ? plan.monthlyPrice : Math.round(plan.monthlyPrice * 10);
    };

    const subscribe = (formData: { [key: string]: any }) => {
        if (!formData.email) return;
        setSubscribed(true);
    };

    const navData = useMemo(() => ([
        { label: "Features", onClick: () => scrollTo(featuresRef) },
        { label: "Pricing", onClick: () => scrollTo(pricingRef) },
        { label: "Testimonials", onClick: () => scrollTo(testimonialsRef) },
        { label: "FAQ", onClick: () => scrollTo(faqRef) },
    ]), []);

    return (
        <div className="example-landing-page">
            <Header sticky navClass="landing-nav">
                <span className="landing-brand">Prismal</span>
                <Menu className="landing-nav-menu" data={navData} />
                <Button type="primary" onClick={() => scrollTo(pricingRef)}>Get started</Button>
            </Header>

            <section className="landing-hero">
                <ParallaxItem className="landing-hero-blob" factor={0.15} />
                <Text type="heading" level={1} className="landing-hero-title">
                    Build application UIs without reinventing the components.
                </Text>
                <Text type="body" size="lg" className="landing-hero-subtitle">
                    A composable React kit for shipping real product screens — dashboards, shops,
                    and everything in between — fast.
                </Text>
                <Button type="primary" onClick={() => scrollTo(pricingRef)}>Start building</Button>
            </section>

            <div ref={featuresRef}>
                <LazyItem animation="slide-up" exitEffect={false}>
                    <Container type="section" className="landing-features">
                        <Text type="heading" level={2} className="landing-section-title">Everything you need</Text>
                        <div className="landing-features-grid">
                            {features.map((feature) => (
                                <Card key={feature.title} className="landing-feature-card" elevation={1} padding="l" bodyClass="landing-feature-body">
                                    <Icon name={feature.icon} />
                                    <Text type="heading" level={5}>{feature.title}</Text>
                                    <Text type="body" size="sm">{feature.description}</Text>
                                </Card>
                            ))}
                        </div>
                    </Container>
                </LazyItem>
            </div>

            <div ref={testimonialsRef}>
                <LazyItem animation="fade" exitEffect={false}>
                    <Container type="section" className="landing-testimonials">
                        <Text type="heading" level={2} className="landing-section-title">What teams say</Text>
                        <Slider
                            className="landing-testimonial-slider"
                            type="process"
                            size="m"
                            autoPlay={5000}
                            slides={testimonials}
                            slideWrapper={(testimonial) => (
                                <Card style={{ height: "100%" }} elevation={1} padding="l" className="landing-testimonial-card" bodyClass="landing-testimonial-body">
                                    <Text type="body" size="md" className="landing-testimonial-quote">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </Text>
                                    <Text type="body" size="sm" className="landing-testimonial-name">{testimonial.name}</Text>
                                    <Text type="body" size="xs" className="landing-testimonial-role">{testimonial.role}</Text>
                                </Card>
                            )}
                        />
                    </Container>
                </LazyItem>
            </div>

            <div ref={pricingRef}>
            <LazyItem animation="slide-up" exitEffect={false}>
                <Container type="section" className="landing-pricing">
                    <Text type="heading" level={2} className="landing-section-title">Simple pricing</Text>
                    <Tabs
                        tabsClass="landing-pricing-toggle"
                        data={[
                            { name: "monthly", label: "Monthly" },
                            { name: "yearly", label: "Yearly (2 months free)" },
                        ]}
                        selected={billingPeriod}
                        onChange={(name) => setBillingPeriod(name as BillingPeriod)}
                    />
                    <div className="landing-pricing-grid">
                        {pricingPlans.map((plan) => (
                            <Card key={plan.id} elevation={plan.id === "pro" ? 2 : 1} className="landing-pricing-card">
                                <Text type="heading" level={4}>{plan.name}</Text>
                                <Text type="body" size="sm" className="landing-pricing-description">{plan.description}</Text>
                                <div className="landing-pricing-price">
                                    <Text type="heading" level={2}>${priceFor(plan)}</Text>
                                    <span>/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
                                </div>
                                <ul className="landing-pricing-features">
                                    {plan.features.map((f) => <li key={f}>{f}</li>)}
                                </ul>
                                <Button
                                    type={selectedPlan === plan.id ? "default" : "primary"}
                                    disabled={selectedPlan === plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                >
                                    {selectedPlan === plan.id ? "Selected" : "Choose plan"}
                                </Button>
                            </Card>
                        ))}
                    </div>
                </Container>
            </LazyItem>
            </div>

            <div ref={faqRef}>
            <LazyItem animation="fade" exitEffect={false}>
                <Container type="section" className="landing-faq">
                    <Text type="heading" level={2} className="landing-section-title">Frequently asked questions</Text>
                    <div className="landing-faq-list">
                        {faqs.map((faq, i) => (
                            <Accordion key={faq.question} defaultOpen={i === 0} header={<Text type="heading" level={5}>{faq.question}</Text>}>
                                <Text type="body" size="sm">{faq.answer}</Text>
                            </Accordion>
                        ))}
                    </div>
                </Container>
            </LazyItem>
            </div>

            <LazyItem animation="fade" exitEffect={false}>
                <Container type="section" className="landing-newsletter">
                    <Text type="heading" level={3}>Stay in the loop</Text>
                    <Text type="body" size="sm">Occasional updates when we ship new components. No spam.</Text>
                    {subscribed ? (
                        <Alert message="Thanks — you're subscribed!" closeAlert={() => setSubscribed(false)} />
                    ) : (
                        <Form
                            className="landing-newsletter-form"
                            gridTemplate="1fr auto"
                            onSubmit={subscribe}
                            submit={<Button type="primary">Subscribe</Button>}
                        >
                            <TextInput
                                name="email"
                                htmlType="email"
                                placeholder="you@example.com"
                                required
                                onBlur={(e) => { e.target.value = e.target.value.trim(); }}
                            />
                        </Form>
                    )}
                </Container>
            </LazyItem>

            <footer className="landing-footer">
                <Marquee speed={{ xs: 2, sm: 3, md: 4, lg: 6, xl: 8 }}>
                    {partnerLogos.map((logo) => <span key={logo} className="landing-footer-logo">{logo}</span>)}
                </Marquee>
                <Menu
                    className="landing-footer-menu"
                    data={[
                        { label: "Privacy" },
                        { label: "Terms" },
                        { label: "Contact" },
                    ]}
                />
            </footer>
        </div>
    );
};

export default LandingPage;
