import PageLayout from "@/components/layout";

export default function TermsPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/70">Last updated: January 11, 2024</p>

              <div className="space-y-8 mt-8">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    1. Agreement to Terms
                  </h2>
                  <p className="text-white/70">
                    By accessing or using inDocify's services, you agree to be
                    bound by these Terms of Service and all applicable laws and
                    regulations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    2. Description of Service
                  </h2>
                  <p className="text-white/70">
                    inDocify provides an AI-powered documentation platform that
                    helps teams create, maintain, and organize technical
                    documentation. Our services include:
                  </p>
                  <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
                    <li>Automated documentation generation</li>
                    <li>Documentation hosting and management</li>
                    <li>Collaboration tools</li>
                    <li>API documentation features</li>
                    <li>Integration with version control systems</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    3. User Responsibilities
                  </h2>
                  <div className="space-y-4">
                    <p className="text-white/70">You agree to:</p>
                    <ul className="list-disc pl-6 text-white/70 space-y-2">
                      <li>Provide accurate account information</li>
                      <li>Maintain the security of your account</li>
                      <li>
                        Use the service in compliance with all applicable laws
                      </li>
                      <li>Not misuse or abuse the service</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    4. Intellectual Property
                  </h2>
                  <p className="text-white/70">
                    You retain all rights to your content. By using our service,
                    you grant us a license to host, store, and display your
                    content as necessary to provide the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    5. Payment Terms
                  </h2>
                  <ul className="list-disc pl-6 text-white/70 space-y-2">
                    <li>Subscription fees are billed in advance</li>
                    <li>All payments are non-refundable</li>
                    <li>You are responsible for all applicable taxes</li>
                    <li>We may change pricing with 30 days notice</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    6. Termination
                  </h2>
                  <p className="text-white/70">
                    We reserve the right to suspend or terminate your account
                    for violations of these terms or for any other reason at our
                    discretion.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    7. Limitation of Liability
                  </h2>
                  <p className="text-white/70">
                    inDocify is provided "as is" without warranties of any kind.
                    We are not liable for any damages arising from your use of
                    the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    8. Changes to Terms
                  </h2>
                  <p className="text-white/70">
                    We may modify these terms at any time. Continued use of the
                    service constitutes acceptance of the modified terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    9. Contact
                  </h2>
                  <p className="text-white/70">
                    For questions about these terms, please contact us at{" "}
                    <a
                      href="mailto:legal@indocify.com"
                      className="text-[#CCFF00] hover:underline"
                    >
                      legal@indocify.com
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
