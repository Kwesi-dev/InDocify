import PageLayout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    title: "Introducing AI-Powered Documentation Generation",
    excerpt:
      "Learn how our new AI features can automatically generate comprehensive documentation from your codebase.",
    author: "Sarah Chen",
    date: "January 10, 2024",
    image: "/placeholder.svg?height=200&width=400",
    category: "Product Updates",
  },
  {
    title: "Best Practices for Technical Documentation",
    excerpt:
      "A comprehensive guide to writing and maintaining technical documentation that developers actually want to read.",
    author: "Michael Rodriguez",
    date: "January 8, 2024",
    image: "/placeholder.svg?height=200&width=400",
    category: "Best Practices",
  },
  {
    title: "The Future of Documentation: AI and Automation",
    excerpt:
      "Exploring how artificial intelligence is transforming the way we create and maintain technical documentation.",
    author: "Emily Thompson",
    date: "January 5, 2024",
    image: "/placeholder.svg?height=200&width=400",
    category: "Industry Insights",
  },
];

export default function BlogPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-white mb-6">Blog</h1>
          <p className="text-white/70 text-lg mb-12 max-w-2xl">
            Insights, updates, and best practices for technical documentation
            and developer experience.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.title}
                href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group"
              >
                <article className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full object-cover"
                  />
                  <div className="p-6">
                    <span className="text-sm text-[#CCFF00] font-medium">
                      {post.category}
                    </span>
                    <h2 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-[#CCFF00] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/70 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-white/50">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
