import PageLayout from "@/components/layout";
import Image from "next/image";

export default function AboutPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">
              About inDocify
            </h1>

            <div className="prose prose-invert max-w-none">
              <p className="text-white/70 text-lg mb-8">
                We're on a mission to simplify onboarding for new team members
                by helping them quickly understand the codebase structure,
                eliminating the need for hours of explanation. Through
                AI-powered insights and a developer-focused approach, we make
                documentation effortless, efficient, and impactful.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Our Mission
                  </h3>
                  <p className="text-white/70">
                    To eliminate documentation bottlenecks and simplify
                    onboarding by delivering intelligent, AI-powered solutions
                    that save time and enhance code understanding.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Our Vision
                  </h3>
                  <p className="text-white/70">
                    To create a future where every codebase is seamlessly
                    documented, fostering effortless onboarding, collaboration,
                    and accessibility for developers at all levels. By
                    leveraging the power of AI, we aim to eliminate barriers in
                    understanding complex systems, empowering teams to focus on
                    innovation and productivity.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Our Story
                </h2>
                <p className="text-white/70 text-lg mb-8">
                  InDocify was born out of a shared frustration among developers
                  who understood the struggles of managing documentation as
                  codebases grow in complexity. We realized that as projects
                  scale and new developers join the team, onboarding becomes a
                  time-consuming and often overwhelming task.
                </p>
                <p className="text-white/70 text-lg mb-8">
                  Without clear, up-to-date documentation, new team members
                  often find themselves lost in the intricacies of an
                  ever-expanding codebase. This is why we set out to create a
                  solution that would automate and simplify the process, so
                  developers can focus on what they do best—coding.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  About InDocify
                </h2>
                <p className="text-white/70 text-lg mb-8">
                  InDocify is an AI-powered SaaS platform designed to
                  revolutionize developer onboarding and streamline
                  collaboration by generating detailed, context-aware
                  documentation for codebases.
                </p>
                <p className="text-white/70 text-lg mb-8">
                  Our platform automatically creates and keeps documentation in
                  sync with your code, saving time and reducing the mental load
                  for both new and experienced developers. With InDocify, you
                  can generate comprehensive documentation for your React
                  projects directly from your GitHub repositories, ensuring that
                  new team members have everything they need to get up to speed
                  quickly and efficiently.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  The Reason Behind InDocify
                </h2>
                <p className="text-white/70 text-lg mb-8">
                  As codebases grow, so does their complexity. For many
                  organizations, onboarding becomes a major bottleneck,
                  especially when the codebase lacks proper documentation. Teams
                  often spend countless hours walking new developers through the
                  code, making it hard to scale or focus on important tasks.
                </p>
                <p className="text-white/70 text-lg mb-8">
                  InDocify solves this by automating the documentation process
                  and providing an easy-to-use platform to manage it. Whether
                  you’re working with legacy code or a fast-growing project,
                  InDocify ensures that your documentation is always up-to-date,
                  saving your team valuable time and making the onboarding
                  process seamless and efficient.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-8 my-12">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Leadership Team
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      name: "Afriyie Samuel Kwesi",
                      role: "CEO & Co-founder",
                      image: "/sam.jpeg",
                    },
                    {
                      name: "Daakuwaah Asamoah Boakye",
                      role: "CTO & Co-founder",
                      image: "/ama.jpeg",
                    },
                  ].map((member) => (
                    <div key={member.name} className="text-center">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={100}
                        height={100}
                        className="rounded-full mx-auto mb-4"
                      />
                      <h3 className="text-lg font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-white/70">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
