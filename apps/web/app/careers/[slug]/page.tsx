import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Users, Briefcase } from "lucide-react";
import PageLayout from "@/components/layout";

const jobDetails = {
  "frontend-engineer": {
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    team: "Product Development",
    description:
      "We're looking for a Frontend Engineer to help build the future of documentation. You'll be working on our core platform, building new features and improving the developer experience.",
    responsibilities: [
      "Lead the development of new features for our documentation platform",
      "Collaborate with designers and product managers to deliver high-quality user experiences",
      //   "Mentor junior developers and provide technical leadership",
      "Contribute to architectural decisions and technical strategy",
      "Write clean, maintainable, and well-tested code",
      "Participate in code reviews and provide constructive feedback",
    ],
    requirements: [
      "2+ years of experience in frontend development",
      "Strong knowledge of JavaScript",
      "Expert knowledge of React and TypeScript",
      "Experience with Next.js and modern frontend tooling",
      "Strong understanding of web performance and optimization",
      "Experience with state management solutions",
      "Excellent problem-solving and communication skills",
      "Experience with CI/CD and automated testing",
    ],
    benefits: [
      "Competitive salary",
      "Remote-first work environment",
      "Flexible working hours",
      "Health, dental, and vision insurance",
      "Regular team retreats",
    ],
  },
  "ai-ml-engineer": {
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    team: "Product Development",
    description:
      "InDocify is seeking a talented AI/ML Engineer to help us revolutionize the future of developer onboarding and documentation automation. As part of our product development team, you’ll be responsible for applying cutting-edge machine learning and AI techniques to improve how we generate and optimize documentation. You’ll work closely with frontend engineers and product managers to integrate intelligent features that enhance our platform’s capabilities, automating tasks and enabling smarter interactions.",
    responsibilities: [
      "Develop and implement machine learning algorithms to automate and optimize documentation processes.",
      "Collaborate with frontend and backend engineers to integrate AI features into the documentation platform.",
      "Enhance the AI’s ability to understand code context, improving documentation accuracy and relevancy.",
      "Research and experiment with new AI/ML techniques to drive innovation and solve complex problems.",
      "Ensure the scalability and performance of AI systems across our platform.",
      "Write clean, maintainable, and well-documented code, and contribute to architectural decisions.",
    ],
    requirements: [
      "2+ years of experience in AI/ML engineering.",
      "Strong experience with machine learning algorithms and frameworks (TensorFlow, PyTorch, etc.).",
      "Proficient in Python, and experience with JavaScript is a plus.",
      "Familiarity with AI techniques for natural language processing (NLP) and code analysis.",
      "Strong problem-solving skills and a passion for working on challenging AI-driven problems.",
      "Experience working in a collaborative environment and contributing to team projects.",
      "Excellent communication skills for collaborating across teams and explaining technical concepts.",
    ],
    benefits: [
      "Competitive salary",
      "Remote-first work environment",
      "Flexible working hours",
      "Health, dental, and vision insurance",
      "Regular team retreats",
    ],
  },
  "developer-advocate": {
    title: "Developer Advocate - Marketing",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    team: "Marketing",
    description:
      "InDocify is looking for a Developer Advocate to help us build strong relationships with our developer community and drive awareness of our platform. As a Developer Advocate, you will engage with developers, create content, and represent InDocify in the community. You’ll work closely with both the marketing and engineering teams to ensure our platform resonates with developers and helps drive adoption.",
    responsibilities: [
      "Engage with the developer community through social media, blogs, forums, and events.",
      "Create high-quality content (tutorials, blog posts, videos, etc.) to showcase InDocify’s value to developers.",
      "Host webinars, workshops, and participate in developer conferences to increase brand awareness.",
      "Collaborate with product and engineering teams to highlight new features and improvements.",
      "Collect feedback from developers and relay it to the product team for continuous improvement.",
      "Advocate for the needs and pain points of developers, ensuring they are heard within the company.",
    ],
    requirements: [
      "2+ years of experience in a developer relations or advocacy role.",
      "Strong knowledge of developer tools, platforms, and community engagement.",
      "Experience creating technical content for developers (e.g., blog posts, tutorials, videos).",
      "Excellent communication and presentation skills.",
      "Ability to connect with developers, understand their needs, and create engaging content.",
      "Experience in working with cross-functional teams and collaborating with engineers.",
    ],
    benefits: [
      "Competitive salary",
      "Remote-first work environment",
      "Flexible working hours",
      "Health, dental, and vision insurance",
      "Regular team retreats",
    ],
  },
};

export default async function CareerPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: role } = await params;
  const job = jobDetails[role as keyof typeof jobDetails];

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
