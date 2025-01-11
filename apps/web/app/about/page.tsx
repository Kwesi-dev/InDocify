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
                We're on a mission to revolutionize technical documentation. By
                combining AI technology with developer-centric design, we're
                making documentation effortless and efficient.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Our Mission
                  </h3>
                  <p className="text-white/70">
                    To eliminate the documentation bottleneck in software
                    development by providing intelligent, automated solutions
                    that save developers time and improve code understanding.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Our Vision
                  </h3>
                  <p className="text-white/70">
                    A world where every codebase is well-documented, easily
                    maintainable, and accessible to developers of all experience
                    levels.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-white/70 text-lg mb-8">
                Founded by developers who experienced firsthand the challenges
                of maintaining documentation, inDocify was born from the belief
                that there had to be a better way. We've built a platform that
                understands code context, automates documentation, and keeps
                everything in sync with your codebase.
              </p>

              <div className="bg-white/5 rounded-lg p-8 my-12">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Leadership Team
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Sarah Chen",
                      role: "CEO & Co-founder",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      name: "Michael Rodriguez",
                      role: "CTO & Co-founder",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      name: "Emily Thompson",
                      role: "Head of Product",
                      image: "/placeholder.svg?height=100&width=100",
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
