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
                    regulations. If you disagree with any part of these terms,
                    you may not access our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    2. Description of Service
                  </h2>
                  <p className="text-white/70">
                    inDocify is an AI-powered platform that helps developers
                    understand and navigate codebases through intelligent
                    documentation and interactive exploration. Our services
                    include:
                  </p>
                  <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
                    <li>
                      AI-powered repository analysis and documentation
                      generation
                    </li>
                    <li>Interactive Q&A with AI about your codebase</li>
                    <li>Repository import and management</li>
                    <li>
                      Tiered access to features (Free, Pro, and Enterprise
                      plans)
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    3. Service Limitations
                  </h2>
                  <div className="space-y-4">
                    <p className="text-white/70">
                      Our service has the following limitations:
                    </p>
                    <ul className="list-disc pl-6 text-white/70 space-y-2">
                      <li>
                        Free tier users are limited to:
                        <ul className="list-disc pl-6 mt-2">
                          <li>5 questions per repository</li>
                          <li>Public repositories only</li>
                          <li>Maximum repository size of 50MB</li>
                        </ul>
                      </li>
                      <li>
                        Pro tier users are limited to:
                        <ul className="list-disc pl-6 mt-2">
                          <li>Private repository access</li>
                          <li>Maximum repository size of 200MB</li>
                        </ul>
                      </li>
                      <li>
                        Enterprise users have access to:
                        <ul className="list-disc pl-6 mt-2">
                          <li>Unlimited repositories</li>
                          <li>Maximum repository size of 500MB</li>
                          <li>Advanced features and support</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    4. User Responsibilities
                  </h2>
                  <div className="space-y-4">
                    <p className="text-white/70">You agree to:</p>
                    <ul className="list-disc pl-6 text-white/70 space-y-2">
                      <li>
                        Only import repositories you have permission to access
                      </li>
                      <li>Not attempt to circumvent service limitations</li>
                      <li>
                        Not use our service for any illegal or unauthorized
                        purpose
                      </li>
                      <li>Not share or transfer your account access</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    5. GitHub Integration
                  </h2>
                  <p className="text-white/70">
                    Our service integrates with GitHub using read-only access to
                    your repositories. We do not modify your repositories or
                    their contents. You are responsible for ensuring you have
                    the necessary rights to the repositories you import.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    6. Intellectual Property
                  </h2>
                  <p className="text-white/70">
                    You retain all rights to your content. By using our service,
                    you grant us a license to host, store, and display your
                    content as necessary to provide the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    7. Payment Terms
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
                    8. Termination
                  </h2>
                  <p className="text-white/70">
                    We reserve the right to suspend or terminate your account
                    for violations of these terms or for any other reason at our
                    discretion.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    9. Limitation of Liability
                  </h2>
                  <p className="text-white/70">
                    inDocify is provided "as is" without warranties of any kind.
                    We are not liable for any damages arising from your use of
                    the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    10. Changes to Terms
                  </h2>
                  <p className="text-white/70">
                    We may modify these terms at any time. Continued use of the
                    service constitutes acceptance of the modified terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    11. Contact
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
