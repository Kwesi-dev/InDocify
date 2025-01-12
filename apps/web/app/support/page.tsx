import PageLayout from "@/components/layout";
import {
  Search,
  MessageSquare,
  Book,
  FileQuestion,
  Zap,
  Users,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    icon: Book,
    title: "Documentation",
    description: "Browse our comprehensive guides and tutorials",
    count: 45,
    link: "/docs",
  },
  {
    icon: FileQuestion,
    title: "FAQs",
    description: "Find answers to common questions",
    count: 120,
    link: "/faqs",
  },
  {
    icon: MessageSquare,
    title: "Community",
    description: "Join discussions with other developers",
    count: 1250,
    link: "/community",
  },
];

const popularArticles = [
  {
    title: "Getting Started with inDocify",
    views: "2.3k",
    category: "Basics",
  },
  {
    title: "Integrating with GitHub Repositories",
    views: "1.8k",
    category: "Integration",
  },
  {
    title: "Custom Documentation Templates",
    views: "1.5k",
    category: "Customization",
  },
  {
    title: "AI-Powered Documentation Generation",
    views: "1.2k",
    category: "Features",
  },
];

export default function SupportPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-6">
                How can we help?
              </h1>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {categories.map((category) => (
                <Link key={category.title} href={category.link}>
                  <div
                    key={category.title}
                    className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-[#CCFF00]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#CCFF00]/20 transition-colors">
                      <category.icon className="w-6 h-6 text-[#CCFF00]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-white/70 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">
                        {category.count} articles
                      </span>
                      <span className="text-[#CCFF00]">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Popular Articles */}
            <div className="bg-white/5 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                Popular Articles
              </h2>
              <div className="space-y-4">
                {popularArticles.map((article) => (
                  <Link
                    key={article.title}
                    href="/blog"
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Zap className="w-5 h-5 text-[#CCFF00]" />
                      <div>
                        <h3 className="text-white font-medium">
                          {article.title}
                        </h3>
                        <span className="text-sm text-white/50">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-white/50">
                      {article.views} views
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Community Support */}
            <div className="bg-[#CCFF00]/10 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-[#CCFF00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#CCFF00]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Join Our Community
              </h2>
              <p className="text-white/70 mb-6 max-w-xl mx-auto">
                Connect with other developers, share your experience, and get
                help from the community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/indocify"
                  className="inline-flex items-center justify-center gap-2 bg-[#CCFF00] text-black px-6 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium"
                >
                  Join Discord
                </a>
                <a
                  href="https://github.com/indocify/community"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
                >
                  GitHub Discussions
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
