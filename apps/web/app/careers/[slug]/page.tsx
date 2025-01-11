import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Users, Briefcase } from "lucide-react";
import PageLayout from "@/components/layout";

const jobDetails = {
  "senior-frontend-engineer": {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "5+ years",
    team: "Product Development",
    description:
      "We're looking for a Senior Frontend Engineer to help build the future of documentation. You'll be working on our core platform, building new features and improving the developer experience.",
    responsibilities: [
      "Lead the development of new features for our documentation platform",
      "Collaborate with designers and product managers to deliver high-quality user experiences",
      "Mentor junior developers and provide technical leadership",
      "Contribute to architectural decisions and technical strategy",
      "Write clean, maintainable, and well-tested code",
      "Participate in code reviews and provide constructive feedback",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Expert knowledge of React and TypeScript",
      "Experience with Next.js and modern frontend tooling",
      "Strong understanding of web performance and optimization",
      "Experience with state management solutions (Redux, MobX, etc.)",
      "Excellent problem-solving and communication skills",
      "Experience with CI/CD and automated testing",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Remote-first work environment",
      "Flexible working hours",
      "Health, dental, and vision insurance",
      "Professional development budget",
      "Home office setup allowance",
      "Regular team retreats",
    ],
  },
};

export default function CareerPage({ params }: { params: { slug: string } }) {
  const job = jobDetails[params.slug as keyof typeof jobDetails];

  if (!job) {
    return <div>Position not found</div>;
  }

  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/careers"
              className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Link>

            <div className="bg-white/5 rounded-lg p-8 mb-8">
              <h1 className="text-4xl font-bold text-white mb-6">
                {job.title}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#CCFF00]" />
                  <span className="text-white/70">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#CCFF00]" />
                  <span className="text-white/70">{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#CCFF00]" />
                  <span className="text-white/70">{job.team}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#CCFF00]" />
                  <span className="text-white/70">{job.experience}</span>
                </div>
              </div>

              <p className="text-white/70 text-lg mb-8">{job.description}</p>

              <button className="bg-[#CCFF00] text-black px-8 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium">
                Apply Now
              </button>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Responsibilities
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="text-white/70">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Requirements
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="text-white/70">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Benefits</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="text-white/70">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-12 bg-[#CCFF00]/10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Join Us?
              </h2>
              <p className="text-white/70 mb-6">
                We're looking for passionate individuals who want to shape the
                future of documentation.
              </p>
              <button className="bg-[#CCFF00] text-black px-8 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium">
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
