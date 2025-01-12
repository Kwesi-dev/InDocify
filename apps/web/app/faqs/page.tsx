import PageLayout from "@/components/layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";

const faqs = {
  general: [
    {
      question: "What is inDocify?",
      answer:
        "inDocify is an AI-powered documentation platform that automatically generates and maintains comprehensive documentation for your codebase. It helps teams streamline their development process and makes onboarding new developers faster and more efficient.",
    },
    {
      question: "How does inDocify work?",
      answer:
        "inDocify connects to your GitHub repositories and uses advanced AI to analyze your codebase. It generates detailed documentation that includes architecture overviews, component documentation, API references, and more. The documentation stays in sync with your code through automatic updates.",
    },
    {
      question: "Is my code secure with inDocify?",
      answer:
        "Absolutely. We take security seriously and implement industry-standard security measures. Your code is processed in isolated environments, and we maintain strict data privacy protocols. We're SOC 2 compliant and regularly undergo security audits.",
    },
  ],
  technical: [
    {
      question: "Which programming languages does inDocify support?",
      answer:
        "Currently, inDocify provides comprehensive support for JavaScript/TypeScript ecosystems, with particular expertise in React and Next.js projects. We're actively working on expanding support for other languages and frameworks.",
    },
    {
      question: "Can I customize the documentation format?",
      answer:
        "Yes! inDocify offers customizable documentation templates that you can adjust to match your team's needs and preferences. You can modify the structure, styling, and content organization to align with your existing documentation standards.",
    },
    {
      question: "How does the GitHub integration work?",
      answer:
        "After connecting your GitHub account, inDocify sets up webhooks to monitor your repositories. When code changes are pushed, our system automatically analyzes the updates and refreshes the documentation accordingly. You can choose which repositories to connect and configure update frequencies.",
    },
  ],
  pricing: [
    {
      question: "What's included in the free tier?",
      answer:
        "The free tier includes documentation generation for public repositories, basic templates, and platform preview features. You can generate documentation for unlimited public repositories and access our core AI features.",
    },
    {
      question: "How does the Pro plan billing work?",
      answer:
        "The Pro plan is billed monthly at $29/month or annually with a 20% discount. It includes all features from the free tier plus private repository support, custom templates, team collaboration tools, and priority support.",
    },
    {
      question: "Do you offer enterprise plans?",
      answer:
        "Yes, we offer enterprise plans for larger teams with custom needs. Enterprise plans include dedicated support, custom integrations, advanced security features, and flexible billing options. Contact our sales team for details.",
    },
  ],
};

export default function FAQPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-white/70">
                Find answers to common questions about inDocify
              </p>
            </div>

            <Tabs defaultValue="general" className="mb-12">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.general.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-white hover:text-[#CCFF00]">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/70">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              <TabsContent value="technical">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.technical.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-white hover:text-[#CCFF00]">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/70">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              <TabsContent value="pricing">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.pricing.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-white hover:text-[#CCFF00]">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/70">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>

            <div className="bg-[#CCFF00]/10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-white/70 mb-6">
                Can't find the answer you're looking for? Our team is here to
                help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#CCFF00] text-black px-6 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium"
                >
                  Contact Support
                </a>
                <a
                  href="/docs"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
                >
                  View Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
