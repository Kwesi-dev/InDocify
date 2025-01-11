import PageLayout from "@/components/layout";
import { Sparkles, Wrench, Zap, Shield, Bug } from "lucide-react";

const releases = [
  {
    version: "v2.1.0",
    date: "January 10, 2024",
    type: "feature",
    title: "AI Documentation Enhancement",
    description: "Major improvements to our AI documentation generation system",
    changes: [
      {
        type: "feature",
        icon: Sparkles,
        text: "New AI model for more accurate code analysis",
      },
      {
        type: "feature",
        icon: Sparkles,
        text: "Support for multiple programming language detection",
      },
      {
        type: "improvement",
        icon: Wrench,
        text: "Enhanced documentation template customization",
      },
    ],
  },
  {
    version: "v2.0.1",
    date: "January 5, 2024",
    type: "fix",
    title: "Performance Optimization",
    description: "Various performance improvements and bug fixes",
    changes: [
      {
        type: "performance",
        icon: Zap,
        text: "Improved documentation generation speed by 50%",
      },
      {
        type: "security",
        icon: Shield,
        text: "Enhanced GitHub integration security",
      },
      {
        type: "fix",
        icon: Bug,
        text: "Fixed markdown rendering issues in the editor",
      },
    ],
  },
];

const getVersionColor = (type: string) => {
  switch (type) {
    case "feature":
      return "bg-green-400/10 text-green-400";
    case "fix":
      return "bg-blue-400/10 text-blue-400";
    default:
      return "bg-[#CCFF00]/10 text-[#CCFF00]";
  }
};

const getChangeTypeColor = (type: string) => {
  switch (type) {
    case "feature":
      return "text-green-400";
    case "improvement":
      return "text-[#CCFF00]";
    case "performance":
      return "text-purple-400";
    case "security":
      return "text-red-400";
    case "fix":
      return "text-blue-400";
    default:
      return "text-white";
  }
};

export default function ChangelogPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Changelog</h1>
              <p className="text-white/70">
                Keep track of updates and improvements to the inDocify platform
              </p>
            </div>

            <div className="space-y-12">
              {releases.map((release) => (
                <div key={release.version} className="relative">
                  <div className="flex items-start gap-8">
                    {/* Version Info */}
                    <div className="w-48 flex-shrink-0 pt-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getVersionColor(release.type)}`}
                      >
                        {release.version}
                      </span>
                      <div className="text-sm text-white/50 mt-2">
                        {release.date}
                      </div>
                    </div>

                    {/* Release Content */}
                    <div className="flex-1 bg-white/5 rounded-lg p-6">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {release.title}
                      </h2>
                      <p className="text-white/70 mb-6">
                        {release.description}
                      </p>

                      <div className="space-y-4">
                        {release.changes.map((change, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div
                              className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${getChangeTypeColor(change.type)}`}
                            >
                              <change.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white/90">{change.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscribe Section */}
            <div className="mt-12 bg-[#CCFF00]/10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-white/70 mb-6">
                Subscribe to our newsletter to get notified about new updates
              </p>
              <form className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-[#CCFF00] text-black px-6 py-2 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
