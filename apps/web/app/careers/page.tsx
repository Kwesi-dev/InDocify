import PageLayout from "@/components/layout";
import Link from "next/link";

const positions = [
  {
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    link: "/careers/frontend-engineer",
  },
  {
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    link: "/careers/ai-ml-engineer",
  },
  {
    title: "Developer Advocate",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    link: "/careers/developer-advocate",
  },
];

const values = [
  {
    title: "Innovation First",
    description:
      "We're constantly pushing the boundaries of what's possible in documentation automation.",
  },
  {
    title: "Developer Experience",
    description:
      "Everything we build is focused on making developers' lives easier and more productive.",
  },
  {
    title: "Remote-First Culture",
    description:
      "Work from anywhere in the world. We believe great talent shouldn't be limited by location.",
  },
  {
    title: "Continuous Learning",
    description:
      "We invest in our team's growth and encourage exploration of new technologies.",
  },
];

export default function CareersPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">
              Join Our Team
            </h1>
            <p className="text-white/70 text-lg mb-12">
              Help us revolutionize technical documentation and make developers'
              lives easier. We're looking for passionate individuals who want to
              shape the future of developer tools.
            </p>

            <h2 className="text-2xl font-bold text-white mb-6">
              Potential Future Openings
            </h2>
            <div className="grid gap-4 mb-12">
              {positions.map((position) => (
                <Link
                  key={position.title}
                  href={position.link}
                  className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                        {position.title}
                      </h3>
                      <p className="text-white/70 mt-1">
                        {position.department} • {position.location} •{" "}
                        {position.type}
                      </p>
                    </div>
                    <span className="text-[#CCFF00]">→</span>
                  </div>
                </Link>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {values.map((value) => (
                <div key={value.title} className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-white/70">{value.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#CCFF00]/10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Don't see the right position?
              </h2>
              <p className="text-white/70 mb-6">
                We're always looking for talented individuals. Send us your
                resume and we'll keep you in mind for future opportunities.
              </p>
              <Link
                href="mailto:careers@indocify.com"
                className="inline-block bg-[#CCFF00] text-black px-6 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
