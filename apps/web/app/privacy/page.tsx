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
                    when you use our AI-powered codebase documentation and
                    analysis platform.
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
                      <li>Email address (through authentication providers)</li>
                      <li>
                        GitHub account information (read-only access to
                        repositories and email)
                      </li>
                      <li>
                        Google account information (when using Google
                        authentication)
                      </li>
                      <li>
                        Payment information (processed securely by our payment
                        provider)
                      </li>
                    </ul>

                    <h3 className="text-xl font-bold text-white">
                      2.2 Repository Information
                    </h3>
                    <ul className="list-disc pl-6 text-white/70 space-y-2">
                      <li>Repository content and metadata</li>
                      <li>Documentation generated from your repositories</li>
                      <li>
                        Chat history and queries related to your repositories
                      </li>
                      <li>Repository access patterns and usage statistics</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    3. How We Use Your Information
                  </h2>
                  <ul className="list-disc pl-6 text-white/70 space-y-2">
                    <li>
                      To authenticate and identify you when you use our platform
                    </li>
                    <li>
                      To access and analyze your GitHub repositories (with your
                      permission)
                    </li>
                    <li>
                      To generate and maintain documentation for your
                      repositories
                    </li>
                    <li>
                      To provide AI-powered insights and answers about your
                      codebase
                    </li>
                    <li>
                      To track repository and question limits based on your
                      subscription
                    </li>
                    <li>
                      To improve our AI models and documentation generation
                    </li>
                    <li>To send important updates about our service</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    4. Data Security
                  </h2>
                  <p className="text-white/70">
                    We implement industry-standard security measures to protect
                    your data:
                  </p>
                  <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
                    <li>
                      All repository data is encrypted at rest and in transit
                    </li>
                    <li>
                      We use read-only GitHub access to ensure repository safety
                    </li>
                    <li>
                      Authentication is handled through secure providers
                      (GitHub, Google)
                    </li>
                    <li>Regular security audits and updates</li>
                  </ul>
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
