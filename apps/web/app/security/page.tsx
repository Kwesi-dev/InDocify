import PageLayout from "@/components/layout";
import { Shield, Lock, Server, UserCheck, FileCheck, Bell } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Data Encryption",
    description:
      "All data is encrypted in transit and at rest using industry-standard protocols",
  },
  {
    icon: Lock,
    title: "Access Controls",
    description: "Granular permission systems and role-based access control",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description: "Hosted on secure, SOC 2 compliant cloud infrastructure",
  },
  {
    icon: UserCheck,
    title: "Authentication",
    description: "Support for SSO, 2FA, and secure password policies",
  },
  {
    icon: FileCheck,
    title: "Regular Audits",
    description:
      "Continuous security monitoring and periodic penetration testing",
  },
  {
    icon: Bell,
    title: "Incident Response",
    description: "24/7 security monitoring and incident response team",
  },
];

export default function SecurityPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">Security</h1>
            <p className="text-white/70 text-lg mb-12">
              Security is at the core of everything we do. Learn about our
              comprehensive approach to protecting your data and documentation.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {securityFeatures.map((feature) => (
                <div key={feature.title} className="bg-white/5 rounded-lg p-6">
                  <div className="w-12 h-12 bg-[#CCFF00]/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#CCFF00]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Compliance & Certifications
                </h2>
                <p className="text-white/70 mb-4">
                  We maintain strict compliance with industry standards and
                  regularly undergo security audits:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>SOC 2 Type II certified</li>
                  <li>GDPR compliant</li>
                  <li>ISO 27001 certified</li>
                  <li>Regular penetration testing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Data Protection
                </h2>
                <p className="text-white/70 mb-4">
                  Your data is protected by multiple layers of security:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>End-to-end encryption for all data in transit</li>
                  <li>AES-256 encryption for data at rest</li>
                  <li>Regular security updates and patches</li>
                  <li>Automated backup systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Security Practices
                </h2>
                <p className="text-white/70 mb-4">
                  Our security practices include:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>Regular security training for all employees</li>
                  <li>Strict access control policies</li>
                  <li>Continuous monitoring and logging</li>
                  <li>Incident response procedures</li>
                </ul>
              </section>

              <div className="bg-[#CCFF00]/10 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Report a Security Issue
                </h2>
                <p className="text-white/70 mb-6">
                  If you believe you've found a security vulnerability in our
                  platform, please report it to our security team.
                </p>
                <a
                  href="mailto:security@indocify.com"
                  className="inline-block bg-[#CCFF00] text-black px-6 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium"
                >
                  Contact Security Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
