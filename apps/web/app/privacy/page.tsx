import PageLayout from "@/components/layout";

export default function PrivacyPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/70">Last updated: January 11, 2024</p>

              <div className="space-y-8 mt-8">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    1. Introduction
                  </h2>
                  <p className="text-white/70">
                    This Privacy Policy explains how inDocify ("we", "our", or
                    "us") collects, uses, and protects your personal information
                    when you use our documentation platform and related
                    services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    2. Information We Collect
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">
                      2.1 Personal Information
                    </h3>
                    <ul className="list-disc pl-6 text-white/70 space-y-2">
                      <li>Name and email address</li>
                      <li>Company information</li>
                      <li>GitHub account information (when connected)</li>
                      <li>Payment information</li>
                    </ul>

                    <h3 className="text-xl font-bold text-white">
                      2.2 Usage Information
                    </h3>
                    <ul className="list-disc pl-6 text-white/70 space-y-2">
                      <li>Log data and analytics</li>
                      <li>Documentation access patterns</li>
                      <li>Feature usage statistics</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    3. How We Use Your Information
                  </h2>
                  <ul className="list-disc pl-6 text-white/70 space-y-2">
                    <li>To provide and improve our services</li>
                    <li>To communicate with you about your account</li>
                    <li>To send important updates and announcements</li>
                    <li>To analyze and optimize our platform</li>
                    <li>To protect our legal rights and prevent abuse</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    4. Data Security
                  </h2>
                  <p className="text-white/70">
                    We implement appropriate technical and organizational
                    measures to protect your personal information against
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    5. Your Rights
                  </h2>
                  <ul className="list-disc pl-6 text-white/70 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to processing of your data</li>
                    <li>Export your data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    6. Contact Us
                  </h2>
                  <p className="text-white/70">
                    If you have any questions about this Privacy Policy, please
                    contact us at{" "}
                    <a
                      href="mailto:privacy@indocify.com"
                      className="text-[#CCFF00] hover:underline"
                    >
                      privacy@indocify.com
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
