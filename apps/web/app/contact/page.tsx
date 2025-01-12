import PageLayout from "@/components/layout";
import { Mail, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-white/70 text-lg mb-12">
              Have questions? We're here to help. Choose the best way to reach
              us below.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 rounded-lg p-6">
                <div className="w-12 h-12 bg-[#CCFF00]/10 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#CCFF00]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                <p className="text-white/70 mb-4">
                  Get in touch with our support team for quick responses.
                </p>
                <a
                  href="mailto:support@indocify.com"
                  className="text-[#CCFF00] hover:underline"
                >
                  support@indocify.com
                </a>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <div className="w-12 h-12 bg-[#CCFF00]/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-[#CCFF00]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
                <p className="text-white/70 mb-4">
                  Chat with our team in real-time during business hours.
                </p>
                <button className="text-[#CCFF00] hover:underline">
                  Start a conversation
                </button>
              </div>

              <Link href="/demo">
                <div className="bg-white/5 rounded-lg p-6">
                  <div className="w-12 h-12 bg-[#CCFF00]/10 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-[#CCFF00]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Schedule a Call
                  </h3>
                  <p className="text-white/70 mb-4">
                    Book a call with our sales team to discuss enterprise
                    solutions.
                  </p>
                  <button className="text-[#CCFF00] hover:underline">
                    Book appointment
                  </button>
                </div>
              </Link>
            </div>

            <div className="bg-white/5 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Send us a message
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#CCFF00] text-black px-6 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
